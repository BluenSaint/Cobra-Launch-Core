import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OcrResultEntity } from './entities/ocr-result.entity';
import { OcrViolationEntity } from './entities/ocr-violation.entity';
import { ConfigService } from '@nestjs/config';
import { ProcessDocumentDto } from './dto/process-document.dto';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const execPromise = promisify(exec);

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);
  private readonly textractClient: AWS.Textract;
  private readonly s3Client: AWS.S3;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(OcrResultEntity)
    private ocrResultRepository: Repository<OcrResultEntity>,
    @InjectRepository(OcrViolationEntity)
    private ocrViolationRepository: Repository<OcrViolationEntity>,
    private configService: ConfigService,
  ) {
    // Initialize AWS clients
    const awsConfig = {
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    };
    
    this.textractClient = new AWS.Textract(awsConfig);
    this.s3Client = new AWS.S3(awsConfig);
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME', 'cobra-documents');
  }

  /**
   * Process a document with OCR
   */
  async processDocument(userId: string, processDocumentDto: ProcessDocumentDto): Promise<OcrResultEntity> {
    try {
      this.logger.log(`Processing document for user ${userId}`);
      
      // Create a new OCR result record
      const ocrResult = this.ocrResultRepository.create({
        userId,
        documentPath: processDocumentDto.documentPath,
        documentType: processDocumentDto.documentType,
        status: 'processing',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Save initial record
      const savedResult = await this.ocrResultRepository.save(ocrResult);
      
      // Process with multi-engine OCR (async)
      this.processWithMultiEngineOcr(savedResult.id, processDocumentDto.documentPath)
        .catch(error => {
          this.logger.error(`Error in OCR processing: ${error.message}`, error.stack);
          this.updateOcrResultStatus(savedResult.id, 'failed', { error: error.message });
        });
      
      return savedResult;
    } catch (error) {
      this.logger.error(`Error initiating OCR process: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Process document with multiple OCR engines
   */
  private async processWithMultiEngineOcr(resultId: string, documentPath: string): Promise<void> {
    try {
      // Update status to processing
      await this.updateOcrResultStatus(resultId, 'processing');
      
      // Try AWS Textract first
      let ocrText = '';
      let structuredData = {};
      let confidence = 0;
      let engine = '';
      
      try {
        const textractResult = await this.processWithTextract(documentPath);
        if (textractResult.confidence > 0.7) {
          ocrText = textractResult.text;
          structuredData = textractResult.structuredData;
          confidence = textractResult.confidence;
          engine = 'textract';
          this.logger.log(`Successfully processed with Textract, confidence: ${confidence}`);
        } else {
          throw new Error('Textract confidence too low');
        }
      } catch (textractError) {
        this.logger.warn(`Textract processing failed: ${textractError.message}, trying Google Vision`);
        
        // Fallback to Google Vision
        try {
          const visionResult = await this.processWithGoogleVision(documentPath);
          if (visionResult.confidence > 0.7) {
            ocrText = visionResult.text;
            structuredData = visionResult.structuredData;
            confidence = visionResult.confidence;
            engine = 'google-vision';
            this.logger.log(`Successfully processed with Google Vision, confidence: ${confidence}`);
          } else {
            throw new Error('Google Vision confidence too low');
          }
        } catch (visionError) {
          this.logger.warn(`Google Vision processing failed: ${visionError.message}, trying Tesseract`);
          
          // Last resort: Tesseract
          const tesseractResult = await this.processWithTesseract(documentPath);
          ocrText = tesseractResult.text;
          structuredData = tesseractResult.structuredData;
          confidence = tesseractResult.confidence;
          engine = 'tesseract';
          this.logger.log(`Processed with Tesseract, confidence: ${confidence}`);
        }
      }
      
      // Update OCR result with extracted text and data
      await this.updateOcrResultWithData(
        resultId,
        ocrText,
        structuredData,
        confidence,
        engine,
      );
      
      // Detect violations in the OCR text
      const violations = await this.detectViolations(resultId, ocrText, structuredData);
      
      // Update status to completed
      await this.updateOcrResultStatus(
        resultId,
        'completed',
        { violationsCount: violations.length },
      );
      
      this.logger.log(`OCR processing completed for result ${resultId} with ${violations.length} violations detected`);
    } catch (error) {
      this.logger.error(`Error in multi-engine OCR processing: ${error.message}`, error.stack);
      await this.updateOcrResultStatus(resultId, 'failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Process with AWS Textract
   */
  private async processWithTextract(documentPath: string): Promise<any> {
    try {
      // Upload file to S3
      const s3Key = `temp-ocr/${uuidv4()}-${path.basename(documentPath)}`;
      
      await this.s3Client.upload({
        Bucket: this.bucketName,
        Key: s3Key,
        Body: fs.createReadStream(documentPath),
      }).promise();
      
      // Process with Textract
      const textractResponse = await this.textractClient.detectDocumentText({
        Document: {
          S3Object: {
            Bucket: this.bucketName,
            Name: s3Key,
          },
        },
      }).promise();
      
      // Clean up S3 object
      await this.s3Client.deleteObject({
        Bucket: this.bucketName,
        Key: s3Key,
      }).promise();
      
      // Process Textract response
      return this.processTextractResponse(textractResponse);
    } catch (error) {
      this.logger.error(`Textract processing error: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Process with Google Vision API
   */
  private async processWithGoogleVision(documentPath: string): Promise<any> {
    try {
      // This would normally use the Google Vision client library
      // For now, we'll simulate the response
      
      // In a real implementation, you would use:
      // const vision = require('@google-cloud/vision');
      // const client = new vision.ImageAnnotatorClient();
      // const [result] = await client.documentTextDetection(documentPath);
      
      // Simulate calling the Python script for Google Vision
      const pythonScript = path.join(__dirname, '../../../scripts/google_vision_ocr.py');
      const { stdout } = await execPromise(`python3 ${pythonScript} "${documentPath}"`);
      
      const result = JSON.parse(stdout);
      
      return {
        text: result.text || '',
        structuredData: result.structuredData || {},
        confidence: result.confidence || 0,
      };
    } catch (error) {
      this.logger.error(`Google Vision processing error: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Process with Tesseract OCR
   */
  private async processWithTesseract(documentPath: string): Promise<any> {
    try {
      // Call Tesseract OCR
      const outputBase = `/tmp/ocr-${uuidv4()}`;
      await execPromise(`tesseract "${documentPath}" "${outputBase}" -l eng --oem 1 --psm 3`);
      
      // Read the output file
      const outputText = fs.readFileSync(`${outputBase}.txt`, 'utf8');
      
      // Clean up temporary file
      fs.unlinkSync(`${outputBase}.txt`);
      
      // Extract basic structured data
      const structuredData = this.extractBasicStructuredData(outputText);
      
      return {
        text: outputText,
        structuredData,
        confidence: 0.6, // Estimated confidence for Tesseract
      };
    } catch (error) {
      this.logger.error(`Tesseract processing error: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Process Textract response
   */
  private processTextractResponse(response: AWS.Textract.DetectDocumentTextResponse): any {
    if (!response.Blocks || response.Blocks.length === 0) {
      return { text: '', structuredData: {}, confidence: 0 };
    }
    
    // Extract full text
    const textBlocks = response.Blocks.filter(block => block.BlockType === 'LINE');
    const fullText = textBlocks.map(block => block.Text).join('\n');
    
    // Extract structured data (credit report specific fields)
    const structuredData = this.extractStructuredDataFromTextract(response.Blocks);
    
    // Calculate average confidence
    const confidenceSum = response.Blocks.reduce((sum, block) => sum + (block.Confidence || 0), 0);
    const confidence = confidenceSum / response.Blocks.length;
    
    return {
      text: fullText,
      structuredData,
      confidence,
    };
  }

  /**
   * Extract structured data from Textract blocks
   */
  private extractStructuredDataFromTextract(blocks: AWS.Textract.Block[]): any {
    // Credit report specific field extraction
    const data: Record<string, any> = {
      accounts: [],
      personalInfo: {},
      inquiries: [],
      publicRecords: [],
    };
    
    // Find personal information section
    const personalInfoBlocks = blocks.filter(block => 
      block.BlockType === 'LINE' && 
      (block.Text?.includes('Personal Information') || block.Text?.includes('Consumer Information'))
    );
    
    if (personalInfoBlocks.length > 0) {
      // Extract name, address, SSN patterns
      const namePattern = /Name:?\s*([A-Za-z\s]+)/i;
      const ssnPattern = /SSN:?\s*(\d{3}[-\s]?\d{2}[-\s]?\d{4})/i;
      const addressPattern = /Address:?\s*([A-Za-z0-9\s\.,#-]+)/i;
      
      for (let i = 0; i < blocks.length; i++) {
        const text = blocks[i].Text || '';
        
        const nameMatch = text.match(namePattern);
        if (nameMatch) data.personalInfo.name = nameMatch[1].trim();
        
        const ssnMatch = text.match(ssnPattern);
        if (ssnMatch) data.personalInfo.ssn = ssnMatch[1].trim();
        
        const addressMatch = text.match(addressPattern);
        if (addressMatch) data.personalInfo.address = addressMatch[1].trim();
      }
    }
    
    // Find account information sections
    const accountBlocks = blocks.filter(block => 
      block.BlockType === 'LINE' && 
      (block.Text?.includes('Account Number:') || block.Text?.match(/Account #:?\s*\d+/i))
    );
    
    // Process each account
    accountBlocks.forEach(accountBlock => {
      const accountData: Record<string, any> = {};
      const accountIndex = blocks.indexOf(accountBlock);
      
      // Look at nearby blocks for account details
      for (let i = accountIndex; i < accountIndex + 10 && i < blocks.length; i++) {
        const text = blocks[i].Text || '';
        
        if (text.includes('Account Number:') || text.match(/Account #:?\s*\d+/i)) {
          const match = text.match(/(\d+)/);
          if (match) accountData.accountNumber = match[1];
        }
        
        if (text.includes('Creditor:') || text.includes('Lender:')) {
          const match = text.match(/(?:Creditor|Lender):?\s*([A-Za-z\s]+)/i);
          if (match) accountData.creditor = match[1].trim();
        }
        
        if (text.includes('Balance:')) {
          const match = text.match(/Balance:?\s*\$?([\d,.]+)/i);
          if (match) accountData.balance = match[1].trim();
        }
        
        if (text.includes('Status:')) {
          const match = text.match(/Status:?\s*([A-Za-z\s]+)/i);
          if (match) accountData.status = match[1].trim();
        }
      }
      
      if (Object.keys(accountData).length > 0) {
        data.accounts.push(accountData);
      }
    });
    
    return data;
  }

  /**
   * Extract basic structured data from plain text
   */
  private extractBasicStructuredData(text: string): any {
    // Simplified version for fallback OCR
    const data: Record<string, any> = {
      accounts: [],
      personalInfo: {},
      inquiries: [],
      publicRecords: [],
    };
    
    // Extract personal information
    const nameMatch = text.match(/Name:?\s*([A-Za-z\s]+)/i);
    if (nameMatch) data.personalInfo.name = nameMatch[1].trim();
    
    const ssnMatch = text.match(/SSN:?\s*(\d{3}[-\s]?\d{2}[-\s]?\d{4})/i);
    if (ssnMatch) data.personalInfo.ssn = ssnMatch[1].trim();
    
    const addressMatch = text.match(/Address:?\s*([A-Za-z0-9\s\.,#-]+)/i);
    if (addressMatch) data.personalInfo.address = addressMatch[1].trim();
    
    // Extract account information (simplified)
    const accountMatches = text.matchAll(/Account (?:#|Number):?\s*(\d+)/gi);
    
    for (const match of accountMatches) {
      // Look for nearby creditor and balance information
      const accountIndex = text.indexOf(match[0]);
      const accountSection = text.substring(accountIndex, accountIndex + 500);
      
      const creditorMatch = accountSection.match(/(?:Creditor|Lender):?\s*([A-Za-z\s]+)/i);
      const balanceMatch = accountSection.match(/Balance:?\s*\$?([\d,.]+)/i);
      
      data.accounts.push({
        accountNumber: match[1],
        creditor: creditorMatch ? creditorMatch[1].trim() : 'Unknown',
        balance: balanceMatch ? balanceMatch[1] : 'Unknown',
      });
    }
    
    return data;
  }

  /**
   * Update OCR result status
   */
  private async updateOcrResultStatus(
    resultId: string,
    status: string,
    metadata: Record<string, any> = {},
  ): Promise<void> {
    await this.ocrResultRepository.update(resultId, {
      status,
      metadata: { ...metadata, updatedAt: new Date() },
      updatedAt: new Date(),
    });
  }

  /**
   * Update OCR result with extracted data
   */
  private async updateOcrResultWithData(
    resultId: string,
    text: string,
    structuredData: Record<string, any>,
    confidence: number,
    engine: string,
  ): Promise<void> {
    await this.ocrResultRepository.update(resultId, {
      text,
      structuredData,
      confidence,
      engine,
      updatedAt: new Date(),
    });
  }

  /**
   * Detect violations in OCR text
   */
  private async detectViolations(
    resultId: string,
    text: string,
    structuredData: Record<string, any>,
  ): Promise<OcrViolationEntity[]> {
    try {
      // Call the Python violation detector script
      const pythonScript = path.join(__dirname, '../../../scripts/violation_detector.py');
      const input = JSON.stringify({ text, structuredData });
      
      // Write input to a temporary file
      const inputFile = `/tmp/ocr-input-${uuidv4()}.json`;
      fs.writeFileSync(inputFile, input);
      
      // Call the Python script
      const { stdout } = await execPromise(`python3 ${pythonScript} "${inputFile}"`);
      
      // Parse the violations
      const detectedViolations = JSON.parse(stdout);
      
      // Clean up temporary file
      fs.unlinkSync(inputFile);
      
      // Save violations to database
      const violations = detectedViolations.map(violation => 
        this.ocrViolationRepository.create({
          resultId,
          type: violation.type,
          title: violation.title,
          description: violation.description,
          regulationReference: violation.regulationReference,
          severity: violation.severity,
          confidence: violation.confidence,
          metadata: violation.metadata || {},
          createdAt: new Date(),
        })
      );
      
      return this.ocrViolationRepository.save(violations);
    } catch (error) {
      this.logger.error(`Error detecting violations: ${error.message}`, error.stack);
      return [];
    }
  }

  /**
   * Get OCR result by ID
   */
  async getResultById(id: string): Promise<OcrResultEntity> {
    return this.ocrResultRepository.findOne({
      where: { id },
      relations: ['violations'],
    });
  }

  /**
   * Get OCR results by user ID
   */
  async getResultsByUserId(
    userId: string,
    page = 1,
    limit = 10,
  ): Promise<{ results: OcrResultEntity[]; total: number }> {
    const [results, total] = await this.ocrResultRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['violations'],
    });
    
    return { results, total };
  }

  /**
   * Get violations by result ID
   */
  async getViolationsByResultId(resultId: string): Promise<OcrViolationEntity[]> {
    return this.ocrViolationRepository.find({
      where: { resultId },
      order: { severity: 'DESC', confidence: 'DESC' },
    });
  }
}

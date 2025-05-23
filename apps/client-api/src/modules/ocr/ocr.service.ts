import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as vision from '@google-cloud/vision';
import * as cv from 'opencv4nodejs';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

@Injectable()
export class OcrService {
  private readonly textract: AWS.Textract;
  private readonly visionClient: vision.ImageAnnotatorClient;
  private readonly a2i: AWS.AugmentedAIRuntime;
  
  constructor(private configService: ConfigService) {
    // Initialize AWS Textract
    this.textract = new AWS.Textract({
      region: this.configService.get('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
    
    // Initialize Google Vision
    this.visionClient = new vision.ImageAnnotatorClient({
      keyFilename: this.configService.get('GOOGLE_APPLICATION_CREDENTIALS', ''),
    });
    
    // Initialize AWS A2I
    this.a2i = new AWS.AugmentedAIRuntime({
      region: this.configService.get('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async analyze(file: Express.Multer.File, reportType?: string): Promise<any> {
    try {
      // Create a unique directory for this analysis
      const analysisId = `analysis-${Date.now()}`;
      const analysisDir = path.join(process.cwd(), 'uploads', analysisId);
      fs.mkdirSync(analysisDir, { recursive: true });
      
      // Save the file to the analysis directory
      const filePath = path.join(analysisDir, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
      
      // Multi-engine OCR pipeline
      const results = await Promise.allSettled([
        this.processWithTextract(filePath),
        this.processWithGoogleVision(filePath),
        this.processWithOpenCV(filePath),
      ]);
      
      // Combine and analyze results
      const combinedText = this.combineResults(results);
      
      // If confidence is low, send to AWS A2I for human review
      const confidence = this.calculateConfidence(results);
      let humanReviewRequired = false;
      
      if (confidence < 0.7) {
        humanReviewRequired = true;
        await this.initiateHumanReview(filePath, combinedText);
      }
      
      return {
        success: true,
        message: 'OCR analysis completed',
        data: {
          fileName: file.originalname,
          fileSize: file.size,
          reportType: reportType || 'unknown',
          extractedText: combinedText,
          confidence,
          humanReviewRequired,
          processingTime: `${(Date.now() - parseInt(analysisId.split('-')[1])) / 1000}s`,
          analysisId,
        },
      };
    } catch (error) {
      console.error('OCR analysis error:', error);
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }

  private async processWithTextract(filePath: string): Promise<string> {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      
      const params = {
        Document: {
          Bytes: fileBuffer,
        },
        FeatureTypes: ['TABLES', 'FORMS'],
      };
      
      const response = await this.textract.analyzeDocument(params).promise();
      
      // Extract text from blocks
      let extractedText = '';
      if (response.Blocks) {
        response.Blocks.forEach(block => {
          if (block.BlockType === 'LINE' && block.Text) {
            extractedText += block.Text + '\n';
          }
        });
      }
      
      return extractedText;
    } catch (error) {
      console.error('AWS Textract error:', error);
      return '';
    }
  }

  private async processWithGoogleVision(filePath: string): Promise<string> {
    try {
      const [result] = await this.visionClient.documentTextDetection(filePath);
      const fullTextAnnotation = result.fullTextAnnotation;
      
      return fullTextAnnotation ? fullTextAnnotation.text : '';
    } catch (error) {
      console.error('Google Vision error:', error);
      return '';
    }
  }

  private async processWithOpenCV(filePath: string): Promise<string> {
    try {
      // Use OpenCV for preprocessing
      const image = cv.imread(filePath);
      
      // Convert to grayscale
      const grayImage = image.cvtColor(cv.COLOR_BGR2GRAY);
      
      // Apply adaptive threshold
      const thresholdImage = grayImage.adaptiveThreshold(
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        11,
        2
      );
      
      // Save preprocessed image
      const preprocessedPath = filePath + '.preprocessed.png';
      cv.imwrite(preprocessedPath, thresholdImage);
      
      // Use Tesseract OCR on preprocessed image
      const { stdout } = await execPromise(`tesseract ${preprocessedPath} stdout`);
      
      return stdout;
    } catch (error) {
      console.error('OpenCV/Tesseract error:', error);
      return '';
    }
  }

  private combineResults(results: PromiseSettledResult<string>[]): string {
    let combinedText = '';
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        combinedText += `--- OCR Engine ${index + 1} Results ---\n`;
        combinedText += result.value + '\n\n';
      }
    });
    
    return combinedText;
  }

  private calculateConfidence(results: PromiseSettledResult<string>[]): number {
    // Count successful OCR engines
    const successfulEngines = results.filter(
      result => result.status === 'fulfilled' && result.value && result.value.length > 0
    ).length;
    
    // Calculate confidence based on agreement between engines
    const totalEngines = results.length;
    return successfulEngines / totalEngines;
  }

  private async initiateHumanReview(filePath: string, extractedText: string): Promise<void> {
    try {
      const params = {
        FlowDefinitionArn: this.configService.get('AWS_A2I_FLOW_DEFINITION_ARN', ''),
        HumanLoopName: `human-loop-${Date.now()}`,
        InputContent: JSON.stringify({
          initialValue: extractedText,
          taskObject: {
            imageUrl: `file://${filePath}`,
          },
        }),
      };
      
      await this.a2i.startHumanLoop(params).promise();
    } catch (error) {
      console.error('AWS A2I error:', error);
    }
  }
}

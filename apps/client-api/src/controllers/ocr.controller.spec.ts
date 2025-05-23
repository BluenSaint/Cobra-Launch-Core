import { Test, TestingModule } from '@nestjs/testing';
import { OcrController } from './ocr.controller';
import { OcrService } from '../services/ocr.service';

describe('OcrController', () => {
  let controller: OcrController;
  let service: OcrService;

  const mockFile = {
    originalname: 'test.jpg',
    mimetype: 'image/jpeg',
    size: 1024,
    buffer: Buffer.from('test'),
  } as Express.Multer.File;

  const mockOcrService = {
    analyze: jest.fn().mockImplementation((file) => {
      return Promise.resolve({
        success: true,
        message: 'OCR analysis completed',
        data: {
          fileName: file.originalname,
          fileSize: file.size,
          extractedText: 'Sample extracted text from document',
          confidence: 0.95,
          processingTime: '1.2s'
        }
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcrController],
      providers: [
        {
          provide: OcrService,
          useValue: mockOcrService,
        },
      ],
    }).compile();

    controller = module.get<OcrController>(OcrController);
    service = module.get<OcrService>(OcrService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('analyzeDocument', () => {
    it('should call service.analyze with the provided file', async () => {
      await controller.analyzeDocument(mockFile, {});
      expect(service.analyze).toHaveBeenCalledWith(mockFile);
    });

    it('should return the result from service.analyze', async () => {
      const result = await controller.analyzeDocument(mockFile, {});
      expect(result).toEqual({
        success: true,
        message: 'OCR analysis completed',
        data: {
          fileName: mockFile.originalname,
          fileSize: mockFile.size,
          extractedText: 'Sample extracted text from document',
          confidence: 0.95,
          processingTime: '1.2s'
        }
      });
    });

    it('should throw an exception if no file is provided', async () => {
      await expect(controller.analyzeDocument(null, {})).rejects.toThrow();
    });

    it('should throw an exception if file type is not supported', async () => {
      const invalidFile = { ...mockFile, mimetype: 'text/plain' };
      await expect(controller.analyzeDocument(invalidFile as Express.Multer.File, {})).rejects.toThrow();
    });
  });
});

import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as Redis from 'redis';
import { promisify } from 'util';
import { DisputeDto } from './dto/dispute.dto';
import { DisputeStatus } from './enums/dispute-status.enum';

@Injectable()
export class DisputeService {
  private readonly redisClient: Redis.RedisClient;
  private readonly getAsync: (key: string) => Promise<string>;
  private readonly setAsync: (key: string, value: string) => Promise<unknown>;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {
    // Initialize Redis client
    this.redisClient = Redis.createClient({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: parseInt(this.configService.get('REDIS_PORT', '6379')),
      password: this.configService.get('REDIS_PASSWORD', ''),
    });

    // Promisify Redis methods
    this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
    this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
  }

  async launchCampaign(disputeData: DisputeDto) {
    try {
      // Generate dispute ID
      const disputeId = `dispute-${Date.now()}`;
      
      // Create dispute record
      const dispute = {
        id: disputeId,
        ...disputeData,
        status: DisputeStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadlines: {
          bureauResponse: moment().add(30, 'days').toDate(),
          followUp: moment().add(45, 'days').toDate(),
          escalation: moment().add(60, 'days').toDate(),
        },
      };
      
      // Cache dispute in Redis for quick access
      await this.setAsync(`dispute:${disputeId}`, JSON.stringify(dispute));
      
      // Publish dispute creation event to Kafka
      this.kafkaClient.emit('dispute.created', {
        disputeId,
        userId: disputeData.userId,
        bureaus: disputeData.bureaus,
        timestamp: new Date().toISOString(),
      });
      
      return {
        success: true,
        message: 'Dispute campaign launched successfully',
        data: {
          disputeId,
          status: dispute.status,
          deadlines: dispute.deadlines,
        },
      };
    } catch (error) {
      console.error('Error launching dispute campaign:', error);
      throw new Error(`Failed to launch dispute campaign: ${error.message}`);
    }
  }

  async updateDisputeStatuses() {
    try {
      // In a real implementation, this would query a database
      // For now, we'll simulate by publishing an event to Kafka
      this.kafkaClient.emit('dispute.status.batch', {
        operation: 'update_statuses',
        timestamp: new Date().toISOString(),
      });
      
      return {
        success: true,
        message: 'Dispute status update job initiated',
      };
    } catch (error) {
      console.error('Error updating dispute statuses:', error);
      throw new Error(`Failed to update dispute statuses: ${error.message}`);
    }
  }

  async getDisputeById(disputeId: string) {
    try {
      // Try to get from Redis cache first
      const cachedDispute = await this.getAsync(`dispute:${disputeId}`);
      
      if (cachedDispute) {
        return {
          success: true,
          data: JSON.parse(cachedDispute),
          source: 'cache',
        };
      }
      
      // In a real implementation, this would fall back to database lookup
      // For now, we'll return a not found response
      return {
        success: false,
        message: 'Dispute not found',
      };
    } catch (error) {
      console.error('Error retrieving dispute:', error);
      throw new Error(`Failed to retrieve dispute: ${error.message}`);
    }
  }

  async validateDisputeLetter(text: string) {
    try {
      // In a real implementation, this would call the Rust FCRA compliance validator
      // For now, we'll simulate basic validation
      const forbiddenPhrases = [
        'I refuse to pay',
        'This is fraud',
        'You are legally required to',
        'I will sue',
      ];
      
      const violations = [];
      
      forbiddenPhrases.forEach(phrase => {
        if (text.toLowerCase().includes(phrase.toLowerCase())) {
          violations.push({
            phrase,
            reason: 'Prohibited language under FCRA § 614',
          });
        }
      });
      
      return {
        success: true,
        isValid: violations.length === 0,
        violations,
      };
    } catch (error) {
      console.error('Error validating dispute letter:', error);
      throw new Error(`Failed to validate dispute letter: ${error.message}`);
    }
  }
}

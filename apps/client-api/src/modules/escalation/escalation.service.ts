import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EscalationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async triggerCFPBComplaint(data: any) {
    try {
      // In a real implementation, this would integrate with CFPB's API
      // For now, we'll simulate the process
      
      const complaintData = {
        consumer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
        },
        complaint: {
          product: 'CREDIT_REPORTING',
          issue: data.issue,
          narrative: data.narrative,
          bureau: data.bureau,
          disputeId: data.disputeId,
        },
        attachments: data.attachmentUrls || [],
        timestamp: new Date().toISOString(),
      };
      
      // Log the complaint data
      console.log('CFPB Complaint Data:', JSON.stringify(complaintData, null, 2));
      
      return {
        success: true,
        message: 'CFPB complaint process initiated',
        data: {
          complaintId: `cfpb-${Date.now()}`,
          estimatedResponseTime: '15 business days',
        },
      };
    } catch (error) {
      console.error('Error triggering CFPB complaint:', error);
      throw new Error(`Failed to trigger CFPB complaint: ${error.message}`);
    }
  }

  async sendCertifiedMail(data: any) {
    try {
      // Integrate with Lob.com API for certified mail
      const lobApiKey = this.configService.get('LOB_API_KEY');
      
      if (!lobApiKey) {
        throw new Error('LOB_API_KEY not configured');
      }
      
      // Prepare the letter data
      const letterData = {
        description: `Dispute Letter - ${data.disputeId}`,
        to: {
          name: data.bureau === 'EXPERIAN' ? 'Experian' : 
                data.bureau === 'TRANSUNION' ? 'TransUnion' : 'Equifax',
          address_line1: data.bureauAddress.line1,
          address_line2: data.bureauAddress.line2 || '',
          address_city: data.bureauAddress.city,
          address_state: data.bureauAddress.state,
          address_zip: data.bureauAddress.zip,
        },
        from: {
          name: `${data.firstName} ${data.lastName}`,
          address_line1: data.fromAddress.line1,
          address_line2: data.fromAddress.line2 || '',
          address_city: data.fromAddress.city,
          address_state: data.fromAddress.state,
          address_zip: data.fromAddress.zip,
        },
        file: data.letterFileUrl,
        color: true,
        double_sided: true,
        mail_type: 'usps_certified',
        return_envelope: true,
      };
      
      // In a real implementation, we would make an API call to Lob
      // For now, we'll simulate the response
      
      // Log the letter data
      console.log('Certified Mail Data:', JSON.stringify(letterData, null, 2));
      
      return {
        success: true,
        message: 'Certified mail scheduled for delivery',
        data: {
          trackingId: `lob-${Date.now()}`,
          estimatedDelivery: '3-5 business days',
          trackingUrl: `https://lob.com/track/${Date.now()}`,
        },
      };
    } catch (error) {
      console.error('Error sending certified mail:', error);
      throw new Error(`Failed to send certified mail: ${error.message}`);
    }
  }

  async triggerAttorneyGeneralComplaint(data: any) {
    try {
      // In a real implementation, this would integrate with state AG offices
      // For now, we'll simulate the process
      
      const agComplaintData = {
        consumer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          phone: data.phone,
        },
        complaint: {
          state: data.state,
          bureau: data.bureau,
          issue: data.issue,
          narrative: data.narrative,
          disputeId: data.disputeId,
          previousActions: data.previousActions,
        },
        attachments: data.attachmentUrls || [],
        timestamp: new Date().toISOString(),
      };
      
      // Log the AG complaint data
      console.log('AG Complaint Data:', JSON.stringify(agComplaintData, null, 2));
      
      return {
        success: true,
        message: 'Attorney General complaint process initiated',
        data: {
          complaintId: `ag-${data.state.toLowerCase()}-${Date.now()}`,
          estimatedResponseTime: '30 business days',
          agOffice: `${data.state} Attorney General Consumer Protection Division`,
        },
      };
    } catch (error) {
      console.error('Error triggering AG complaint:', error);
      throw new Error(`Failed to trigger AG complaint: ${error.message}`);
    }
  }
}

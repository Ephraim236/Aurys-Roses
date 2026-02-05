import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailjet from 'node-mailjet';
import { SendContactDto } from './dto/send-contact.dto';

@Injectable()
export class ContactService {
  private mailjetClient: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('MAILJET_API_KEY');
    const apiSecret = this.configService.get<string>('MAILJET_API_SECRET');

    if (apiKey && apiSecret) {
      this.mailjetClient = Mailjet.Client?.apiConnect ? Mailjet.Client.apiConnect(apiKey, apiSecret) : null;
    }
  }

  async sendContactEmail(dto: SendContactDto): Promise<{ success: boolean; message: string }> {
    const { name, email, phone, message } = dto;
    const recipientEmail = this.configService.get<string>('RECIPIENT_EMAIL') || 'hello@aurysroses.com';
    const senderEmail = this.configService.get<string>('SENDER_EMAIL') || 'no-reply@aurysroses.com';

    const htmlContent = `
      <p><strong>Name:</strong> ${name || '—'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '—'}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br/>')}</p>
    `;

    if (!this.mailjetClient) {
      console.log('Mailjet not configured — simulated email send');
      console.log({ to: recipientEmail, from: senderEmail, subject: `New contact message from ${name}`, html: htmlContent });
      return { success: true, message: 'Email simulated (Mailjet not configured)' };
    }

    try {
      const request = await this.mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: { Email: senderEmail, Name: 'Aurys Roses' },
            To: [{ Email: recipientEmail }],
            Subject: `New contact form message from ${name}`,
            HTMLPart: htmlContent,
          },
        ],
      });

      console.log('Email sent successfully via Mailjet', request.body);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Mailjet error:', errorMessage);
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
}

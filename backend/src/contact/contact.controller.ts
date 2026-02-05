import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendContactDto } from './dto/send-contact.dto';

@Controller('api')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  async sendContact(@Body() dto: SendContactDto) {
    try {
      const result = await this.contactService.sendContactEmail(dto);
      return { ok: true, ...result };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send email';
      throw new HttpException(
        { ok: false, error: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

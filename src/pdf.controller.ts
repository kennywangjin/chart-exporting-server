import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';
import { PdfDto } from './pdf.dto';
import { PdfService } from './pdf.service';

@Controller('pdfs')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment')
  @ApiBody({ type: PdfDto })
  async getPdf(@Body() pdf: PdfDto, @Res() res: Response) {
    const buffer = await this.pdfService.getPdf(pdf.html);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream.pipe(res);
  }
}

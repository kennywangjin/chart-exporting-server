import { Injectable, Logger } from '@nestjs/common';
import puppeteer = require('puppeteer');

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async getPdf(html: string) {
    this.logger.log('Starting puppetter browser');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      this.logger.debug('Start puppetter page');
      const page = await browser.newPage();
      this.logger.debug('Evaluating pdf content');
      await page.setContent(html);
      this.logger.debug('Exporting pdf');
      return await page.pdf({ format: 'a4' });
    } finally {
      this.logger.log('Closing puppetter browser');
      await browser.close();
    }
  }
}

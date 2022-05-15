import { Injectable, Logger } from '@nestjs/common';
import playwright = require('playwright-core');

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async getPdf(html: string) {
    this.logger.log('Starting chrominum browser');
    const browser = await playwright.chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      this.logger.debug('Starting new page');
      const page = await browser.newPage();
      this.logger.debug('generating pdf document');
      await page.setContent(html);
      this.logger.debug('Exporting pdf');
      return await page.pdf({ format: 'a4' });
    } finally {
      this.logger.log('Closing browser');
      await browser.close();
    }
  }
}

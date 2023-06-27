import { Injectable, Logger } from '@nestjs/common';
import { getBrowser } from '../getBrowser';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async getPdf(html: string) {
    const browser = await getBrowser();
    this.logger.debug('Starting new page');
    const page = await browser.newPage();

    try {
      this.logger.debug('generating pdf document');
      await page.setContent(html);
      this.logger.debug('Exporting pdf');
      return await page.pdf({ format: 'a4' });
    } finally {
      this.logger.log('Closing page');
      await page.close();
    }
  }
}

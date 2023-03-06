import { Injectable, Logger } from '@nestjs/common';
import path = require('path');
import Highcharts = require('highcharts');
import playwright = require('playwright-core');
import { getBrowser } from './getBrowser';

interface RenderOptions extends playwright.JSHandle {
  chartOptions: Highcharts.Options;
}

@Injectable()
export class HighchartsService {
  private readonly logger: Logger = new Logger(HighchartsService.name);
  private readonly pageHtml: string = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Highcharts</title>
    </head>
    <body>
      <div id="chart"></div>
    </body>
    </html>`;

  async getChart(options: Highcharts.Options) {
    const browser = await getBrowser();
    this.logger.debug('Starting new page');
    const page = await browser.newPage();

    try {
      await page.setContent(this.pageHtml);
      await page.addScriptTag({
        path: path.join(__dirname, '../node_modules/highcharts/highcharts.js'),
      });
      await page.addScriptTag({
        path: path.join(
          __dirname,
          '../node_modules/highcharts/modules/series-label.js',
        ),
      });
      this.logger.debug('Generating chart image');
      await page.evaluate(this.renderChart, {
        chartOptions: options,
      } as RenderOptions);
      const element = await page.$('#chart');
      this.logger.debug('Exporting chart image');
      return await element.screenshot({ type: 'png' });
    } finally {
      this.logger.log('Closing page');
      await page.close();
    }
  }

  /**
   * 根据配置、宽度、高度进行echarts图表渲染
   * @param renderOptions 图表渲染配置项
   */
  renderChart(renderOptions: RenderOptions) {
    const globalOptions: Highcharts.Options = {
      credits: { enabled: false },
      plotOptions: {
        series: { animation: false },
      },
    };
    const chartOptions = {
      ...renderOptions.chartOptions,
      ...globalOptions,
    };
    const container = document.getElementById('chart');
    Highcharts.chart(container, chartOptions);
  }
}

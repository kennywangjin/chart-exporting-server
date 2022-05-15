import { Injectable, Logger } from '@nestjs/common';
import { chartOptions } from './chartOptions';
import path = require('path');
import echarts = require('echarts');
import playwright = require('playwright-core');

interface RenderOptions extends playwright.JSHandle {
  chartOptions: echarts.EChartsOption;
  width: number;
  height: number;
}

@Injectable()
export class EChartsService {
  private readonly logger: Logger = new Logger(EChartsService.name);
  private readonly pageHtml: string = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ECharts</title>
    </head>
    <body>
      <div id="chart"></div>
    </body>
    </html>`;

  /**
   * 根据配置、宽度、高度进行echarts图表渲染
   * @param renderOptions 图表渲染配置项
   */
  renderChart(renderOptions: RenderOptions) {
    const { chartOptions: options, width, height } = renderOptions;
    const container = document.getElementById('chart');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    const chart = echarts.init(container);
    chart.setOption({ ...options, animation: false });
  }

  async getChart(options: echarts.EChartsOption, outputOptions: chartOptions) {
    this.logger.log('Starting chromium browser');
    const browser = await playwright.chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      this.logger.debug('Starting new page');
      const page = await browser.newPage();
      await page.setContent(this.pageHtml);
      await page.addScriptTag({
        path: path.join(__dirname, '../node_modules/echarts/dist/echarts.js'),
      });

      this.logger.debug('Generating chart image');
      await page.evaluate(this.renderChart, {
        chartOptions: options,
        ...outputOptions,
      } as RenderOptions);
      const element = await page.$('#chart');
      this.logger.debug('Exporting chart image');
      return await element.screenshot({ type: 'png' });
    } finally {
      this.logger.log('Closing browser');
      await browser.close();
    }
  }
}

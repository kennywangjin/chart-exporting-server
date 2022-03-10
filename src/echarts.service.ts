import { Injectable, Logger } from '@nestjs/common';
import { chartOptions } from './chartOptions';
import path = require('path');
import echarts = require('echarts');
import puppeteer = require('puppeteer');

@Injectable()
export class EChartsService {
  private readonly logger: Logger = new Logger(EChartsService.name);

  async getChart(options: echarts.EChartsOption, outputOptions: chartOptions) {
    this.logger.log('Starting puppeteer browser');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      this.logger.debug('Starting puppeteer page');
      const page = await browser.newPage();
      await page.setContent(
        `<!DOCTYPE html>
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
            </html>`,
      );
      await page.addScriptTag({
        path: path.join(__dirname, '../node_modules/echarts/dist/echarts.js'),
      });

      this.logger.debug('Evaluating echarts script');
      await page.evaluate(
        renderChart,
        options as puppeteer.JSONObject,
        outputOptions.width,
        outputOptions.height,
      );
      const element = await page.$('#chart');
      this.logger.debug('Exporting chart');
      return await element.screenshot({ type: 'png' });
    } finally {
      this.logger.log('Closing puppeteer');
      await browser.close();
    }
  }
}

/**
 * 根据配置、宽度、高度进行echarts图表渲染
 * @param options 图表配置项
 * @param width 图表宽度
 * @param height 图表高度
 */
function renderChart(
  options: echarts.EChartsOption,
  width: number,
  height: number,
) {
  const container = document.getElementById('chart');
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  const chart = echarts.init(container);
  chart.setOption({ ...options, animation: false });
}

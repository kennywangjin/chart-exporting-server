import { Injectable, Logger } from '@nestjs/common';
import { getBrowser } from '../getBrowser';
import path = require('path');
import playwright = require('playwright-core');

interface RenderOptions extends playwright.JSHandle {
  chartType: string;
  chartOptions: any;
}

@Injectable()
export class G2plotService {
  private readonly logger: Logger = new Logger(G2plotService.name);
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

  async getChart(options: any) {
    const browser = await getBrowser();
    this.logger.debug('Starting new page');
    const page = await browser.newPage();

    try {
      await page.setContent(this.pageHtml);
      await page.addScriptTag({
        path: path.join(
          __dirname,
          '../../node_modules/@antv/g2plot/dist/g2plot.min.js',
        ),
      });

      this.logger.debug('Generating chart image');
      await page.evaluate(this.renderChart, options);
      const element = page.locator('#chart');
      await element.waitFor({ state: 'visible' });
      this.logger.debug('Exporting chart image');
      return await element.screenshot({ type: 'png' });
    } finally {
      this.logger.log('Closing page');
      await page.close();
    }
  }

  renderChart(options: RenderOptions) {
    const G2Plot = (window as any).G2Plot;
    let chart: any;
    const container = document.getElementById('chart');
    switch (options.chartType.toLowerCase()) {
      case 'area':
        chart = new G2Plot.Line(container, options.chartOptions);
        break;
      case 'bar':
        chart = new G2Plot.Bar(container, options.chartOptions);
        break;
      case 'box':
        chart = new G2Plot.Box(container, options.chartOptions);
        break;
      case 'bullet':
        chart = new G2Plot.Bullet(container, options.chartOptions);
        break;
      case 'column':
        chart = new G2Plot.Column(container, options.chartOptions);
        break;
      case 'facet':
        chart = new G2Plot.Facet(container, options.chartOptions);
        break;
      case 'funnel':
        chart = new G2Plot.Funnel(container, options.chartOptions);
        break;
      case 'gauge':
        chart = new G2Plot.Gauge(container, options.chartOptions);
        break;
      case 'heatmap':
        chart = new G2Plot.Heatmap(container, options.chartOptions);
        break;
      case 'histogram':
        chart = new G2Plot.Histogram(container, options.chartOptions);
        break;
      case 'line':
        chart = new G2Plot.Line(container, options.chartOptions);
        break;
      case 'liquid':
        chart = new G2Plot.Liquid(container, options.chartOptions);
        break;
      case 'pie':
        chart = new G2Plot.Pie(container, options.chartOptions);
        break;
      case 'radar':
        chart = new G2Plot.Radar(container, options.chartOptions);
        break;
      case 'rose':
        chart = new G2Plot.Rose(container, options.chartOptions);
        break;
      case 'scatter':
        chart = new G2Plot.Scatter(container, options.chartOptions);
        break;
      case 'venn':
        chart = new G2Plot.Venn(container, options.chartOptions);
        break;
      case 'violin':
        chart = new G2Plot.Violin(container, options.chartOptions);
        break;
      case 'waterfall':
        chart = new G2Plot.Waterfall(container, options.chartOptions);
        break;
      default:
        throw new Error('unsupported chart type');
    }
    chart.render();
  }
}

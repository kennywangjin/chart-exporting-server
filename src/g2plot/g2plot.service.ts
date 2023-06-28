import { Injectable, Logger } from '@nestjs/common';
import { getBrowser } from '../getBrowser';
import path = require('path');
import { ChartOptions } from './chartOptions';

@Injectable()
export class G2plotService {
  private readonly logger: Logger = new Logger(G2plotService.name);
  private readonly pageHtml: string = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>g2plot</title>
    </head>
    <body>
      <div id="chart"></div>
    </body>
    </html>`;

  async getChart(options: ChartOptions) {
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

  renderChart(options: ChartOptions) {
    const { chartType, chartOptions } = options;
    const G2Plot = (window as any).G2Plot;
    let chart: any;
    const container = document.getElementById('chart');

    switch (chartType.toLowerCase()) {
      case 'area':
        chart = new G2Plot.Line(container, chartOptions);
        break;
      case 'bar':
        chart = new G2Plot.Bar(container, chartOptions);
        break;
      case 'bidirectionalbar':
        chart = new G2Plot.BidirectionalBar(container, chartOptions);
        break;
      case 'box':
        chart = new G2Plot.Box(container, chartOptions);
        break;
      case 'bullet':
        chart = new G2Plot.Bullet(container, chartOptions);
        break;
      case 'chord':
        chart = new G2Plot.Chord(container, chartOptions);
        break;
      case 'circlepacking':
        chart = new G2Plot.CirclePacking(container, chartOptions);
        break;
      case 'column':
        chart = new G2Plot.Column(container, chartOptions);
        break;
      case 'dualaxes':
        chart = new G2Plot.DualAxes(container, chartOptions);
        break;
      case 'facet':
        chart = new G2Plot.Facet(container, chartOptions);
        break;
      case 'funnel':
        chart = new G2Plot.Funnel(container, chartOptions);
        break;
      case 'gauge':
        chart = new G2Plot.Gauge(container, chartOptions);
        break;
      case 'heatmap':
        chart = new G2Plot.Heatmap(container, chartOptions);
        break;
      case 'histogram':
        chart = new G2Plot.Histogram(container, chartOptions);
        break;
      case 'line':
        chart = new G2Plot.Line(container, chartOptions);
        break;
      case 'liquid':
        chart = new G2Plot.Liquid(container, chartOptions);
        break;
      case 'pie':
        chart = new G2Plot.Pie(container, chartOptions);
        break;
      case 'radar':
        chart = new G2Plot.Radar(container, chartOptions);
        break;
      case 'radialbar':
        chart = new G2Plot.RadialBar(container, chartOptions);
        break;
      case 'rose':
        chart = new G2Plot.Rose(container, chartOptions);
        break;
      case 'sankey':
        chart = new G2Plot.Sankey(container, chartOptions);
        break;
      case 'scatter':
        chart = new G2Plot.Scatter(container, chartOptions);
        break;
      case 'stock':
        chart = new G2Plot.Stock(container, chartOptions);
        break;
      case 'sunburst':
        chart = new G2Plot.Sunburst(container, chartOptions);
        break;
      case 'treemap':
        chart = new G2Plot.Treemap(container, chartOptions);
        break;
      case 'venn':
        chart = new G2Plot.Venn(container, chartOptions);
        break;
      case 'violin':
        chart = new G2Plot.Violin(container, chartOptions);
        break;
      case 'waterfall':
        chart = new G2Plot.Waterfall(container, chartOptions);
        break;
      case 'wordcloud':
        chart = new G2Plot.WordCloud(container, chartOptions);
        break;
      default:
        throw new Error('unsupported chart type');
    }
    chart.render();
  }
}

import { Body, Controller, Header, Post, Query, Res } from '@nestjs/common';
import { G2plotService } from './g2plot.service';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Readable } from 'stream';
import { Response } from 'express';

@Controller('g2plot')
export class G2plotController {
  constructor(private readonly chartService: G2plotService) {}

  @Post()
  @Header('Content-Type', 'image/png')
  @ApiBody({ schema: { type: 'object' }, required: true })
  @ApiQuery({
    name: 'chartType',
    type: 'string',
    required: true,
    example:
      'area, bar, bidirectionalbar, box, bullet, chord, circlepacking, column, dualaxes, facet, funnel, gauge, heatmap, histogram, line, liquid, pie, radar, radialbar, rose, sankey, scatter, stock, sunburst, treemap, venn, violin, waterfall, wordcloud',
  })
  async GenerateChart(
    @Query('chartType') chartType: string,
    @Body() options: object,
    @Res() res: Response,
  ) {
    const buffer = await this.chartService.getChart({
      chartType: chartType,
      chartOptions: {
        ...options,
        animation: false,
        locale: 'zh-CN',
      },
    });
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream.pipe(res);
  }
}

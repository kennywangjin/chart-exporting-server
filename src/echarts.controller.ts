import { Body, Controller, Header, Post, Query, Res } from '@nestjs/common';
import { EChartsOption } from 'echarts';
import { Readable } from 'stream';
import { chartOptions } from './chartOptions';
import { EChartsService } from './echarts.service';
import { Response } from 'express';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('echarts')
export class EChartsController {
  constructor(private readonly echartsService: EChartsService) {}

  @Post()
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment')
  @ApiBody({ schema: { type: 'object' } })
  @ApiQuery({ name: 'width', type: 'number', required: false })
  @ApiQuery({ name: 'height', type: 'number', required: false })
  async GenerateChart(
    @Body() options: EChartsOption,
    @Res() res: Response,
    @Query('width') width?: number,
    @Query('height') height?: number,
  ) {
    const outputOptions: chartOptions = {
      width: width ?? 800,
      height: height ?? 600,
    };
    const buffer = await this.echartsService.getChart(options, outputOptions);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream.pipe(res);
  }
}

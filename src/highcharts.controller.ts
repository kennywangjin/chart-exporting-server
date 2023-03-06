import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import Highcharts from 'highcharts';
import { Readable } from 'stream';
import { HighchartsService } from './highcharts.service';
import { Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

@Controller('highcharts')
export class HighchartsController {
  constructor(private readonly highchartsService: HighchartsService) {}

  @Post()
  @Header('Content-Type', 'image/png')
  @ApiBody({ schema: { type: 'object' } })
  async GenerateChart(
    @Body() options: Highcharts.Options,
    @Res() res: Response,
  ) {
    const buffer = await this.highchartsService.getChart(options);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream.pipe(res);
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EChartsController } from './echarts/echarts.controller';
import { EChartsService } from './echarts/echarts.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { G2plotController } from './g2plot/g2plot.controller';
import { G2plotService } from './g2plot/g2plot.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    EChartsController,
    PdfController,
    G2plotController,
  ],
  providers: [AppService, EChartsService, PdfService, G2plotService],
})
export class AppModule {}

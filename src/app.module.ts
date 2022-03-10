import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EChartsController } from './echarts.controller';
import { EChartsService } from './echarts.service';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [],
  controllers: [AppController, EChartsController, PdfController],
  providers: [AppService, EChartsService, PdfService],
})
export class AppModule {}

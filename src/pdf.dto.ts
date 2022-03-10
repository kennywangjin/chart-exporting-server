import { ApiProperty } from '@nestjs/swagger';

export class PdfDto {
  @ApiProperty()
  html: string;
}

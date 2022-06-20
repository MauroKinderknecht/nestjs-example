import { IsOptional } from 'class-validator';

export class ConnectProductDTO {
  @IsOptional()
  id?: string;

  @IsOptional()
  sku?: string;

  @IsOptional()
  model?: string;
}

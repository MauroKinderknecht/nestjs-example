import { IsNotEmpty } from 'class-validator';

export class ConnectPriceDTO {
  @IsNotEmpty()
  id: string;
}

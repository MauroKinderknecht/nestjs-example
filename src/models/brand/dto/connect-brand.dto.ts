import { IsNotEmpty } from 'class-validator';

export class ConnectBrandDTO {
  @IsNotEmpty()
  id: string;
}

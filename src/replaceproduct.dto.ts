import { IsDefined, IsNumber, IsString, Min } from "class-validator";

export class replaceProductDto{
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  price: number;
}

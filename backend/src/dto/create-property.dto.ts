import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional, IsUrl } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @IsNumber()
  @IsNotEmpty()
  area: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['sale', 'rent'])
  type: 'sale' | 'rent';

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  featured?: boolean;
}

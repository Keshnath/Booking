import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateSearchDto {
  @IsString()
  propertyId!: string;

  @IsString()
  title!: string;

  @IsString()
  location!: string;

  @IsNumber()
  @Min(0)
  pricePerNight!: number;

  @IsNumber()
  @Min(0)
  bedrooms!: number;

  @IsNumber()
  @Min(0)
  bathrooms!: number;

  @IsNumber()
  @Min(1)
  guests!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

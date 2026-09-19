import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PricingStatus } from '../entities/pricing.entity';

export class CreatePricingDto {
  @IsUUID('4')
  @IsNotEmpty()
  propertyId!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be greater than 0' })
  @IsNotEmpty()
  price!: number;

  
}
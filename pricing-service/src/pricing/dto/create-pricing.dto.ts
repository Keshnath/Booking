import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Max,
} from 'class-validator';

export class CreatePricingDto {
  @IsUUID('4', { message: 'propertyId must be a valid UUID v4' })
  @IsNotEmpty()
  propertyId!: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price must be a valid currency amount with up to 2 decimal places' },
  )
  @IsPositive({ message: 'price must be greater than 0' })
  @Max(99999999.99, { message: 'price exceeds maximum allowed limit' })
  @IsNotEmpty()
  price!: number;
}
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Matches,
} from 'class-validator';
import { CANCELLATION_POLICY } from '../entities/property-detail.entity';


export class CreatePropertyDetailDto {
  @IsUUID('4')
  @IsNotEmpty()
  propertyId!: string;

  @IsNumber()
  @Min(1, { message: 'Guest count must be at least 1' })
  @IsNotEmpty()
  guests!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  beds?: number;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @IsOptional()
  bathrooms?: number;

  @IsString()
  @IsOptional()
  propertyType?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'checkInTime must be in HH:MM format (e.g., 15:00)',
  })
  @IsOptional()
  checkInTime?: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'checkOutTime must be in HH:MM format (e.g., 11:00)',
  })
  @IsOptional()
  checkOutTime?: string;

  @IsString()
  @IsOptional()
  houseRules?: string;

  @IsString()
  @IsOptional()
  cancellationPolicy?: CANCELLATION_POLICY = CANCELLATION_POLICY.FLEXIBLE;
}

import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  Min,
  MaxLength,
} from 'class-validator';

export class CreatePropertyDto {
  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  @IsNotEmpty()
  sub!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Property name cannot exceed 100 characters' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;


}
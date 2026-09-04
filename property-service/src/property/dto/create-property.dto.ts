import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  MaxLength,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreatePropertyDto {
  @IsUUID()
  @IsNotEmpty()
  sub!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Matches entity length constraint
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 }) // Ensures maximum 2 decimal places for currency
  @Min(0)
  price!: number;

  @IsInt() // Ensures integer values (rejects decimals like 2.5 guests)
  @IsPositive() // Equivalent to @Min(1)
  guests!: number;
}
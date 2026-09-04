import {
  IsUUID,
  IsDateString,
  IsInt,
  Min,
  IsNumberString,
  IsNotEmpty,
} from 'class-validator';

export class BookingDTO {
  @IsNotEmpty()
  @IsUUID('4')
  userId!: string;

  @IsNotEmpty()
  @IsUUID('4')
  propertyId!: string;

  @IsNotEmpty()
  @IsDateString()
  checkIn!: string;

  @IsNotEmpty()
  @IsDateString()
  checkOut!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  guests!: number;

  @IsNotEmpty()
  @IsInt()
  amount!: string;
}
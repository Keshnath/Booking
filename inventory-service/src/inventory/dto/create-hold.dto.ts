import { IsUUID, IsArray, IsDateString, ArrayNotEmpty } from 'class-validator';

export class CreateHoldDto {
  @IsUUID()
  propertyId!: string;

  @IsUUID()
  userId!: string;

  @IsDateString()
  checkIn!: string;

  @IsDateString()
  checkOut!: string;
}

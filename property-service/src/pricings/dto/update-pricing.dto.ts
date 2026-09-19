import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingDto } from './create-pricing.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePricingDto extends PartialType(CreatePricingDto) {
  @IsUUID('4', { message: 'id must be a valid UUID v4' })
  @IsNotEmpty({ message: 'id is required to perform an update' })
  id!: string;
}


import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDetailDto } from './create-property-detail.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePropertyDetailDto extends PartialType(
  CreatePropertyDetailDto,
) {
  @IsUUID('4', { message: 'id must be a valid UUID v4' })
  @IsNotEmpty({ message: 'id is required to perform an update' })
  id!: string;
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from '../../property/entities/proprety.entity';

export enum PricingStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVE = 'ARCHIVE',
}

@Entity('pricings')
@Index(['propertyId', 'status'])
export class Pricing {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Foreign key column storing propertyId
  @Index()
  @Column({ type: 'uuid', nullable: false })
  propertyId!: string;

  // Many-to-One relationship with CASCADE delete
  @ManyToOne(() => Property, (property) => property.pricings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property!: Property;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  price!: number;

  @Column({
    type: 'enum',
    enum: PricingStatus,
    default: PricingStatus.ACTIVE,
  })
  status!: PricingStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PricingStatus {
  ARCHIVE = 'ARCHIVE',
  ACTIVE = 'ACTIVE',
}

@Entity('pricing')
@Index(['propertyId', 'status']) // Multi-column index for common query filters

export class Pricing {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index() // Single index for quick foreign-key lookups
  @Column({ type: 'uuid' })
  propertyId!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value ? parseFloat(value) : value),
    },
  })
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
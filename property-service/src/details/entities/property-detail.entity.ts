import { Property } from 'src/property/entities/proprety.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';


export enum CANCELLATION_POLICY {
  FLEXIBLE = 'FLEXIBLE',
  MODERATE = 'MODERATE',
  STRICT = 'STRICT',
}


@Entity('details')
export class Details {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Foreign key column storing propertyId (Unique constraint enforces strictly 1-to-1)
  @Index({ unique: true })
  @Column({ type: 'uuid', nullable: false })
  propertyId!: string;

  // 1-to-1 relationship with CASCADE delete
  @OneToOne(() => Property, (property) => property.detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property!: Property;

  @Column({ type: 'int', nullable: false, default: 1 })
  guests!: number;

  @Column({ type: 'int', default: 1 })
  bedrooms!: number;

  @Column({ type: 'int', default: 1 })
  beds!: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 1.0 })
  bathrooms!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  propertyType!: string;

  @Column({ type: 'jsonb', nullable: true })
  amenities!: string[];

  @Column({ type: 'varchar', length: 10, default: '15:00' })
  checkInTime!: string;

  @Column({ type: 'varchar', length: 10, default: '11:00' })
  checkOutTime!: string;

  @Column({ type: 'text', nullable: true })
  houseRules!: string;

  @Column({ type: 'enum', enum: CANCELLATION_POLICY, default: CANCELLATION_POLICY.FLEXIBLE })
  cancellationPolicy!: CANCELLATION_POLICY;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

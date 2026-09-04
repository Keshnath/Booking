import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum BookingStatus {
  INITIATED = 'INITIATED', // Initial state before inventory hold
  PENDING = 'PENDING', // Initial state after inventory hold
  CONFIRMED = 'CONFIRMED', // After successful payment
  CANCELLED = 'CANCELLED', // After cancellation or failed payment
}

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  inventoryHoldId!: string;

  @Column('uuid')
  userId!: string;

  @Column('uuid')
  propertyId!: string;

  @Column({ type: 'enum', enum: BookingStatus })
  status!: string;

  @Column({ type: 'date' })
  checkIn!: string;

  @Column({ type: 'date' })
  checkOut!: string;

  @Column({ type: 'int' })
  guests!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: string;

  @Column({ type: 'uuid', nullable: true })
  paymentId!: string | null;

  @Column({ type: 'date', nullable: true })
  expiresAt!: string | null;

  @Column({ type: 'date', nullable: true })
  confirmedAt!: string | null;

  @Column({ type: 'date', nullable: true })
  cancelledAt!: string | null;

  @Column({ type: 'date' })
  createdAt!: string;

  @Column({ type: 'date' })
  updatedAt!: string;
}

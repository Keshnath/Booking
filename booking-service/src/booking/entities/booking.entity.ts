import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  CONFIRMED = 'CONFIRMED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  EXPIRED = 'EXPIRED',
  CANCELLATION_REQUESTED = 'CANCELLATION_REQUESTED',
  CANCELLED = 'CANCELLED',
  FAILED_AFTER_PAYMENT = 'FAILED_AFTER_PAYMENT',
  REFUND_REQUIRED = 'REFUND_REQUIRED',
}

@Entity('bookings')
@Check('CHK_bookings_guest_count_positive', 'guest_count > 0')
@Check('CHK_bookings_date_range', 'check_out > check_in')
@Check('CHK_bookings_subtotal_non_negative', 'subtotal >= 0')
@Check('CHK_bookings_discount_non_negative', 'discount >= 0')
@Check('CHK_bookings_tax_non_negative', 'tax >= 0')
@Check('CHK_bookings_service_fee_non_negative', 'service_fee >= 0')
@Check('CHK_bookings_total_non_negative', 'total >= 0')
@Index('IDX_bookings_user_id', ['userId'])
@Index('IDX_bookings_property_id', ['propertyId'])
@Index('IDX_bookings_status', ['status'])
@Index('IDX_bookings_created_at', ['createdAt'])
@Index('IDX_bookings_expires_at', ['expiresAt'])
@Index('IDX_bookings_property_dates', ['propertyId', 'checkIn', 'checkOut'])
@Index('IDX_bookings_user_created_at', ['userId', 'createdAt'])
@Index('IDX_bookings_status_expires_at', ['status', 'expiresAt'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId!: string;

  @Column({ name: 'check_in', type: 'date' })
  checkIn!: string;

  @Column({ name: 'check_out', type: 'date' })
  checkOut!: string;

  @Column({ name: 'guest_count', type: 'integer' })
  guestCount!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  subtotal!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discount!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  tax!: string;

  @Column({ name: 'service_fee', type: 'numeric', precision: 12, scale: 2, default: 0 })
  serviceFee!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total!: string;

  @Column({ name: 'quote_id', type: 'uuid', nullable: true })
  quoteId!: string | null;

  @Column({ name: 'inventory_hold_id', type: 'uuid', nullable: true })
  inventoryHoldId!: string | null;

  @Column({ name: 'payment_id', type: 'uuid', nullable: true })
  paymentId!: string | null;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;

  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt!: Date | null;

  @Column({ name: 'cancelled_at', type: 'timestamptz', nullable: true })
  cancelledAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
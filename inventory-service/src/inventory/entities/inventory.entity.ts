import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';

export enum InventoryStatus {
  HELD = 'HELD', // 10-min temporary hold during checkout
  CONFIRMED = 'CONFIRMED', // Paid and booked
  BLOCKED = 'BLOCKED', // Host blocked for maintenance/personal use
}

@Entity('inventory')
// Ensure a property can only have ONE inventory row per day
@Unique(['propertyId', 'date'])
// Index for fast date-range queries during search & checkout
@Index(['propertyId', 'date', 'status'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  propertyId!: string;

  @Column({type : 'uuid'})
  userId! : string


  // Stores the specific calendar day (YYYY-MM-DD)
  @Column({ type: 'date' })
  date!: string;

  @Column({
    type: 'enum',
    enum: InventoryStatus,
  })
  status!: InventoryStatus;

  // Critical for 10-minute lock expiration cleanup
  @Column({ type: 'timestamp with time zone', nullable: true })
  holdUntil!: Date | null;

  // Useful to associate which booking reference placed the lock/booking
  @Column({ type: 'uuid', nullable: true })
  bookingId!: string | null;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}

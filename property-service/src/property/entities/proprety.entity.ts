import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('properties') // Recommendation 1: Plural table naming
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index() // Recommendation 2: Index foreign key columns
  @Column('uuid')
  userId!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text' }) // Recommendation 3: Explicit text type for long descriptions
  description!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) // Recommendation 4: Precision for financial values
  price!: number;

  @Column({ type: 'int' }) // Recommendation 5: Explicit integer type
  guests!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
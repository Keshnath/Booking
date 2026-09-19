import { Details } from 'src/details/entities/property-detail.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  OneToMany,
} from 'typeorm';



@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  // Inverse 1-to-1 relation with PropertyDetail (No physical column created in DB)
  @OneToOne(() => Details, (detail) => detail.property)
  detail!: Details;

  // Inverse 1-to-Many relation with Pricing history (No physical column created in DB)
  @OneToMany(() => Pricing, (pricing) => pricing.property)
  pricings!: Pricing[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
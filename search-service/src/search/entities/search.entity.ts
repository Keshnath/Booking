import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// 1. Pricing Sub-Schema
@Schema({ _id: false })
export class PricingItem {
  @Prop({ required: true })
  priceId!: string;

  @Prop({ required: true, type: Number, index: true })
  price!: number;

  @Prop({ required: true, default: 'ACTIVE' })
  status!: string;

  @Prop({ type: Date, default: Date.now })
  effectiveDate!: Date;
}
export const PricingItemSchema = SchemaFactory.createForClass(PricingItem);

// 2. Inventory Sub-Schema (Unavailable Dates Tracking)
@Schema({ _id: false })
export class Inventory {
  // Store dates as 'YYYY-MM-DD' formatted strings or Date objects
  @Prop({ type: [String], default: [], index: true })
  UnavailableDates!: string[];
}
export const InventorySchema = SchemaFactory.createForClass(Inventory);

// 3. Property Details Sub-Schema
@Schema({ _id: false })
export class PropertyDetails {
  @Prop({ required: true, type: Number, index: true })
  guests!: number;

  @Prop({ type: Number, default: 1 })
  bedrooms!: number;

  @Prop({ type: Number, default: 1 })
  beds!: number;

  @Prop({ type: Number, default: 1.0 })
  bathrooms!: number;

  @Prop({ type: String, default: null, index: true })
  propertyType!: string;

  @Prop({ type: [String], default: [], index: true })
  amenities!: string[];

  @Prop({ type: String, default: '15:00' })
  checkInTime!: string;

  @Prop({ type: String, default: '11:00' })
  checkOutTime!: string;

  @Prop({ type: String, default: null })
  houseRules!: string;

  @Prop({ type: String, default: 'FLEXIBLE' })
  cancellationPolicy!: string;
}
export const PropertyDetailsSchema = SchemaFactory.createForClass(PropertyDetails);

// 4. Main Denormalized Search Document
export type PropertySearchDocument = HydratedDocument<PropertySearch>;

@Schema({
  collection: 'property_searches',
  timestamps: true,
})
export class PropertySearch {
  @Prop({ required: true, unique: true, index: true })
  propertyId!: string;

  @Prop({ required: true, index: true })
  userId!: string;

  @Prop({ required: true, trim: true, index: 'text' })
  name!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT', index: true })
  status!: string;

  @Prop({ type: PricingItemSchema, required: false })
  pricing?: PricingItem;

  @Prop({ type: PropertyDetailsSchema, required: false })
  details?: PropertyDetails;

  @Prop({ type: InventorySchema, required: false })
  inventory?: Inventory;
}

export const PropertySearchSchema = SchemaFactory.createForClass(PropertySearch);

// Compound Index: Optimizes multi-field filter queries (Status + Guests + Price)
PropertySearchSchema.index({ status: 1, 'details.guests': 1, 'pricing.price': 1 });
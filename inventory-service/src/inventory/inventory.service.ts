import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory, InventoryStatus } from './entities/inventory.entity';
import { DataSource, In } from 'typeorm';
import { CreateHoldDto } from './dto/create-hold.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async createInventoryHold(dto: CreateHoldDto): Promise<Inventory[]> {
    const { propertyId, userId, checkIn, checkOut } = dto;
    const datesToHold = this.generateDateRange(checkIn, checkOut);
    const holdUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // 1. Find existing rows for these dates using standard Repository methods
        const existingRecords = await transactionalEntityManager.find(
          Inventory,
          {
            where: {
              propertyId,
              date: In(datesToHold),
            },
            lock: { mode: 'pessimistic_write' }, // Built-in TypeORM row lock
          },
        );

        const now = new Date();

        // 2. Validate availability
        for (const record of existingRecords) {
          const isExpired =
            record.status === InventoryStatus.HELD &&
            record.holdUntil &&
            record.holdUntil <= now;

          if (!isExpired) {
            throw new ConflictException(`Date ${record.date} is unavailable.`);
          }
        }

        // 3. Prepare entities
        const recordsToSave: Inventory[] = datesToHold.map((dateStr) => {
          const existing = existingRecords.find((r) => r.date === dateStr);

          if (existing) {
            existing.status = InventoryStatus.HELD;
            existing.userId = userId;
            existing.holdUntil = holdUntil;
            return existing;
          }

          return transactionalEntityManager.create(Inventory, {
            propertyId,
            userId,
            date: dateStr,
            status: InventoryStatus.HELD,
            holdUntil,
          });
        });

        // 4. Save batch
        return await transactionalEntityManager.save(Inventory, recordsToSave);
      },
    );
  }

  private generateDateRange(checkIn: string, checkOut: string): string[] {
    const dates: string[] = [];
    const current = new Date(checkIn);
    const end = new Date(checkOut);
    while (current < end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
}

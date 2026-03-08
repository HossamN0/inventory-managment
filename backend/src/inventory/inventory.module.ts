import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';
import { Counter, CounterSchema } from './schemas/counter.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: InventoryItem.name, schema: InventoryItemSchema },
            { name: Counter.name, schema: CounterSchema },
        ]),
    ],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [InventoryService],
})
export class InventoryModule { }

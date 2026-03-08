import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { InventoryItem, InventoryItemDocument } from './schemas/inventory-item.schema';
import { Counter, CounterDocument } from './schemas/counter.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel(InventoryItem.name)
        private inventoryItemModel: Model<InventoryItemDocument>,
        @InjectModel(Counter.name)
        private counterModel: Model<CounterDocument>,
    ) { }

    private async getNextSku(): Promise<string> {
        const counter = await this.counterModel.findOneAndUpdate(
            { modelName: 'inventory_sku' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const seqStr = counter.seq.toString().padStart(3, '0');
        return `INV-${seqStr}`;
    }

    async create(createItemDto: CreateItemDto): Promise<InventoryItem> {
        const sku = await this.getNextSku();
        const newItem = new this.inventoryItemModel({
            ...createItemDto,
            sku
        });
        return await newItem.save();
    }

    async findAll(): Promise<InventoryItem[]> {
        return await this.inventoryItemModel.find().sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<InventoryItem> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID');
        }
        const item = await this.inventoryItemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async update(id: string, updateItemDto: UpdateItemDto): Promise<InventoryItem> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID');
        }
        const updatedItem = await this.inventoryItemModel
            .findByIdAndUpdate(id, updateItemDto, { new: true })
            .exec();

        if (!updatedItem) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return updatedItem;
    }

    async remove(id: string): Promise<void> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID');
        }
        const result = await this.inventoryItemModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
    }
}

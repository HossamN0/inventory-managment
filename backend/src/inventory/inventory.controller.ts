import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createItemDto: CreateItemDto) {
        return this.inventoryService.create(createItemDto);
    }

    @Get()
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.inventoryService.update(id, updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}

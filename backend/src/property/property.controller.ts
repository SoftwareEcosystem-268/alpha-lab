import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll(): Promise<Property[]> {
    return this.propertyService.findAll();
  }

  @Get('featured')
  findFeatured(): Promise<Property[]> {
    return this.propertyService.findFeatured();
  }

  @Get('type/:type')
  findByType(@Param('type') type: 'sale' | 'rent'): Promise<Property[]> {
    return this.propertyService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Property> {
    return this.propertyService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.propertyService.remove(+id);
  }
}

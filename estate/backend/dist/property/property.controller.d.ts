import { PropertyService } from './property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    findAll(): Promise<Property[]>;
    findFeatured(): Promise<Property[]>;
    findByType(type: 'sale' | 'rent'): Promise<Property[]>;
    findOne(id: number): Promise<Property>;
    update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property>;
    remove(id: number): Promise<void>;
}

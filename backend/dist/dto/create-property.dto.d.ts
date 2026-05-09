export declare class CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    location: string;
    type: 'sale' | 'rent';
    imageUrl: string;
    featured?: boolean;
}

import { DataSource } from 'typeorm';
import { Property } from '../entities/property.entity';

export async function seed() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'real_estate.db',
    entities: [Property],
    synchronize: true,
  });

  await dataSource.initialize();
  const propertyRepository = dataSource.getRepository(Property);

  const sampleProperties = [
    {
      title: 'Modern Luxury Villa',
      description: 'Stunning modern villa with panoramic views, featuring an open floor plan, gourmet kitchen, and resort-style pool. Perfect for families who love to entertain.',
      price: 1250000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      location: 'Beverly Hills, CA',
      type: 'sale' as const,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      featured: true,
    },
    {
      title: 'Downtown Penthouse',
      description: 'Luxurious penthouse in the heart of downtown with floor-to-ceiling windows offering breathtaking city views. Features include private elevator and rooftop terrace.',
      price: 8500,
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      location: 'Manhattan, NY',
      type: 'rent' as const,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      featured: true,
    },
    {
      title: 'Cozy Family Home',
      description: 'Charming family home in a quiet neighborhood with excellent schools. Features a spacious backyard, updated kitchen, and plenty of storage.',
      price: 485000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      location: 'Austin, TX',
      type: 'sale' as const,
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      featured: false,
    },
    {
      title: 'Beachfront Condo',
      description: 'Wake up to ocean views in this beautifully furnished beachfront condo. Steps from the sand with resort-style amenities including pool and fitness center.',
      price: 3200,
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      location: 'Miami Beach, FL',
      type: 'rent' as const,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      featured: true,
    },
    {
      title: 'Mountain Retreat',
      description: 'Escape to this stunning mountain home with panoramic views of the peaks. Perfect for outdoor enthusiasts with ski-in/ski-out access and hot tub.',
      price: 795000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      location: 'Aspen, CO',
      type: 'sale' as const,
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      featured: false,
    },
    {
      title: 'Urban Loft',
      description: 'Industrial-chic loft in trendy arts district. Soaring ceilings, exposed brick, and designer finishes throughout. Walk to shops and restaurants.',
      price: 2800,
      bedrooms: 1,
      bathrooms: 1,
      area: 1100,
      location: 'San Francisco, CA',
      type: 'rent' as const,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      featured: false,
    },
    {
      title: 'Lakefront Estate',
      description: 'Magnificent estate on private lake with 200 feet of waterfront. Features include private dock, guest house, and meticulously landscaped grounds.',
      price: 2100000,
      bedrooms: 6,
      bathrooms: 5,
      area: 6500,
      location: 'Lake Tahoe, NV',
      type: 'sale' as const,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      featured: true,
    },
    {
      title: 'City View Apartment',
      description: 'Modern apartment with stunning city views in prime location. Recently renovated with high-end finishes and in-unit laundry.',
      price: 1950,
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      location: 'Chicago, IL',
      type: 'rent' as const,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      featured: false,
    },
  ];

  for (const property of sampleProperties) {
    await propertyRepository.save(property);
  }

  console.log(`Seeded ${sampleProperties.length} properties successfully!`);
  await dataSource.destroy();
}

seed();

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  area: number;

  @Column()
  location: string;

  @Column()
  type: 'sale' | 'rent';

  @Column()
  imageUrl: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

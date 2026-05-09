import { Property } from '../types/property.ts';

const API_URL = 'http://localhost:3000/properties';

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const response = await fetch(API_URL);
    return response.json();
  },

  async getById(id: number): Promise<Property> {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },

  async getFeatured(): Promise<Property[]> {
    const response = await fetch(`${API_URL}/featured`);
    return response.json();
  },

  async getByType(type: 'sale' | 'rent'): Promise<Property[]> {
    const response = await fetch(`${API_URL}/type/${type}`);
    return response.json();
  },

  async create(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    return response.json();
  },

  async update(id: number, property: Partial<Property>): Promise<Property> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  },
};

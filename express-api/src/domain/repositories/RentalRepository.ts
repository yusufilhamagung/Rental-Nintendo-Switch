import { Rental } from '@domain/entities/Rental';

export interface RentalRepository {
  create(data: Omit<Rental, 'id'>): Promise<Rental>;
  findById(id: number): Promise<Rental | null>;
  markReturned(id: number, endDate: Date): Promise<void>;
}

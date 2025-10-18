import { Rental } from '../entities/Rental'

export interface RentalRepository {
  create(payload: { consoleId: number; customerName: string; days: number }): Promise<Rental>
  return(id: number): Promise<{ id: number; endDate: string }>
}


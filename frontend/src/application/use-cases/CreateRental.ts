import { Rental } from '@domain/entities/Rental'
import { RentalRepository } from '@domain/repositories/RentalRepository'

export interface CreateRentalInput {
  consoleId: number
  customerName: string
  days: number
}

export class CreateRental {
  constructor(private rentals: RentalRepository) {}
  execute(input: CreateRentalInput): Promise<Rental> {
    return this.rentals.create(input)
  }
}


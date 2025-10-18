import { apiClient } from '../http/apiClient'
import { RentalRepository } from '@domain/repositories/RentalRepository'
import { Rental } from '@domain/entities/Rental'

export class HttpRentalRepository implements RentalRepository {
  async create(payload: { consoleId: number; customerName: string; days: number }): Promise<Rental> {
    const res = await apiClient.post<{ status: boolean; data: Rental }>(`/rentals`, payload)
    return res.data
  }

  async return(id: number): Promise<{ id: number; endDate: string }> {
    const res = await apiClient.post<{ status: boolean; data: { id: number; endDate: string } }>(`/rentals/${id}/return`)
    return res.data
  }
}


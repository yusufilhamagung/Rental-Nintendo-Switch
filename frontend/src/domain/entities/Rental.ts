export type RentalStatus = 'active' | 'returned' | 'cancelled'

export interface Rental {
  id: number
  consoleId: number
  customerName: string
  startDate: string
  endDate: string
  status: RentalStatus
  totalPrice: number
}


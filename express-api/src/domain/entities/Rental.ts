export type RentalStatus = 'active' | 'returned' | 'cancelled';

export interface Rental {
  id: number;
  consoleId: number;
  customerName: string;
  startDate: Date;
  endDate: Date;
  status: RentalStatus;
  totalPrice: number;
}


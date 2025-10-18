export class ReturnRental {
  constructor(private rentals: { return: (id: number) => Promise<{ id: number; endDate: string }> }) {}
  execute(id: number) {
    return this.rentals.return(id)
  }
}


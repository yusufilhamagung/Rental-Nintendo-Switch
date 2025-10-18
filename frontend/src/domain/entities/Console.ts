export type ConsoleStatus = 'available' | 'rented' | 'maintenance'

export type ConsolePlatform = 'Switch' | 'PS3' | 'PS4' | 'PS5'

export interface GameConsole {
  id: number
  model: string
  condition: string
  dailyPrice: number
  status: ConsoleStatus
  platform?: ConsolePlatform
  imageUrl?: string
}

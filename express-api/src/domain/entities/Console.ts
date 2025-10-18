export type ConsoleStatus = 'available' | 'rented' | 'maintenance';

export interface GameConsole {
  id: number;
  model: string; // e.g., OLED, V2
  condition: string; // e.g., Good, Like New
  dailyPrice: number; // price per day
  status: ConsoleStatus;
}


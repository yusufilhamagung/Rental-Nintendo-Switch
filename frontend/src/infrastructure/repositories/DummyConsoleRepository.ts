import { ConsoleRepository } from '@domain/repositories/ConsoleRepository'
import type { GameConsole } from '@domain/entities/Console'

// Local images served from /public/images
const IMG = {
  switch: '/images/switch.jpg',
  ps3: '/images/ps3.jpg',
  ps4: '/images/ps4.jpg',
  ps5: '/images/ps5.jpg',
}

// Rich dummy catalog covering Switch + PS3/PS4/PS5
const DUMMY_CONSOLES: GameConsole[] = [
  // Nintendo Switch
  { id: 1, model: 'Switch OLED (White)', condition: 'Like New', dailyPrice: 50000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 2, model: 'Switch V2 (Neon)', condition: 'Good', dailyPrice: 40000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 3, model: 'Switch Lite (Blue)', condition: 'Good', dailyPrice: 30000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 4, model: 'Switch OLED (Zelda Ed.)', condition: 'Like New', dailyPrice: 55000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 5, model: 'Switch V2 (Gray)', condition: 'Fair', dailyPrice: 35000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 6, model: 'Switch Lite (Yellow)', condition: 'Good', dailyPrice: 30000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },

  // PlayStation 3
  { id: 101, model: 'PS3 Slim 320GB', condition: 'Good', dailyPrice: 25000, status: 'available', platform: 'PS3', imageUrl: IMG.ps3 },
  { id: 102, model: 'PS3 Super Slim', condition: 'Good', dailyPrice: 23000, status: 'available', platform: 'PS3', imageUrl: IMG.ps3 },
  { id: 103, model: 'PS3 Fat 60GB', condition: 'Fair', dailyPrice: 20000, status: 'available', platform: 'PS3', imageUrl: IMG.ps3 },

  // PlayStation 4
  { id: 201, model: 'PS4 Slim 500GB', condition: 'Good', dailyPrice: 30000, status: 'available', platform: 'PS4', imageUrl: IMG.ps4 },
  { id: 202, model: 'PS4 Pro 1TB', condition: 'Like New', dailyPrice: 40000, status: 'available', platform: 'PS4', imageUrl: IMG.ps4 },
  { id: 203, model: 'PS4 Slim 1TB', condition: 'Good', dailyPrice: 32000, status: 'available', platform: 'PS4', imageUrl: IMG.ps4 },
  { id: 204, model: 'PS4 Pro (CUH-7218B)', condition: 'Good', dailyPrice: 42000, status: 'available', platform: 'PS4', imageUrl: IMG.ps4 },

  // PlayStation 5
  { id: 301, model: 'PS5 Standard', condition: 'Like New', dailyPrice: 65000, status: 'available', platform: 'PS5', imageUrl: IMG.ps5 },
  { id: 302, model: 'PS5 Digital', condition: 'Like New', dailyPrice: 62000, status: 'available', platform: 'PS5', imageUrl: IMG.ps5 },
  { id: 303, model: 'PS5 Slim Standard', condition: 'Like New', dailyPrice: 70000, status: 'available', platform: 'PS5', imageUrl: IMG.ps5 },
  { id: 304, model: 'PS5 Slim Digital', condition: 'Like New', dailyPrice: 68000, status: 'available', platform: 'PS5', imageUrl: IMG.ps5 },

  // More variety
  { id: 7, model: 'Switch OLED (Neon)', condition: 'Like New', dailyPrice: 52000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 8, model: 'Switch Lite (Coral)', condition: 'Good', dailyPrice: 30000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
  { id: 205, model: 'PS4 Slim (Glacier White)', condition: 'Good', dailyPrice: 33000, status: 'available', platform: 'PS4', imageUrl: IMG.ps4 },
  { id: 104, model: 'PS3 Slim (Charcoal Black)', condition: 'Good', dailyPrice: 24000, status: 'available', platform: 'PS3', imageUrl: IMG.ps3 },
  { id: 305, model: 'PS5 Standard (CFI-1200A)', condition: 'Like New', dailyPrice: 66000, status: 'available', platform: 'PS5', imageUrl: IMG.ps5 },
  { id: 9, model: 'Switch V2 (Monster Hunter)', condition: 'Like New', dailyPrice: 54000, status: 'available', platform: 'Switch', imageUrl: IMG.switch },
]

export class DummyConsoleRepository implements ConsoleRepository {
  async listAvailable(): Promise<GameConsole[]> {
    // Return only available items to mimic backend endpoint
    return DUMMY_CONSOLES.filter((c) => c.status === 'available')
  }
}

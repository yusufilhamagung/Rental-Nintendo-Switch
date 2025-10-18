export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

async function request<T>(path: string, method: HttpMethod = 'GET', body?: any): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let msg = 'Request failed'
    try {
      const data = await res.json()
      msg = data?.message || msg
    } catch {}
    throw new Error(msg)
  }
  return res.json()
}

export const api = {
  health: () => request<{ status: boolean; message: string }>(`/health`),
  listConsoles: () => request<{ status: boolean; data: GameConsole[] }>(`/consoles/available`),
  createRental: (payload: { consoleId: number; customerName: string; days: number }) =>
    request<{ status: boolean; data: Rental }>(`/rentals`, 'POST', payload),
  returnRental: (id: number) => request<{ status: boolean; data: any }>(`/rentals/${id}/return`, 'POST'),
}

export interface GameConsole {
  id: number
  model: string
  condition: string
  dailyPrice: number
  status: 'available' | 'rented' | 'maintenance'
}

export interface Rental {
  id: number
  consoleId: number
  customerName: string
  startDate: string
  endDate: string
  status: 'active' | 'returned' | 'cancelled'
  totalPrice: number
}


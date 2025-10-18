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

export const apiClient = {
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, body?: any) => request<T>(path, 'POST', body),
}


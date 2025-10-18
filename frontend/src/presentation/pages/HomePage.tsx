import { useEffect, useMemo, useState } from 'react'
import Navbar from '@presentation/components/Navbar'
import ConsoleCard from '@presentation/components/ConsoleCard'
import { useCases } from '@composition/di'
import type { GameConsole } from '@domain/entities/Console'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<GameConsole[]>([])

  const load = async () => {
    setLoading(true)
    try {
      const data = await useCases.getAvailableConsoles.execute()
      setItems(data)
    } catch (e: any) {
      toast.error(e.message || 'Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const availableCount = useMemo(() => items.filter(i => i.status === 'available').length, [items])

  const [rentForm, setRentForm] = useState({ consoleId: 0, customerName: '', days: 1 })
  const submitRent = async () => {
    try {
      await useCases.createRental.execute(rentForm)
      toast.success('Sewa berhasil dibuat')
      setRentForm({ consoleId: 0, customerName: '', days: 1 })
      load()
    } catch (e: any) {
      toast.error(e.message || 'Gagal membuat sewa')
    }
  }

  const [returnId, setReturnId] = useState('')
  const submitReturn = async () => {
    try {
      const id = Number(returnId)
      if (!id) return toast.error('Masukkan ID sewa yang valid')
      await useCases.returnRental.execute(id)
      toast.success('Pengembalian berhasil')
      setReturnId('')
      load()
    } catch (e: any) {
      toast.error(e.message || 'Gagal mengembalikan sewa')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Sewa Nintendo Switch mudah, cepat, dan terjangkau
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Pilih konsol favoritmu dan mulai bermain hari ini. Proses cepat, harga transparan.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#katalog" className="btn-brand w-full sm:w-auto">Lihat Katalog</a>
              <a href="#sewa" className="btn-outline w-full sm:w-auto">Mulai Sewa</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-pink-500 opacity-90 shadow-xl">
              <img src="/images/hero-modern.jpg" alt="Setup Gaming Modern" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-xl bg-pink-300 blur-xl dark:bg-pink-800" />
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-xl bg-blue-300 blur-xl dark:bg-blue-800" />
          </div>
        </div>
      </section>

      <section id="katalog" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-0">
          <div>
            <h2 className="text-2xl font-semibold">Katalog Tersedia</h2>
            <p className="text-sm text-gray-500">{availableCount} tersedia dari {items.length} konsol</p>
          </div>
          <button className="btn-outline w-full sm:w-auto" onClick={load}>
            Muat Ulang
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Memuat data...</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map(item => (
              <ConsoleCard key={item.id} item={item} onRent={(consoleId) => setRentForm(f => ({ ...f, consoleId }))} />
            ))}
          </div>
        )}
      </section>

      <section id="sewa" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Form Sewa</h2>
        <div className="card grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">ID Konsol</label>
            <input className="input" type="number" value={rentForm.consoleId || ''}
              onChange={e => setRentForm({ ...rentForm, consoleId: Number(e.target.value) })} placeholder="Mis. 1" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Nama Penyewa</label>
            <input className="input" value={rentForm.customerName}
              onChange={e => setRentForm({ ...rentForm, customerName: e.target.value })} placeholder="Namamu" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Durasi (hari)</label>
            <input className="input" type="number" min={1} value={rentForm.days}
              onChange={e => setRentForm({ ...rentForm, days: Number(e.target.value) })} />
          </div>
          <div className="md:col-span-3">
            <button className="btn-brand w-full md:w-auto" onClick={submitRent}>Buat Sewa</button>
          </div>
        </div>
      </section>

      <section id="pengembalian" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16">
        <h2 className="mb-4 text-2xl font-semibold">Pengembalian</h2>
        <div className="card grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">ID Sewa</label>
            <input className="input" value={returnId} onChange={e => setReturnId(e.target.value)} placeholder="Mis. 10" />
          </div>
          <div className="md:col-span-2 flex items-stretch sm:items-end">
            <button className="btn-brand w-full sm:w-auto" onClick={submitReturn}>Kembalikan</button>
          </div>
        </div>
      </section>
    </div>
  )
}



import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Sewa Nintendo Switch" className="h-8 w-8" />
          <span className="text-lg font-semibold">Sewa Nintendo Switch</span>
        </div>
        <button
          className="btn-outline md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-2 text-sm md:flex md:gap-3">
          <a className="btn-outline" href="#katalog">Katalog</a>
          <a className="btn-outline" href="#sewa">Sewa</a>
          <a className="btn-outline" href="#pengembalian">Pengembalian</a>
        </nav>
      </div>
      {open && (
        <div className="border-t border-gray-200 bg-white/95 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            <a className="btn-outline" href="#katalog" onClick={() => setOpen(false)}>Katalog</a>
            <a className="btn-outline" href="#sewa" onClick={() => setOpen(false)}>Sewa</a>
            <a className="btn-outline" href="#pengembalian" onClick={() => setOpen(false)}>Pengembalian</a>
          </div>
        </div>
      )}
    </header>
  )
}

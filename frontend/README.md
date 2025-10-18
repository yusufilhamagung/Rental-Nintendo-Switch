<div align="center">

# 🕹️ Frontend — React + Vite + Tailwind

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=061B2A)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

## ✨ Ringkasan
- UI katalog dan transaksi sewa (Switch, PS3, PS4, PS5)
- Responsif; navbar mobile toggle; hero modern
- Katalog bergambar + badge platform; notifikasi `react-hot-toast`
- Sumber data katalog: Dummy lokal atau HTTP API

## 🧠 Arsitektur (Clean Architecture)
- Domain → entitas (Console, Rental) + kontrak repository
- Application → use case (GetAvailableConsoles, CreateRental, ReturnRental)
- Infrastructure → repository HTTP & Dummy + API client (fetch)
- Presentation → komponen UI (Navbar, ConsoleCard) + HomePage
- Composition → service locator di `src/composition/di.ts`

## 🗂️ Struktur Direktori
- `src/domain` — entities & interface repository
- `src/application` — use cases
- `src/infrastructure` — api client dan repository (HTTP/Dummy)
- `src/presentation` — components dan pages (UI)
- `src/composition/di.ts` — wiring dependency/use case
- `src/App.tsx` — root UI

## ▶️ Menjalankan
1) Backend (opsional)
- Jalankan `express-api` (http://localhost:3000) untuk transaksi nyata.

2) Dev server
```bash
cd frontend
npm install
npm run dev
```
Buka http://localhost:5173.

3) Build & preview
```bash
npm run build
npm run preview
```

## ⚙️ Konfigurasi
- Proxy dev → backend: `vite.config.ts` (`VITE_PROXY_TARGET`, default `http://localhost:3000`)
- Base URL API produksi: `VITE_API_BASE_URL` (fallback `/api`). Lihat `.env.example`.

## 🧪 Data Katalog (Dummy vs HTTP)
- Default: Dummy (`DummyConsoleRepository`) dengan gambar lokal:
  - `public/images/switch.jpg`, `ps3.jpg`, `ps4.jpg`, `ps5.jpg`
- Data nyata: ganti ke `HttpConsoleRepository` di `src/composition/di.ts`.
- Aksi “Buat Sewa” dan “Pengembalian” tetap via backend.

## 🎨 Desain/UX
- Grid responsif (`sm`, `lg`, `xl`), tombol full‑width di mobile
- Navbar dengan menu toggle di mobile
- Hero: `public/images/hero-modern.jpg`

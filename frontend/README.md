# Frontend (Vite + React + TypeScript)

Ringkasan
- UI katalog dan transaksi sewa (Switch, PS3, PS4, PS5).
- Responsif untuk mobile/desktop, navbar mobile toggle, hero modern.
- Katalog bergambar dengan badge platform, tombol Sewa, notifikasi `react-hot-toast`.
- Data katalog dapat memakai dummy lokal atau HTTP API.

Teknologi
- Vite 5, React 18, TypeScript 5, Tailwind CSS 3, react-hot-toast.

Arsitektur (Clean Architecture)
- Domain: entitas murni (Console, Rental) + kontrak repository.
- Application: use case (GetAvailableConsoles, CreateRental, ReturnRental).
- Infrastructure: repository HTTP dan dummy + API client (fetch).
- Presentation: komponen UI (Navbar, ConsoleCard) dan halaman (HomePage).
- Composition: service locator sederhana di `src/composition/di.ts`.

Struktur Direktori
- `src/domain` – entities dan interface repository
- `src/application` – use cases
- `src/infrastructure` – api client dan repository (HTTP/Dummy)
- `src/presentation` – components dan pages (UI)
- `src/composition/di.ts` – wiring dependency/use case
- `src/App.tsx` – root UI

Menjalankan
1) Backend (opsional untuk transaksi nyata)
- Jalankan `express-api` (default http://localhost:3000) jika ingin Create/Return tersambung DB.

2) Dev server
```bash
cd frontend
npm install
npm run dev
```
Lalu buka http://localhost:5173.

3) Build & preview
```bash
npm run build
npm run preview
```

Konfigurasi
- Proxy dev ke backend: lihat `vite.config.ts` (env `VITE_PROXY_TARGET`, default `http://localhost:3000`).
- Base URL API produksi: `VITE_API_BASE_URL` (fallback ke `/api`). Lihat `.env.example`.

Data Katalog: Dummy vs HTTP
- Default: Dummy (lihat `src/composition/di.ts`) menggunakan `DummyConsoleRepository` dengan gambar lokal:
  - `public/images/switch.jpg|ps3.jpg|ps4.jpg|ps5.jpg`
- Untuk data nyata dari backend, ubah di `src/composition/di.ts`:
  - Ganti `new DummyConsoleRepository()` menjadi `new HttpConsoleRepository()`.
- Catatan: Aksi “Buat Sewa” dan “Pengembalian” tetap memakai HTTP ke backend.

Desain/UX
- Responsif: grid katalog (`sm`, `lg`, `xl`), button full‑width di mobile.
- Navbar dengan menu toggle di mobile.
- Hero memakai gambar modern `public/images/hero-modern.jpg`.


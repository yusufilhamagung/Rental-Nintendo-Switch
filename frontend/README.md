Frontend (Vite + React + TypeScript)

Deskripsi Singkat
- Aplikasi web untuk katalog dan transaksi sewa Nintendo Switch.
- Clean Architecture di sisi frontend untuk memisahkan domain, use case, repository, dan view.

Teknologi
- Vite 5, React 18, TypeScript 5, Tailwind CSS, react-hot-toast.

Arsitektur (Clean Architecture)
- Domain: entity murni (Console, Rental) + kontrak repository.
- Application: use case (GetAvailableConsoles, CreateRental, ReturnRental).
- Infrastructure: implementasi repository HTTP + api client (fetch).
- Presentation: komponen UI (Navbar, ConsoleCard) dan halaman (HomePage).
- Composition: wiring instansiasi use case dan repository (service locator sederhana).

Struktur Direktori
- `src/domain` – entities dan repository interface
- `src/application` – use cases
- `src/infrastructure` – api client dan repository HTTP
- `src/presentation` – components dan pages (UI)
- `src/composition/di.ts` – komposisi dependency/use case
- `src/App.tsx` – root UI yang merender halaman

Menjalankan Proyek
1) Backend aktif
- Jalankan backend di `express-api` (default port 3000).

2) Frontend dev
- `cd frontend && npm install`
- `npm run dev` lalu buka http://localhost:5173
- Proxy dev sudah mengarah `/api` → `http://localhost:3000` (tidak perlu CORS).

3) Build & preview
- `npm run build`
- `npm run preview`

Konfigurasi Lingkungan
- Dev default menggunakan proxy. Untuk produksi, set `VITE_API_BASE_URL` (lihat `.env.example`).

Catatan Desain
- Use case dan repository dipisahkan dari komponen untuk memudahkan pengujian dan perawatan.
- Styling konsisten menggunakan Tailwind utility classes dengan tema brand sederhana.

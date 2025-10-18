API Sewa Nintendo Switch (TypeScript)

Deskripsi Singkat
- REST API untuk menyewa Nintendo Switch, ditulis dengan TypeScript, Express, dan MySQL2.
- Menggunakan prinsip Clean Architecture untuk memisahkan Domain, Application (Use Case), Infrastructure, dan Interfaces.

Teknologi
- Node.js 18+, Express 4, MySQL2 (promise), dotenv, TypeScript 5.

Arsitektur (Clean Architecture)
- Domain: entity murni (Console, Rental) + kontrak repository.
- Application: use case terisolasi (GetAvailableConsoles, CreateRental, ReturnRental).
- Infrastructure: implementasi repository (MySQL), koneksi DB (pool).
- Interfaces: HTTP layer (controller, routes, middleware error).

Struktur Direktori
- `src/domain` – entities dan repository interface
- `src/application` – use cases
- `src/infrastructure` – DB pool dan repository MySQL
- `src/interfaces/http` – controller, routes, middleware
- `src/config/env.ts` – konfigurasi environment
- `src/app.ts` – inisialisasi Express
- `src/server.ts` – bootstrap server

Menjalankan Proyek
1) Konfigurasi environment
- Salin `.env.example` menjadi `.env` dan sesuaikan kredensial DB.

2) Siapkan database
- Jalankan SQL `db/schema.sql:1` pada database tujuan untuk membuat tabel dan data contoh.

3) Install & jalankan
- `cd express-api && npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

Endpoints
- GET `/api/health` – health check
- GET `/api/consoles/available` – daftar konsol tersedia
- POST `/api/rentals` – body: `{ consoleId, customerName, days }`
- POST `/api/rentals/:id/return` – pengembalian rental

Catatan Desain
- Validasi sederhana dilakukan di layer use case; error konsisten via `AppError` dan middleware error.
- DB pool diinisialisasi saat start untuk fail-fast pada mis-konfigurasi.


# Sewa Nintendo Switch – Monorepo

Ringkasan
- Aplikasi penyewaan konsol (Switch, PS3, PS4, PS5) dengan API Express + Frontend React.
- Frontend responsif, katalog bergambar, hero modern; API siap MySQL.

Paket
- `express-api/` – REST API (TypeScript, Express, MySQL2)
- `frontend/` – Web app (Vite, React, TypeScript, Tailwind)

Fitur Utama
- Katalog bergambar dengan dummy data kaya (Switch/PS3/PS4/PS5) dan harga sewa.
- Form transaksi: Buat Sewa, Pengembalian (terhubung ke API).
- Desain responsif, navbar mobile, hero image modern.

Quick Start
1) API (opsional untuk transaksi nyata)
```bash
cd express-api
cp .env.example .env    # sesuaikan kredensial MySQL
mysql -u root -p < db/schema.sql
npm install
npm run dev             # http://localhost:3000
```

2) Frontend
```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

Konfigurasi Penting
- Frontend dev proxy → backend: `frontend/vite.config.ts` (env `VITE_PROXY_TARGET`).
- Base URL API produksi: `VITE_API_BASE_URL` (fallback `/api`).
- Pilih sumber data katalog:
  - Dummy (default): `frontend/src/composition/di.ts` menggunakan `DummyConsoleRepository`.
  - HTTP (real): ganti ke `HttpConsoleRepository`.

Produksi
- Script bundel produksi tersedia:
```bash
powershell -ExecutionPolicy Bypass -File scripts/prepare-production.ps1
```
Hasil akan ada di folder `release/`:
- `release/frontend` – assets statis siap deploy
- `release/express-api` – Node API (jalankan `npm start`)

Catatan
- Gambar di `frontend/public/images/*` bersumber dari Unsplash (bebas pakai). Sesuaikan jika perlu atribusi.


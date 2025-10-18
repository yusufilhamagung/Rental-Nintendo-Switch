<div align="center">

# 🎮 Sewa Nintendo Switch — Monorepo

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=061B2A)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)

</div>

Sistem penyewaan konsol game (Switch, PS3, PS4, PS5) dengan arsitektur bersih: REST API (Express + MySQL) dan frontend modern (React + Vite + Tailwind). UI responsif, katalog bergambar, dan alur sewa end‑to‑end.

## ✨ Fitur
- Katalog bergambar dengan harga sewa dan status ketersediaan
- Dukungan platform: Nintendo Switch, PS3, PS4, PS5
- Hero landing modern dan navbar mobile (drawer)
- Form transaksi: Buat Sewa dan Pengembalian
- Data katalog fleksibel: Dummy lokal atau HTTP API

## 🧩 Paket dalam Monorepo
- `express-api/` — REST API (TypeScript, Express, MySQL2)
- `frontend/` — Web app (Vite, React, Tailwind, TypeScript)

## 🚀 Quick Start
1) Backend API (opsional untuk transaksi nyata)
```bash
cd express-api
cp .env.example .env               # sesuaikan kredensial MySQL
mysql -u root -p < db/schema.sql   # buat tabel + seed
npm install
npm run dev                        # http://localhost:3000
```

2) Frontend
```bash
cd frontend
npm install
npm run dev                        # http://localhost:5173
```

## ⚙️ Konfigurasi Penting
- Dev proxy frontend → backend: `frontend/vite.config.ts` (env `VITE_PROXY_TARGET`)
- Base URL API produksi: `VITE_API_BASE_URL` (fallback ke `/api`)
- Sumber data katalog (edit `frontend/src/composition/di.ts`):
  - Dummy (default): `new DummyConsoleRepository()`
  - HTTP (real): `new HttpConsoleRepository()`

## 📦 Produksi
Gunakan script bundling produksi (Windows/PowerShell):
```bash
powershell -ExecutionPolicy Bypass -File scripts/prepare-production.ps1
```
Output akan berada di `release/`:
- `release/frontend` — aset statis siap deploy
- `release/express-api` — Node API siap jalan (`npm start`)

## 🧱 Struktur
```
.
├─ express-api/         # API Express + TypeScript + MySQL
├─ frontend/            # React + Vite + Tailwind UI
└─ scripts/             # utilitas bundling produksi
```

## 🔗 Tautan Terkait
- Frontend README → `frontend/README.md`
- API README → `express-api/README.md`

## 📸 Aset
Gambar UI (hero dan kartu katalog) berada di `frontend/public/images/*` dan berasal dari Unsplash (bebas pakai). Tambahkan atribusi bila diperlukan sesuai kebijakan internal Anda.

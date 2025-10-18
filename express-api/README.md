<div align="center">

# 🧰 API — Express + TypeScript + MySQL

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com)

</div>

## ✨ Ringkasan
- REST API untuk katalog dan transaksi sewa: daftar konsol tersedia, buat sewa, pengembalian.
- Clean Architecture: Domain, Application (Use Case), Infrastructure (MySQL), Interfaces (HTTP/Express).

## 🧠 Arsitektur
- Domain → entity (Console, Rental) + kontrak repository
- Application → use case (GetAvailableConsoles, CreateRental, ReturnRental)
- Infrastructure → DB pool (mysql2/promise) + repository MySQL
- Interfaces → controller, routes, middleware error

## 🗂️ Struktur
- `src/domain` — entities & repository interface
- `src/application` — use cases
- `src/infrastructure` — DB pool dan repository MySQL
- `src/interfaces/http` — controller, routes, middleware
- `src/config/env.ts` — konfigurasi environment
- `src/app.ts` — inisialisasi Express
- `src/server.ts` — bootstrap server

## ▶️ Menjalankan
1) Konfigurasi environment
```bash
cp .env.example .env
# Sesuaikan:
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=db_express_api
```

2) Siapkan database
- Jalankan `db/schema.sql` pada MySQL target.
- Opsi Docker cepat:
```bash
docker run --name switch-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_express_api -p 3306:3306 -d mysql:8
docker cp db/schema.sql switch-mysql:/tmp/schema.sql
docker exec -i switch-mysql sh -c "mysql -uroot -proot db_express_api < /tmp/schema.sql"
```

3) Install & start
```bash
npm install
npm run dev     # hot reload (ts-node-dev)
# atau
npm run build && npm start
```

## 🔌 Endpoints
- GET `/api/health` — health check
- GET `/api/consoles/available` — daftar konsol tersedia
- POST `/api/rentals` — body: `{ consoleId, customerName, days }`
- POST `/api/rentals/:id/return` — pengembalian rental

Contoh curl:
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/consoles/available
curl -X POST http://localhost:3000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{"consoleId":1,"customerName":"Budi","days":3}'
curl -X POST http://localhost:3000/api/rentals/1/return
```

## ⚙️ Environment Variables
| Key               | Default         | Keterangan                                      |
|-------------------|-----------------|-------------------------------------------------|
| `PORT`            | `3000`          | Port HTTP                                       |
| `DB_HOST`         | `127.0.0.1`     | Host MySQL                                      |
| `DB_PORT`         | `3306`          | Port MySQL                                      |
| `DB_USER`         | `root`          | User MySQL                                      |
| `DB_PASSWORD`     | ``              | Password MySQL                                  |
| `DB_NAME`         | `db_express_api`| Nama database                                   |
| `DB_STARTUP_CHECK`| `false`         | Warm‑up koneksi non‑blocking saat start         |

Catatan: server akan mencari port tersedia mulai dari `PORT` yang diinginkan.

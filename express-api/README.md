# API Sewa Nintendo Switch (TypeScript)

Ringkasan
- REST API untuk katalog dan transaksi sewa: daftar konsol tersedia, buat sewa, pengembalian.
- Clean Architecture: Domain, Application (Use Case), Infrastructure (MySQL), Interfaces (HTTP/Express).

Teknologi
- Node.js 18+, Express 4, TypeScript 5, mysql2 (promise), dotenv.

Arsitektur
- Domain: entity (Console, Rental) + kontrak repository.
- Application: use case (GetAvailableConsoles, CreateRental, ReturnRental).
- Infrastructure: koneksi DB (pool) dan repository MySQL.
- Interfaces: HTTP layer (controller, routes, middleware error).

Struktur
- `src/domain` – entities dan repository interface
- `src/application` – use cases
- `src/infrastructure` – DB pool dan repository MySQL
- `src/interfaces/http` – controller, routes, middleware
- `src/config/env.ts` – konfigurasi environment
- `src/app.ts` – inisialisasi Express
- `src/server.ts` – bootstrap server

Menjalankan
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
- Jalankan SQL `db/schema.sql` pada MySQL target untuk membuat tabel dan data contoh.
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

Endpoints
- GET `/api/health` – health check
- GET `/api/consoles/available` – daftar konsol tersedia
- POST `/api/rentals` – body: `{ consoleId, customerName, days }`
- POST `/api/rentals/:id/return` – pengembalian rental

Catatan
- `DB_STARTUP_CHECK=true` akan warm‑up koneksi DB non‑blocking saat start.
- Server mencari port tersedia mulai dari `PORT` env (default 3000).


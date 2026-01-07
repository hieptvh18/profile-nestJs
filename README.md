# 🚀 Profile NestJS API

Backend API cho portfolio project - NestJS + MySQL + Docker

---

## 📋 Tech Stack

- **NestJS** - Node.js framework
- **TypeORM** - ORM for MySQL
- **MySQL 8.0** - Database
- **Docker** - Containerization

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Start API + MySQL
docker-compose up -d

# Xem logs
docker-compose logs -f

# Stop
docker-compose down
```

**Access:** http://localhost:3000

### Option 2: Local Development

```bash
# Install dependencies
yarn install

# Setup database (MySQL phải chạy trước)
# Update config trong src/config/database.config.ts

# Run migrations (nếu có)
yarn migration:run

# Start dev server
yarn start:dev
```

---

## 📡 API Endpoints

### Me Module
- `GET /api/me` - Get user profile info

Chi tiết: Xem [API_DOCS.md](./API_DOCS.md)

---

## 🐳 Docker

**Files:**
- `Dockerfile` - Multi-stage build
- `docker-compose.yml` - Dev environment (API + MySQL)
- `.dockerignore` - Build optimization

**Chi tiết:** Xem [README-DOCKER.md](./README-DOCKER.md)

---

## 🔧 Environment Variables

```bash
# Database
DB_HOST=mysql          # hoặc localhost nếu chạy local
DB_PORT=3306
DB_USERNAME=profile_user
DB_PASSWORD=profile_pass
DB_DATABASE=profile_db

# App
NODE_ENV=development
PORT=3000
```

---

## 📝 Scripts

```bash
# Development
yarn start:dev

# Build
yarn build

# Production
yarn start:prod

# Linting
yarn lint

# Testing
yarn test
```

---

## 📁 Project Structure

```
src/
├── config/              # Configuration files
│   └── database.config.ts
├── modules/
│   ├── me/             # Me module (user profile)
│   └── admin/          # Admin module (if any)
├── common/             # Shared utilities
├── app.module.ts       # Root module
└── main.ts            # Entry point
```

---

## 🔗 Related Projects

- **Frontend:** `../profile-react`

---

✅ **Ready to develop!**

# 🐳 NestJS API - Docker Development Guide

## 📁 Files trong project:
- `Dockerfile` - Multi-stage build cho NestJS
- `docker-compose.yml` - Development environment (NestJS + MySQL)
- `.dockerignore` - Optimize build context

---

## 🚀 Quick Start

### Development (Local)

```bash
# 1. Start NestJS API + MySQL
docker-compose up -d

# 2. Build lại nếu có thay đổi code
docker-compose up -d --build

# 3. Xem logs
docker-compose logs -f

# 4. Xem logs của service cụ thể
docker-compose logs -f api
docker-compose logs -f mysql

# 5. Stop services
docker-compose down
```

**Access:**
- API: http://localhost:3000
- MySQL: localhost:3306

---

## 📦 Services

| Service | Container Name | Port | Description |
|---------|----------------|------|-------------|
| **mysql** | profile_nestjs_mysql | 3306 | MySQL 8.0 Database |
| **api** | profile_nestjs_api | 3000 | NestJS API Backend |

---

## 🔧 Environment Variables

### Default credentials:
```bash
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=profile_db
MYSQL_USER=profile_user
MYSQL_PASSWORD=profile_pass

DB_HOST=mysql
DB_PORT=3306
NODE_ENV=development
```

### Custom environment (optional):
Nếu muốn thay đổi credentials, tạo file `.env`:

```bash
# .env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
```

Sau đó chạy:
```bash
docker-compose --env-file .env up -d
```

---

## 🗄️ Database Management

### Kết nối MySQL
```bash
# Vào MySQL container
docker-compose exec mysql mysql -u profile_user -p
# Password: profile_pass

# Hoặc dùng MySQL client từ host
mysql -h 127.0.0.1 -P 3306 -u profile_user -p
```

### Backup Database
```bash
# Backup
docker-compose exec mysql mysqldump -u root -prootpassword profile_db > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -prootpassword profile_db < backup.sql
```

### Init SQL Scripts (Optional)
Đặt các file `.sql` vào folder `mysql/init/` để tự động chạy khi khởi tạo database:

```bash
mkdir -p mysql/init
# Tạo file mysql/init/01-schema.sql
# Tạo file mysql/init/02-seed.sql
```

---

## 🔍 Useful Commands

### Xem logs
```bash
# Tất cả services
docker-compose logs -f

# Chỉ API
docker-compose logs -f api

# Chỉ MySQL
docker-compose logs -f mysql

# 100 dòng cuối
docker-compose logs --tail=100 api
```

### Check status
```bash
docker-compose ps
```

### Restart service
```bash
# Restart API
docker-compose restart api

# Restart MySQL
docker-compose restart mysql

# Restart tất cả
docker-compose restart
```

### Vào container shell
```bash
# Vào API container
docker-compose exec api sh

# Vào MySQL container
docker-compose exec mysql bash
```

### Clean up
```bash
# Stop và xóa containers
docker-compose down

# Stop và xóa containers + volumes (XÓA DATA!)
docker-compose down -v

# Xóa images
docker rmi profile-nestjs-api
```

---

## 🐛 Troubleshooting

### Problem: Port 3000 already in use
```bash
# Windows - Check process đang dùng port
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Solution 1: Kill process hoặc đổi port trong docker-compose.yml
ports:
  - "3001:3000"  # Host:Container
```

### Problem: Port 3306 already in use (MySQL local đang chạy)
```bash
# Check MySQL local
netstat -ano | findstr :3306

# Solution 1: Stop MySQL local
# Solution 2: Đổi port
ports:
  - "3307:3306"  # Host:Container
```

### Problem: MySQL connection refused
```bash
# Check MySQL logs
docker-compose logs mysql

# Check MySQL health
docker-compose exec mysql mysqladmin ping -h localhost

# Wait for MySQL ready (MySQL cần ~10-20s để start)
docker-compose up -d mysql
# Đợi 10s
docker-compose up -d api
```

### Problem: API không kết nối được MySQL
```bash
# Check environment variables
docker-compose exec api env | grep DB_

# Verify network
docker-compose exec api ping mysql

# Check MySQL từ API container
docker-compose exec api sh
nc -zv mysql 3306
```

### Problem: File encoding error (BOM)
```
unexpected character "\ufeff"
```

**Solution:** File `.env` bị save với UTF-8 BOM encoding

1. Mở file `.env` trong VS Code
2. Góc dưới phải, click vào encoding
3. Chọn "Save with Encoding" → "UTF-8" (không phải UTF-8 with BOM)
4. Save lại

---

## 📊 Docker Image Size

Dockerfile sử dụng **multi-stage build**:

```
Stage 1 (builder): ~800MB (có devDependencies)
Stage 2 (production): ~150MB (chỉ production deps + build output)
```

**Kết quả:** Image chỉ ~150MB thay vì 800MB+

---

## 🔐 Security Best Practices

### Đổi default passwords:

1. Tạo file `.env` (không commit vào git):
```bash
MYSQL_ROOT_PASSWORD=strong_password_here
MYSQL_PASSWORD=another_strong_password
```

2. Update `.gitignore`:
```
.env
```

3. Restart services:
```bash
docker-compose down -v  # Xóa volume cũ
docker-compose --env-file .env up -d
```

---

## 🎯 Workflow

### Development:
```bash
# 1. Start services
cd profile-nestjs-api
docker-compose up -d

# 2. Check logs
docker-compose logs -f

# 3. Development...
# Code changes → rebuild nếu cần:
docker-compose up -d --build

# 4. Stop when done
docker-compose down
```

### Clean restart:
```bash
# Xóa tất cả và start lại từ đầu
docker-compose down -v
docker-compose up -d --build
```

---

## 🔗 Frontend Integration

Frontend (React) có thể call API qua:

```javascript
// profile-react/src/api/me.jsx
const API_ENDPOINT = 'http://localhost:3000'
```

Port `3000` đã được expose từ container ra host, nên frontend local có thể access.

---

## 📚 References

- Docker Compose: https://docs.docker.com/compose/
- NestJS: https://docs.nestjs.com/
- MySQL Docker: https://hub.docker.com/_/mysql

---

✅ **Done!** NestJS API development environment với MySQL!

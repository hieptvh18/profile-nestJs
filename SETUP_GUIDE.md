# Setup Guide - Profile NestJS API

## Các bước setup nhanh

### 1. Đảm bảo XAMPP đang chạy
- Mở XAMPP Control Panel
- Start **Apache** và **MySQL**
- MySQL phải chạy ở port **3306**

### 2. Tạo Database
Mở trình duyệt và truy cập: `http://localhost/phpmyadmin`

Tạo database mới với tên: `profile_nestjs`

```sql
CREATE DATABASE profile_nestjs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Kiểm tra file .env
File `.env` đã được tạo tự động với cấu hình:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=profile_nestjs
```

**Lưu ý:** Nếu MySQL của bạn có password, hãy cập nhật `DB_PASSWORD` trong file `.env`

### 4. Chạy ứng dụng

```bash
# Development mode với auto-reload
npm run start:dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

TypeORM sẽ tự động tạo bảng `me` trong database.

### 5. Test API

Sử dụng Postman hoặc cURL để test:

#### Tạo record mới:
```bash
curl -X POST http://localhost:3000/me ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Nguyen Van A\",\"email\":\"test@example.com\"}"
```

#### Lấy danh sách:
```bash
curl http://localhost:3000/me
```

---

## Cấu trúc API Endpoints

- `POST /me` - Tạo mới
- `GET /me` - Lấy tất cả
- `GET /me?search=keyword` - Tìm kiếm
- `GET /me/:id` - Lấy theo ID
- `PATCH /me/:id` - Cập nhật
- `DELETE /me/:id` - Xóa

Xem chi tiết trong file [API_DOCS.md](./API_DOCS.md)

---

## Troubleshooting

### Lỗi: "Error: connect ECONNREFUSED"
- Kiểm tra MySQL đã chạy trong XAMPP chưa
- Kiểm tra port 3306 có đang được sử dụng không

### Lỗi: "Access denied for user 'root'@'localhost'"
- Cập nhật password trong file `.env`
- Kiểm tra username và password MySQL

### Lỗi: "Unknown database 'profile_nestjs'"
- Tạo database trong phpMyAdmin
- Kiểm tra tên database trong `.env` có đúng không

---

## Các lệnh hữu ích

```bash
# Chạy development
npm run start:dev

# Build production
npm run build

# Chạy production
npm run start:prod

# Chạy linter
npm run lint

# Format code
npm run format
```


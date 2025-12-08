# API Documentation - Me Module

## Cấu hình Database

### Bước 1: Tạo file `.env`
Tạo file `.env` ở thư mục root của project với nội dung:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=profile_nestjs
```

### Bước 2: Tạo Database
Mở XAMPP và tạo database mới tên `profile_nestjs` trong phpMyAdmin

### Bước 3: Chạy ứng dụng
```bash
npm run start:dev
```

TypeORM sẽ tự động tạo bảng `me` với cấu trúc:
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 255, UNIQUE)
- phone (VARCHAR 20, NULLABLE)
- address (TEXT, NULLABLE)
- bio (TEXT, NULLABLE)
- isActive (BOOLEAN, DEFAULT TRUE)
- createdAt (DATETIME)
- updatedAt (DATETIME)

---

## API Endpoints

Base URL: `http://localhost:3000`

### 1. Create Me (Tạo mới)

**Endpoint:** `POST /me`

**Request Body:**
```json
{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "phone": "0901234567",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "bio": "Developer tại công ty XYZ"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "phone": "0901234567",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "bio": "Developer tại công ty XYZ",
  "isActive": true,
  "createdAt": "2025-12-08T10:30:00.000Z",
  "updatedAt": "2025-12-08T10:30:00.000Z"
}
```

**Validation:**
- `name`: Bắt buộc, tối đa 100 ký tự
- `email`: Bắt buộc, phải đúng định dạng email, tối đa 255 ký tự
- `phone`: Tùy chọn, tối đa 20 ký tự
- `address`: Tùy chọn
- `bio`: Tùy chọn

---

### 2. Get All Me (Lấy danh sách)

**Endpoint:** `GET /me`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "phone": "0901234567",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "bio": "Developer tại công ty XYZ",
    "isActive": true,
    "createdAt": "2025-12-08T10:30:00.000Z",
    "updatedAt": "2025-12-08T10:30:00.000Z"
  }
]
```

---

### 3. Search Me (Tìm kiếm)

**Endpoint:** `GET /me?search={keyword}`

**Example:** `GET /me?search=nguyen`

Tìm kiếm theo:
- name
- email
- phone

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    ...
  }
]
```

---

### 4. Get One Me (Lấy chi tiết theo ID)

**Endpoint:** `GET /me/:id`

**Example:** `GET /me/1`

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "phone": "0901234567",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "bio": "Developer tại công ty XYZ",
  "isActive": true,
  "createdAt": "2025-12-08T10:30:00.000Z",
  "updatedAt": "2025-12-08T10:30:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Me with ID 999 not found",
  "error": "Not Found"
}
```

---

### 5. Update Me (Cập nhật)

**Endpoint:** `PATCH /me/:id`

**Example:** `PATCH /me/1`

**Request Body:** (Tất cả fields đều optional)
```json
{
  "name": "Nguyen Van B",
  "phone": "0987654321",
  "isActive": false
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Nguyen Van B",
  "email": "nguyenvana@example.com",
  "phone": "0987654321",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "bio": "Developer tại công ty XYZ",
  "isActive": false,
  "createdAt": "2025-12-08T10:30:00.000Z",
  "updatedAt": "2025-12-08T11:00:00.000Z"
}
```

**Validation:**
- Tất cả fields đều optional
- Nếu có `email`, phải đúng định dạng
- Nếu có `name`, tối đa 100 ký tự
- Nếu có `phone`, tối đa 20 ký tự

---

### 6. Delete Me (Xóa)

**Endpoint:** `DELETE /me/:id`

**Example:** `DELETE /me/1`

**Response:** `204 No Content`

**Error Response:** `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Me with ID 999 not found",
  "error": "Not Found"
}
```

---

## Testing với cURL

### Create
```bash
curl -X POST http://localhost:3000/me \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nguyen Van A\",\"email\":\"nguyenvana@example.com\",\"phone\":\"0901234567\"}"
```

### Get All
```bash
curl http://localhost:3000/me
```

### Search
```bash
curl "http://localhost:3000/me?search=nguyen"
```

### Get One
```bash
curl http://localhost:3000/me/1
```

### Update
```bash
curl -X PATCH http://localhost:3000/me/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nguyen Van B\"}"
```

### Delete
```bash
curl -X DELETE http://localhost:3000/me/1
```

---

## Error Handling

### Validation Error (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "name should not be empty"
  ],
  "error": "Bad Request"
}
```

### Not Found (404)
```json
{
  "statusCode": 404,
  "message": "Me with ID 1 not found",
  "error": "Not Found"
}
```

### Duplicate Email (500)
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Cấu trúc Project

```
src/
├── config/
│   └── database.config.ts       # Cấu hình database
├── modules/
│   └── me/
│       ├── dto/
│       │   ├── create-me.dto.ts # DTO cho create
│       │   └── update-me.dto.ts # DTO cho update
│       ├── entities/
│       │   └── me.entity.ts     # Entity định nghĩa bảng
│       ├── me.controller.ts     # Controller xử lý HTTP requests
│       ├── me.service.ts        # Service chứa business logic
│       └── me.module.ts         # Module configuration
├── app.module.ts                # Root module
└── main.ts                      # Entry point
```


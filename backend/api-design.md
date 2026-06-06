# BAJ Ltd — API Design Document

> Waste Collection Fee Management System  
> Based on `baj-frontend` (customer portal) and `baj-dashboard` (staff dashboard)

---

## 1. Overview

### 1.1 Two Applications

| App | Audience | Auth | Key Data |
|-----|----------|------|----------|
| `baj-frontend` | Customers (households, businesses) | OTP via phone number | Own payments, collection history, profile |
| `baj-dashboard` | Staff (admin, drivers, operators) | Email + password + OTP | All clients, zones, collections, financials |

### 1.2 Base URL

```
https://api.baj.rw/v1
```

### 1.3 Common Patterns

- All authenticated endpoints require `Authorization: Bearer <token>`
- Dates use ISO 8601 (`YYYY-MM-DD`) or display labels where noted
- Currency is always `RWF`
- Phone numbers use Rwanda format: `+250 7XX XXX XXX`

---

## 2. Authentication

### 2.1 Customer Auth (baj-frontend)

Customer login uses **phone-based OTP** (no passwords).

#### `POST /auth/customer/request-otp`

Request an OTP to the customer's registered phone.

**Request:**
```json
{
  "phone": "+250 788 009 976"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "OTP sent to your phone",
  "expiresIn": 300
}
```

**Response `404`:**
```json
{
  "error": "Phone number not registered"
}
```

---

#### `POST /auth/customer/verify-otp`

Verify OTP and receive session token.

**Request:**
```json
{
  "phone": "+250 788 009 976",
  "otp": "1234"
}
```

**Response `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cust_01",
    "phone": "+250 788 009 976",
    "name": "Mutesi Kalisa",
    "zoneId": "z01"
  }
}
```

**Response `401`:**
```json
{
  "error": "Invalid or expired OTP"
}
```

---

#### `POST /auth/customer/logout`

Invalidate the current token.

**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{ "success": true }
```

---

### 2.2 Staff Auth (baj-dashboard)

Staff login uses **email + password + OTP** (two-step).

#### `POST /auth/staff/login`

Validate email and password. Returns a pending session ID for OTP step.

**Request:**
```json
{
  "email": "admin@baj.rw",
  "password": "Admin@123"
}
```

**Response `200`:**
```json
{
  "pendingSessionId": "sess_abc123",
  "message": "OTP sent to registered device"
}
```

**Response `401`:**
```json
{
  "error": "Invalid email or password"
}
```

---

#### `POST /auth/staff/verify-otp`

Verify OTP and receive full session token.

**Request:**
```json
{
  "pendingSessionId": "sess_abc123",
  "otp": "123456"
}
```

**Response `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "staff_01",
    "email": "admin@baj.rw",
    "name": "Admin",
    "role": "admin"
  }
}
```

**Roles:** `admin` | `staff` | `driver`

**Response `401`:**
```json
{
  "error": "Invalid OTP"
}
```

---

#### `POST /auth/staff/forgot-password`

Trigger password reset flow.

**Request:**
```json
{
  "email": "admin@baj.rw"
}
```

**Response `200`:**
```json
{ "message": "Password reset instructions sent" }
```

---

#### `POST /auth/staff/reset-password`

Reset password using OTP from email.

**Request:**
```json
{
  "email": "admin@baj.rw",
  "otp": "654321",
  "newPassword": "NewPass@123"
}
```

**Response `200`:**
```json
{ "message": "Password reset successful" }
```

---

#### `POST /auth/staff/logout`

**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{ "success": true }
```

---

## 3. Customer Portal APIs (baj-frontend)

### 3.1 Customer Dashboard

#### `GET /customers/me/dashboard`

Returns the logged-in customer's full dashboard data.

**Headers:** `Authorization: Bearer <customer_token>`

**Response `200`:**
```json
{
  "client": {
    "id": "cust_01",
    "name": "Mutesi Kalisa",
    "phone": "+250 788 009 976",
    "zoneId": "z01",
    "zoneCode": "KGL-GAS-04",
    "address": "Gasabo District, Kigali",
    "services": ["collection", "disposal", "transport"],
    "fee": {
      "amount": 3500,
      "currency": "RWF",
      "period": "June 2026",
      "dueDate": "2026-06-05"
    },
    "nextCollection": {
      "date": "2026-06-03",
      "time": "7:00 AM – 10:00 AM"
    }
  },
  "payments": [
    {
      "id": "p6",
      "period": "June 2026",
      "amount": 3500,
      "currency": "RWF",
      "status": "pending",
      "paidDate": null
    },
    {
      "id": "p5",
      "period": "May 2026",
      "amount": 3500,
      "currency": "RWF",
      "status": "paid",
      "paidDate": "2026-05-02"
    }
  ],
  "collections": [
    {
      "date": "2026-05-27",
      "status": "success",
      "note": "Collected on time"
    },
    {
      "date": "2026-05-20",
      "status": "success",
      "note": "Collected on time"
    },
    {
      "date": "2026-05-06",
      "status": "warning",
      "note": "Delayed by 2 hours"
    },
    {
      "date": "2026-04-15",
      "status": "danger",
      "note": "Missed — reported"
    }
  ]
}
```

---

### 3.2 Payments

#### `POST /customers/me/payments`

Record a payment for the current customer.

**Headers:** `Authorization: Bearer <customer_token>`

**Request:**
```json
{
  "period": "June 2026",
  "amount": 3500,
  "currency": "RWF",
  "method": "momo",
  "methodDetails": {
    "provider": "mtn",
    "phone": "+250 788 123 456",
    "transactionRef": "TXN-abc-123"
  }
}
```

**Response `201`:**
```json
{
  "id": "p7",
  "period": "June 2026",
  "amount": 3500,
  "currency": "RWF",
  "status": "paid",
  "paidDate": "2026-06-02",
  "method": "momo",
  "message": "Payment successful"
}
```

**Methods:** `momo` | `bank` | `cash` | `card`

---

#### `GET /customers/me/payments`

List all payments for the current customer.

**Headers:** `Authorization: Bearer <customer_token>`

**Response `200`:**
```json
{
  "payments": [
    {
      "id": "p6",
      "period": "June 2026",
      "amount": 3500,
      "currency": "RWF",
      "status": "pending",
      "paidDate": null,
      "method": null
    }
  ],
  "total": 6,
  "outstanding": 3500
}
```

---

### 3.3 Collections (Customer View)

#### `GET /customers/me/collections`

Collection history for the logged-in customer.

**Headers:** `Authorization: Bearer <customer_token>`

**Response `200`:**
```json
{
  "collections": [
    {
      "id": "col_01",
      "date": "2026-05-27",
      "status": "success",
      "note": "Collected on time",
      "driver": "Jean P."
    }
  ]
}
```

---

## 4. Staff Dashboard APIs (baj-dashboard)

### 4.1 Overview / Stats

#### `GET /dashboard/stats`

High-level KPIs and alerts for the dashboard overview page.

**Headers:** `Authorization: Bearer <staff_token>`

**Response `200`:**
```json
{
  "stats": {
    "totalClients": 347,
    "totalZones": 19,
    "collectionsThisWeek": 214,
    "collectionsTotalWeek": 347,
    "overdueCount": 41,
    "overdueAmountRwf": 143500,
    "zonesActiveToday": 7,
    "zonesScheduledToday": 7
  },
  "alerts": [
    {
      "id": "a1",
      "level": "danger",
      "message": "Nyamirambo zone missed yesterday's collection. A make-up run has not been scheduled.",
      "linkLabel": "Schedule make-up",
      "href": "/collections"
    },
    {
      "id": "a2",
      "level": "warning",
      "message": "41 clients from May still have unpaid fees. June billing cycle opens in 3 days.",
      "linkLabel": "View overdue",
      "href": "/financials"
    }
  ],
  "recentCollections": [
    {
      "zone": "Kimironko North",
      "code": "KIM-N",
      "driver": "Jean P.",
      "time": "2 hours ago",
      "status": "completed"
    }
  ],
  "overdue": [
    {
      "name": "Chez Lando Restaurant",
      "type": "commercial",
      "zone": "Kimironko",
      "amount": 12000,
      "daysOverdue": 47
    }
  ]
}
```

---

### 4.2 Clients

#### `GET /clients`

List all clients with filtering, sorting, pagination.

**Headers:** `Authorization: Bearer <staff_token>`

**Query params:**
- `search` — text search (name, zone, sector)
- `type` — `household` | `small_business` | `commercial` | `hotel`
- `paymentStatus` — `paid` | `overdue` | `pending` | `all`
- `status` — `active` | `inactive` | `suspended`
- `sortBy` — `name` | `zone` | `fee` | `joinDate` | `payment` | `status`
- `sortDir` — `asc` | `desc`
- `page` — page number (default 1)
- `limit` — items per page (default 30)

**Response `200`:**
```json
{
  "clients": [
    {
      "id": "cl01",
      "name": "Jean-Pierre Nkurunziza",
      "type": "household",
      "zone": "Kimironko North",
      "zoneCode": "KIM-N",
      "sector": "Kimironko",
      "feeRwf": 3000,
      "joinDate": "2024-03-10",
      "payment": "paid",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 30,
    "total": 347,
    "totalPages": 12
  },
  "aggregations": {
    "byType": {
      "household": 15,
      "small_business": 8,
      "commercial": 5,
      "hotel": 2
    },
    "byPayment": {
      "paid": 20,
      "overdue": 6,
      "pending": 4
    }
  }
}
```

---

#### `GET /clients/:id`

Get a single client.

**Response `200`:**
```json
{
  "id": "cl01",
  "name": "Jean-Pierre Nkurunziza",
  "type": "household",
  "zoneId": "z01",
  "zone": "Kimironko North",
  "zoneCode": "KIM-N",
  "sector": "Kimironko",
  "feeRwf": 3000,
  "joinDate": "2024-03-10",
  "payment": "paid",
  "status": "active",
  "phone": "+250 788 000 001",
  "notes": "",
  "payments": [
    { "id": "p1", "period": "June 2026", "amount": 3000, "status": "paid" }
  ],
  "collections": [
    { "id": "c1", "date": "2026-06-01", "status": "completed" }
  ]
}
```

---

#### `POST /clients`

Create a new client.

**Request:**
```json
{
  "name": "Sunrise Apartments B",
  "type": "commercial",
  "zoneId": "z02",
  "sector": "Remera",
  "phone": "+250 788 123 456",
  "feeRwf": 8500,
  "status": "active",
  "notes": "Block B of the Sunrise complex — 12 units on floors 2–4."
}
```

**Response `201`:**
```json
{
  "id": "cl31",
  "name": "Sunrise Apartments B",
  "type": "commercial",
  "zoneId": "z02",
  "zoneCode": "REM-C",
  "sector": "Remera",
  "feeRwf": 8500,
  "joinDate": "2026-06-02",
  "payment": "pending",
  "status": "active"
}
```

---

#### `PUT /clients/:id`

Update a client.

**Request:**
```json
{
  "name": "Sunrise Apartments B",
  "feeRwf": 9000,
  "status": "active"
}
```

**Response `200`:**
```json
{
  "id": "cl31",
  "name": "Sunrise Apartments B",
  "feeRwf": 9000,
  "status": "active",
  "updatedAt": "2026-06-02T10:00:00Z"
}
```

---

#### `DELETE /clients/:id`

Soft-delete a client (sets status to `inactive`).

**Response `200`:**
```json
{ "success": true, "message": "Client deactivated" }
```

---

### 4.3 Collections

#### `GET /collections`

List all collection records.

**Query params:**
- `search` — text search (zone, driver)
- `status` — `completed` | `partial` | `missed` | `all`
- `dateFrom` — ISO date
- `dateTo` — ISO date
- `sortBy` — `date` | `zone` | `driver` | `status`
- `sortDir` — `asc` | `desc`
- `page`, `limit`

**Response `200`:**
```json
{
  "collections": [
    {
      "id": "c01",
      "date": "2026-06-01",
      "dateLabel": "Jun 1, 2026",
      "zoneId": "z01",
      "zone": "Kimironko North",
      "zoneCode": "KIM-N",
      "driver": "Jean P.",
      "clientsServed": 24,
      "clientsTotal": 24,
      "status": "completed",
      "notes": "On time"
    }
  ],
  "pagination": { "page": 1, "limit": 30, "total": 30 },
  "aggregations": {
    "completed": 24,
    "partial": 3,
    "missed": 3
  }
}
```

---

#### `POST /collections`

Log a new collection run.

**Request:**
```json
{
  "date": "2026-06-02",
  "zoneId": "z01",
  "driverId": "staff_05",
  "clientsServed": 24,
  "clientsTotal": 24,
  "status": "completed",
  "notes": "On time"
}
```

**Response `201`:**
```json
{
  "id": "c31",
  "date": "2026-06-02",
  "zoneId": "z01",
  "driver": "Jean P.",
  "status": "completed",
  "createdAt": "2026-06-02T10:00:00Z"
}
```

---

#### `PUT /collections/:id`

Update a collection record.

**Request:**
```json
{
  "status": "partial",
  "notes": "Vehicle breakdown at midpoint",
  "clientsServed": 14
}
```

---

#### `DELETE /collections/:id`

Remove a collection record.

**Response `200`:**
```json
{ "success": true }
```

---

### 4.4 Zones

#### `GET /zones`

List all zones.

**Query params:**
- `search` — text search (name, code, sector)
- `status` — `active` | `inactive` | `suspended` | `all`
- `district` — `Gasabo` | `Kicukiro` | `Nyarugenge` | `all`
- `sortBy` — `name` | `district` | `clients` | `schedule` | `status`
- `sortDir` — `asc` | `desc`

**Response `200`:**
```json
{
  "zones": [
    {
      "id": "z01",
      "name": "Kimironko North",
      "code": "KIM-N",
      "district": "Gasabo",
      "sector": "Kimironko",
      "clients": 24,
      "driverId": "staff_05",
      "driver": "Jean P.",
      "schedule": "Monday",
      "scheduleOrder": 1,
      "status": "active"
    }
  ],
  "drivers": [
    { "id": "staff_05", "name": "Jean P." },
    { "id": "staff_06", "name": "Diane U." }
  ],
  "districts": ["Gasabo", "Kicukiro", "Nyarugenge"],
  "scheduleDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}
```

---

#### `POST /zones`

Create a new zone.

**Request:**
```json
{
  "name": "Kimisagara East",
  "code": "KIM-E",
  "district": "Nyarugenge",
  "sector": "Kimisagara",
  "driverId": "staff_05",
  "schedule": "Wednesday",
  "status": "active",
  "notes": "Covers lower Kimisagara — 3 apartment blocks near the market."
}
```

**Response `201`:**
```json
{
  "id": "z20",
  "name": "Kimisagara East",
  "code": "KIM-E",
  "district": "Nyarugenge",
  "sector": "Kimisagara",
  "clients": 0,
  "driverId": "staff_05",
  "schedule": "Wednesday",
  "scheduleOrder": 3,
  "status": "active"
}
```

---

#### `PUT /zones/:id`

Update a zone.

**Request:**
```json
{
  "driverId": "staff_06",
  "schedule": "Tuesday",
  "status": "active"
}
```

---

#### `DELETE /zones/:id`

Soft-delete a zone (sets status to `inactive`).

---

### 4.5 Financials / Payments

#### `GET /payments`

List all payment records (staff view).

**Query params:**
- `search` — text search (client name, zone)
- `status` — `paid` | `overdue` | `waived` | `all`
- `period` — e.g. `Jun 2026`, `May 2026`
- `sortBy` — `date` | `client` | `amount` | `period` | `status`
- `sortDir` — `asc` | `desc`
- `page`, `limit`

**Response `200`:**
```json
{
  "payments": [
    {
      "id": "p01",
      "date": "2026-06-01",
      "dateLabel": "Jun 1, 2026",
      "clientId": "cl01",
      "client": "Jean-Pierre Nkurunziza",
      "clientType": "household",
      "zone": "Kimironko North",
      "zoneCode": "KIM-N",
      "amountRwf": 3000,
      "method": "momo",
      "period": "Jun 2026",
      "periodSort": "2026-06",
      "status": "paid"
    }
  ],
  "pagination": { "page": 1, "limit": 30, "total": 30 },
  "periods": ["Jun 2026", "May 2026", "Apr 2026"],
  "aggregations": {
    "collectedThisMonth": 18000,
    "outstanding": 143500,
    "collectedLastMonth": 145000,
    "collectionRate": 78
  }
}
```

---

#### `POST /payments`

Record a payment (staff-initiated or confirmed).

**Request:**
```json
{
  "clientId": "cl24",
  "period": "May 2026",
  "amountRwf": 12000,
  "method": "bank",
  "date": "2026-06-01",
  "notes": "Payment received at office — cheque cleared."
}
```

**Response `201`:**
```json
{
  "id": "p31",
  "clientId": "cl24",
  "period": "May 2026",
  "amountRwf": 12000,
  "method": "bank",
  "status": "paid",
  "date": "2026-06-01",
  "recordedBy": "staff_01",
  "createdAt": "2026-06-02T10:00:00Z"
}
```

---

#### `PUT /payments/:id`

Update a payment (e.g., waive a fee).

**Request:**
```json
{
  "status": "waived",
  "notes": "Fee waived per management approval"
}
```

---

#### `DELETE /payments/:id`

Remove a payment record.

---

### 4.6 Staff Users (Admin Only)

#### `GET /staff`

List all staff users. **Admin only.**

**Response `200`:**
```json
{
  "staff": [
    {
      "id": "staff_01",
      "email": "admin@baj.rw",
      "name": "Admin",
      "role": "admin",
      "status": "active"
    },
    {
      "id": "staff_05",
      "email": "jean@baj.rw",
      "name": "Jean P.",
      "role": "driver",
      "status": "active"
    }
  ]
}
```

---

#### `POST /staff`

Create a new staff user. **Admin only.**

**Request:**
```json
{
  "email": "new@baj.rw",
  "name": "New Staff",
  "role": "staff",
  "password": "TempPass@123"
}
```

---

#### `PUT /staff/:id`

Update staff user. **Admin only.**

**Request:**
```json
{
  "name": "Jean Paul",
  "role": "driver",
  "status": "active"
}
```

---

#### `DELETE /staff/:id`

Deactivate a staff user. **Admin only.**

---

## 5. Data Models

### 5.1 Customer

```
Customer
├── id: string (UUID)
├── name: string
├── phone: string (+250 format)
├── email: string (optional)
├── type: enum [household, small_business, commercial, hotel]
├── status: enum [active, inactive, suspended]
├── zoneId: string (FK → Zone)
├── sector: string
├── address: string
├── feeRwf: integer
├── joinDate: date
├── notes: text (optional)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### 5.2 Staff User

```
StaffUser
├── id: string (UUID)
├── email: string (unique)
├── name: string
├── role: enum [admin, staff, driver]
├── status: enum [active, inactive]
├── passwordHash: string
├── phone: string (for OTP)
├── lastLoginAt: timestamp
├── createdAt: timestamp
└── updatedAt: timestamp
```

### 5.3 Zone

```
Zone
├── id: string (UUID)
├── name: string
├── code: string (short uppercase, e.g. KIM-N)
├── district: enum [Gasabo, Kicukiro, Nyarugenge]
├── sector: string
├── clients: integer (computed)
├── driverId: string (FK → StaffUser, nullable)
├── schedule: enum [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
├── scheduleOrder: integer (1-6)
├── status: enum [active, inactive, suspended]
├── notes: text (optional)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### 5.4 Collection Record

```
Collection
├── id: string (UUID)
├── date: date
├── zoneId: string (FK → Zone)
├── driverId: string (FK → StaffUser)
├── clientsServed: integer
├── clientsTotal: integer
├── status: enum [completed, partial, missed]
├── notes: text
├── createdBy: string (FK → StaffUser)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### 5.5 Payment

```
Payment
├── id: string (UUID)
├── customerId: string (FK → Customer)
├── date: date (nullable — null if not yet paid)
├── amountRwf: integer
├── currency: string (default RWF)
├── method: enum [cash, momo, bank, card, null]
├── period: string (e.g. "Jun 2026")
├── periodSort: string (e.g. "2026-06")
├── status: enum [paid, overdue, waived, pending]
├── notes: text (optional)
├── recordedBy: string (FK → StaffUser, nullable)
├── transactionRef: string (optional)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### 5.6 Alert (System-generated)

```
Alert
├── id: string (UUID)
├── level: enum [danger, warning, info]
├── message: string
├── linkLabel: string
├── href: string
├── resolvedAt: timestamp (nullable)
├── createdAt: timestamp
```

---

## 6. Summary Table

### 6.1 Customer Portal Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/customer/request-otp` | — | Request OTP |
| POST | `/auth/customer/verify-otp` | — | Verify OTP & login |
| POST | `/auth/customer/logout` | Bearer | Logout |
| GET | `/customers/me/dashboard` | Bearer | Customer dashboard |
| GET | `/customers/me/payments` | Bearer | My payments |
| POST | `/customers/me/payments` | Bearer | Make a payment |
| GET | `/customers/me/collections` | Bearer | My collection history |

### 6.2 Staff Dashboard Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/staff/login` | — | Step 1: email + password |
| POST | `/auth/staff/verify-otp` | — | Step 2: OTP |
| POST | `/auth/staff/forgot-password` | — | Request reset |
| POST | `/auth/staff/reset-password` | — | Reset with OTP |
| POST | `/auth/staff/logout` | Bearer | Logout |
| GET | `/dashboard/stats` | Bearer | Overview KPIs |
| GET | `/clients` | Bearer | List clients |
| GET | `/clients/:id` | Bearer | Get client |
| POST | `/clients` | Bearer | Create client |
| PUT | `/clients/:id` | Bearer | Update client |
| DELETE | `/clients/:id` | Bearer | Deactivate client |
| GET | `/collections` | Bearer | List collections |
| POST | `/collections` | Bearer | Log collection |
| PUT | `/collections/:id` | Bearer | Update collection |
| DELETE | `/collections/:id` | Bearer | Delete collection |
| GET | `/zones` | Bearer | List zones |
| POST | `/zones` | Bearer | Create zone |
| PUT | `/zones/:id` | Bearer | Update zone |
| DELETE | `/zones/:id` | Bearer | Deactivate zone |
| GET | `/payments` | Bearer | List all payments |
| POST | `/payments` | Bearer | Record payment |
| PUT | `/payments/:id` | Bearer | Update payment |
| DELETE | `/payments/:id` | Bearer | Delete payment |
| GET | `/staff` | Bearer + Admin | List staff |
| POST | `/staff` | Bearer + Admin | Create staff |
| PUT | `/staff/:id` | Bearer + Admin | Update staff |
| DELETE | `/staff/:id` | Bearer + Admin | Deactivate staff |

---

## 7. Notes

1. **Auth tokens** should be JWTs with short expiry (15–60 min) and a refresh token mechanism.
2. **Customer auth** uses phone OTP — integrate with Rwanda SMS provider (e.g., Africa's Talking, Twilio).
3. **Staff auth** uses email + password + OTP to registered phone/email for extra security.
4. **Soft deletes** are used for Clients, Zones, and Staff — never hard delete historical records.
5. **Payment status** is computed nightly by a cron job: if `date` is past due and status is not `paid` or `waived`, set to `overdue`.
6. **Collection stats** (collectionsThisWeek, overdueCount, etc.) should be materialized or cached for the overview endpoint.
7. **File uploads** (profile photos, compliance docs) not in scope for v1 — add `/uploads` namespace later.

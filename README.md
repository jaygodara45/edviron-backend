# Edviron API Documentation

Welcome to the Edviron API!
This document explains how to use each available endpoint.

---

## Base URL

```
{{BASE_URL}}
```

Replace `{{BASE_URL}}` with actual server URL.

---

## Authentication

All endpoints other than register and login require authentication via **Bearer Token** in the `Authorization` header.

Example:

```http
Authorization: Bearer <your_token_here>
```

---

## Endpoints

### 1. Register a User

**URL:** `POST /api/auth/register`

**Description:** Register a new user.

**Request Body:**

```json
{
  "name": "Jay Godara",
  "email": "jay@gmail.com",
  "password": "123456"
}
```

**Response:**
- Success: User registered successfully.
- Failure: Appropriate error message (e.g., email already exists).

---

### 2. Login User

**URL:** `POST /api/auth/login`

**Description:** Log in an existing user.

**Request Body:**

```json
{
  "email": "jay@gmail.com",
  "password": "123456"
}
```

**Response:**
- Success: Returns an authentication token.
- Failure: Invalid credentials.

---

### 3. Create Payment

**URL:** `POST /api/create-payment`

**Headers:**
```http
Authorization: Bearer <your_token_here>
```

**Request Body:**

```json
{
  "school_id": "65b0e6293e9f76a9694d84b4",
  "amount": "1",
  "callback_url": "https://github.com"
}
```

**Response:**
- Success: Payment initiated.
- Failure: Authorization issues or validation errors.

---

### 4. Webhook Endpoint

**URL:** `GET /api/webhook`

**Description:** Webhook listener (likely for payment status updates).

(Note: Implementation details not provided.)

---

### 5. Get All Transactions

**URL:** `GET /api/transactions`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit`   | int  | Number of transactions per page |
| `page`    | int  | Page number |

**Example:**

```
GET /api/transactions?limit=10&page=3
```

**Response:**
- Success: List of transactions.

---

### 6. Get Transactions by School

**URL:** `GET /api/transactions/school/:schoolId`

**Path Parameter:**

| Parameter | Description |
|-----------|-------------|
| `schoolId` | ID of the school |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`    | int  | Page number |
| `limit`   | int  | Number of transactions per page |

**Example:**

```
GET /api/transactions/school/65b0e6293e9f76a9694d84b7?page=1&limit=25
```

**Response:**
- Success: List of transactions for the given school.

---

### 7. Get Transaction by Order ID

**URL:** `GET /api/transactions/transaction-status/:orderId`

**Path Parameter:**

| Parameter | Description |
|-----------|-------------|
| `orderId` | Order ID to fetch transaction status |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`    | int  | Page number |
| `limit`   | int  | Number of records per page |

**Example:**

```
GET /api/transactions/transaction-status/680d2b7e3a7b92bb328c3f79?page=2&limit=10
```

**Response:**
- Success: Transaction status details.

---

## Notes

- Replace placeholders like `{{BASE_URL}}`, `schoolId`, and `orderId` with real values.
- Always send the Authorization token where required.
- Implement error handling for failed API calls.# Edviron API Documentation

Welcome to the Edviron API!
This document explains how to use each available endpoint.

---

## Base URL

```
{{BASE_URL}}
```

Replace `{{BASE_URL}}` with your actual server URL.

---

## Authentication

Some endpoints require authentication via **Bearer Token** in the `Authorization` header.

Example:

```http
Authorization: Bearer <your_token_here>
```

---

## Endpoints

### 1. Register a User

**URL:** `POST /api/auth/register`

**Description:** Register a new user.

**Request Body:**

```json
{
  "name": "Jay Godara",
  "email": "jay@gmail.com",
  "password": "123456"
}
```

**Response:**
- Success: User registered successfully.
- Failure: Appropriate error message (e.g., email already exists).

---

### 2. Login User

**URL:** `POST /api/auth/login`

**Description:** Log in an existing user.

**Request Body:**

```json
{
  "email": "jay@gmail.com",
  "password": "123456"
}
```

**Response:**
- Success: Returns an authentication token.
- Failure: Invalid credentials.

---

### 3. Create Payment

**URL:** `POST /api/create-payment`

**Headers:**
```http
Authorization: Bearer <your_token_here>
```

**Request Body:**

```json
{
  "school_id": "65b0e6293e9f76a9694d84b4",
  "amount": "1",
  "callback_url": "https://github.com/jaygodara45"
}
```

**Response:**
- Success: Payment initiated.
- Failure: Authorization issues or validation errors.

---

### 4. Webhook Endpoint

**URL:** `GET /api/webhook`

**Description:** Webhook listener (likely for payment status updates).

(Note: Implementation details not provided.)

---

### 5. Get All Transactions

**URL:** `GET /api/transactions`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit`   | int  | Number of transactions per page |
| `page`    | int  | Page number |

**Example:**

```
GET /api/transactions?limit=10&page=3
```

**Response:**
- Success: List of transactions.

---

### 6. Get Transactions by School

**URL:** `GET /api/transactions/school/:schoolId`

**Path Parameter:**

| Parameter | Description |
|-----------|-------------|
| `schoolId` | ID of the school |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`    | int  | Page number |
| `limit`   | int  | Number of transactions per page |

**Example:**

```
GET /api/transactions/school/65b0e6293e9f76a9694d84b7?page=1&limit=25
```

**Response:**
- Success: List of transactions for the given school.

---

### 7. Get Transaction by Order ID

**URL:** `GET /api/transactions/transaction-status/:orderId`

**Path Parameter:**

| Parameter | Description |
|-----------|-------------|
| `orderId` | Order ID to fetch transaction status |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`    | int  | Page number |
| `limit`   | int  | Number of records per page |

**Example:**

```
GET /api/transactions/transaction-status/680d2b7e3a7b92bb328c3f79?page=2&limit=10
```

**Response:**
- Success: Transaction status details.

---

## Notes

- Replace placeholders like `{{BASE_URL}}`, `schoolId`, and `orderId` with real values.
- Always send the Authorization token where required.
- Implement error handling for failed API calls.
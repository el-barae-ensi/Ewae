# Ewae API Documentation

## Overview

This document provides comprehensive API documentation for the Ewae platform, a multi-service web application for managing associations, residents, and security operations.

## Architecture

The Ewae platform follows a microservices architecture with the following services:

- **Frontend**: React.js application (Port 3000)
- **API Gateway**: Nginx reverse proxy (Port 8080)
- **Service 1**: Spring Boot - User Management (Port 8081)
- **Service 2**: .NET Core - iwaa Service (Port 5000)
- **Database**: MySQL (Port 3306)
- **Cache**: Redis (Port 6379)

## Base URLs

### Development Environment
- Frontend: `http://localhost:3000`
- API Gateway: `http://localhost:8080`
- Service 1 (Spring Boot): `http://localhost:8081/api/v1`
- Service 2 (.NET): `http://localhost:5000/api`

### Production Environment
- Frontend: `https://ewae.example.com`
- API Gateway: `https://api.ewae.example.com`

## Authentication

All API endpoints (except public endpoints) require authentication using JWT tokens.

### Authentication Flow

1. **Login**: `POST /auth/login`
2. **Refresh Token**: `POST /auth/refresh`
3. **Logout**: `POST /auth/logout`

### Headers

Include the following header in all authenticated requests:

```
Authorization: Bearer <jwt_token>
```

## User Roles

The system supports the following user roles:

- `AGENT_SECURITE`: Security Agent
- `GROUPE_ASSOCIATIF`: Association Group
- `PUBLIC`: Public User
- `GESTION_PERSONA`: Person Management
- `TWAA`: TWAA Administrator

## API Endpoints

### Authentication Service (Service 1)

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": 1,
    "username": "john.doe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "AGENT_SECURITE",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- `200 OK`: Login successful
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Validation errors

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string",
  "phoneNumber": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### POST /auth/refresh
Refresh JWT token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "token": "new_jwt_token_here",
  "refreshToken": "new_refresh_token_here"
}
```

### User Management Service (Service 1)

#### GET /users
Get list of users (Admin only).

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)
- `role`: Filter by role
- `active`: Filter by active status

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "username": "john.doe",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "AGENT_SECURITE",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalElements": 100,
  "totalPages": 10,
  "size": 10,
  "number": 0
}
```

#### GET /users/{id}
Get user by ID.

**Response:**
```json
{
  "id": 1,
  "username": "john.doe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "AGENT_SECURITE",
  "phoneNumber": "+1234567890",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-15T10:30:00Z"
}
```

#### PUT /users/{id}
Update user information.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumber": "string",
  "role": "string",
  "isActive": true
}
```

#### DELETE /users/{id}
Deactivate user (soft delete).

### Association Management Service

#### GET /associations
Get list of associations.

**Query Parameters:**
- `page`: Page number
- `size`: Page size
- `province`: Filter by province
- `status`: Filter by status (active, inactive, pending)

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Association Al Amal",
      "description": "Association for social welfare",
      "address": "123 Main Street, Casablanca",
      "province": "Casablanca",
      "phoneNumber": "+212-123-456789",
      "email": "contact@alamal.org",
      "status": "active",
      "establishedDate": "2020-01-01",
      "totalMembers": 150,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "size": 10,
  "number": 0
}
```

#### POST /associations
Create new association.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "province": "string",
  "phoneNumber": "string",
  "email": "string",
  "establishedDate": "2024-01-01"
}
```

#### GET /associations/{id}
Get association by ID.

#### PUT /associations/{id}
Update association information.

#### DELETE /associations/{id}
Deactivate association.

### Resident Management Service

#### GET /residents
Get list of residents.

**Query Parameters:**
- `page`: Page number
- `size`: Page size
- `associationId`: Filter by association
- `status`: Filter by status

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "firstName": "Ahmed",
      "lastName": "Benali",
      "dateOfBirth": "1985-05-15",
      "nationalId": "AB123456",
      "phoneNumber": "+212-987-654321",
      "email": "ahmed.benali@example.com",
      "address": "456 Secondary Street, Rabat",
      "associationId": 1,
      "associationName": "Association Al Amal",
      "entryDate": "2023-06-01",
      "status": "active",
      "emergencyContact": {
        "name": "Fatima Benali",
        "phone": "+212-111-222333",
        "relationship": "Sister"
      }
    }
  ],
  "totalElements": 200,
  "totalPages": 20,
  "size": 10,
  "number": 0
}
```

#### POST /residents
Add new resident.

#### GET /residents/{id}
Get resident by ID.

#### PUT /residents/{id}
Update resident information.

#### DELETE /residents/{id}
Remove resident.

### Alerts Management Service

#### GET /alerts
Get list of alerts.

**Query Parameters:**
- `status`: Filter by status (new, in_progress, resolved, closed)
- `priority`: Filter by priority (low, medium, high, critical)
- `type`: Filter by type (correspondence, financial, security, medical, behavioral, absence)
- `assignedTo`: Filter by assigned user

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "title": "Correspondance suspecte détectée",
      "description": "Correspondance inhabituelle entre pensionnaire Ahmed Benali et contact externe non autorisé",
      "type": "correspondence",
      "priority": "high",
      "status": "new",
      "createdDate": "2024-02-15T14:30:00Z",
      "targetEntity": "Pensionnaire Ahmed Benali",
      "entityType": "resident",
      "entityId": 1,
      "location": "Association Al Amal",
      "assignedTo": "Agent de Sécurité",
      "evidence": ["Email intercepté", "Logs de communication"],
      "actionRequired": "Vérification immédiate des communications",
      "riskLevel": "high",
      "category": "security"
    }
  ],
  "totalElements": 25,
  "totalPages": 3,
  "size": 10,
  "number": 0
}
```

#### POST /alerts
Create new alert.

#### GET /alerts/{id}
Get alert by ID.

#### PUT /alerts/{id}
Update alert information.

#### PUT /alerts/{id}/status
Update alert status.

**Request Body:**
```json
{
  "status": "in_progress",
  "notes": "Investigation started"
}
```

### Reports Service

#### GET /reports
Get list of available reports.

#### POST /reports/generate
Generate a new report.

**Request Body:**
```json
{
  "type": "monthly_summary",
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  },
  "filters": {
    "associationId": 1,
    "includeResidents": true,
    "includeAlerts": true
  }
}
```

#### GET /reports/{id}/download
Download generated report.

### Donations Service

#### GET /donations
Get list of donations.

#### POST /donations
Record new donation.

**Request Body:**
```json
{
  "donorName": "string",
  "donorEmail": "string",
  "donorPhone": "string",
  "amount": 1000.00,
  "currency": "MAD",
  "type": "monetary",
  "purpose": "general",
  "associationId": 1,
  "isAnonymous": false
}
```

#### GET /donations/{id}
Get donation by ID.

### Statistics Service

#### GET /statistics/dashboard
Get dashboard statistics.

**Response:**
```json
{
  "totalAssociations": 50,
  "totalResidents": 1250,
  "totalAlerts": 25,
  "totalDonations": 125000.00,
  "newAlertsToday": 5,
  "resolvedAlertsThisWeek": 15,
  "topAssociations": [
    {
      "id": 1,
      "name": "Association Al Amal",
      "residentCount": 150
    }
  ],
  "alertsByPriority": {
    "high": 5,
    "medium": 15,
    "low": 5
  },
  "donationsTrend": [
    {
      "month": "2024-01",
      "amount": 25000.00
    }
  ]
}
```

#### GET /statistics/associations
Get association-specific statistics.

#### GET /statistics/residents
Get resident-related statistics.

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/users",
  "details": {
    "fieldErrors": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Common Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `500 Internal Server Error`: Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per user
- **File upload endpoints**: 10 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642272000
```

## Pagination

List endpoints support pagination using the following parameters:

- `page`: Page number (0-based, default: 0)
- `size`: Page size (default: 10, max: 100)
- `sort`: Sort field and direction (e.g., `createdAt,desc`)

Pagination response format:

```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 10,
  "size": 10,
  "number": 0,
  "first": true,
  "last": false,
  "numberOfElements": 10
}
```

## Filtering and Searching

Many endpoints support filtering and searching:

- Use query parameters for filtering (e.g., `?status=active&role=AGENT_SECURITE`)
- Use `search` parameter for text-based searching
- Use `dateFrom` and `dateTo` for date range filtering

Example:
```
GET /api/v1/users?search=john&role=AGENT_SECURITE&active=true&dateFrom=2024-01-01&dateTo=2024-01-31
```

## File Uploads

File upload endpoints accept multipart/form-data:

```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf" \
  -F "type=identification" \
  http://localhost:8081/api/v1/documents/upload
```

Supported file types:
- Images: JPG, PNG, GIF (max 5MB)
- Documents: PDF, DOC, DOCX (max 10MB)
- Spreadsheets: XLS, XLSX, CSV (max 5MB)

## WebSocket Events

Real-time events are available via WebSocket connection at `/ws`:

### Connection
```javascript
const socket = new WebSocket('ws://localhost:8081/ws');
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({
        type: 'auth',
        token: 'jwt_token_here'
    }));
});
```

### Event Types
- `alert.created`: New alert created
- `alert.updated`: Alert status updated
- `user.login`: User logged in
- `donation.received`: New donation received

### Event Format
```json
{
  "type": "alert.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 1,
    "title": "New Alert",
    "priority": "high"
  }
}
```

## SDKs and Client Libraries

Official SDKs are available for:

- **JavaScript/TypeScript**: `npm install @ewae/api-client`
- **Python**: `pip install ewae-api-client`
- **Java**: Available via Maven Central
- **C#**: Available via NuGet

## Testing

### Postman Collection
Import the Postman collection from `/docs/postman/Ewae-API.postman_collection.json`

### API Testing Environments
- **Development**: `http://localhost:8080`
- **Staging**: `https://api-staging.ewae.example.com`
- **Production**: `https://api.ewae.example.com`

## Support

For API support and questions:

- Email: api-support@ewae.example.com
- Documentation: https://docs.ewae.example.com
- Status Page: https://status.ewae.example.com

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial API release
- User authentication and management
- Association management
- Resident management
- Alert system
- Basic reporting

### Version 1.1.0 (Planned)
- Enhanced search capabilities
- Bulk operations
- Advanced reporting
- Mobile app support
- Webhook notifications
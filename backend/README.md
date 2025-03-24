# CSE Department Backend

This is the backend service for the CSE Department website, built with Spring Boot 3.x and MySQL.

## Prerequisites

- Java 21
- MySQL 8.0+
- Maven

## Configuration

1. Create a MySQL database (will be created automatically with the configuration)
2. Update `src/main/resources/application.yml` with your database credentials

## Running the Application

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on port 8080.

## Default Admin Account

The system automatically creates an admin account on startup if it doesn't exist:
- Username: admin
- Password: admin@123

## API Endpoints

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "admin", // or lecturer username
    "password": "admin@123"
}
```

### Admin Operations (Requires ADMIN Role)

#### Create Lecturer Account
```http
POST /api/auth/admin/create-lecturer
Content-Type: application/json
Authorization: Bearer {admin_access_token}

{
    "username": "lecturer1",
    "email": "lecturer1@university.edu",
    "password": "password123",
    "fullName": "John Doe",
    "phoneNumber": "0123456789",
    "address": "123 University Street",
    "department": "Computer Science",
    "faculty": "Engineering",
    "position": "Associate Professor"
}
```

#### Delete Lecturer Account
```http
DELETE /api/v1/lecturers/{lecturerId}
Authorization: Bearer {admin_access_token}
```

### Lecturer Operations

#### Update Own Profile (Requires LECTURER Role)
```http
PUT /api/v1/lecturers/profile
Content-Type: application/json
Authorization: Bearer {lecturer_access_token}

{
    "fullName": "John Doe",
    "showFullName": true,
    "dateOfBirth": "1980-01-01",
    "showDateOfBirth": false,
    "gender": "MALE",
    "showGender": true,
    "phoneNumber": "0123456789",
    "showPhoneNumber": true,
    "address": "123 University Street",
    "showAddress": true,
    "avatarUrl": "https://example.com/avatar.jpg",
    "showAvatar": true,
    "academicDegree": "Ph.D",
    "showAcademicDegree": true,
    "department": "Computer Science",
    "showDepartment": true,
    "position": "Associate Professor",
    "showPosition": true,
    "faculty": "Engineering",
    "showFaculty": true,
    "researchFields": ["AI", "Machine Learning"],
    "showResearchFields": true
}
```

### Public Endpoints

#### Get All Lecturers
```http
GET /api/v1/lecturers
```
Returns a list of lecturer profiles. If accessed without authentication or by a non-admin user, only visible fields are included.

#### Get Specific Lecturer
```http
GET /api/v1/lecturers/{lecturerId}
```
Returns a specific lecturer's profile. If accessed without authentication or by a non-admin user (except the profile owner), only visible fields are included.

### Response Format

Success Response:
```json
{
    "status": "SUCCESS",
    "message": "Operation successful",
    "data": {
        "id": "uuid",
        "username": "lecturer1",
        "fullName": "John Doe",
        "phoneNumber": "0123456789", // if visible
        "address": "123 University Street", // if visible
        // other fields based on visibility settings
    },
    "timestamp": "2024-03-20T23:10:00"
}
```

Error Response:
```json
{
    "status": "ERROR",
    "message": "Error message here",
    "timestamp": "2024-03-20T23:10:00"
}
```

## API Authorization

### Admin-only Endpoints
These endpoints require an admin access token:
- POST /api/auth/admin/create-lecturer
- DELETE /api/v1/lecturers/{id}

### Lecturer-only Endpoints
These endpoints require a lecturer access token:
- PUT /api/v1/lecturers/profile

### Public Endpoints
These endpoints are accessible without authentication:
- POST /api/auth/login
- GET /api/v1/lecturers (returns only visible fields)
- GET /api/v1/lecturers/{id} (returns only visible fields)

## Security

- Uses JWT (JSON Web Token) for authentication
- Access token expires in 24 hours
- Refresh token expires in 7 days
- Passwords are hashed using BCrypt
- Role-based access control (ADMIN and LECTURER roles)
- Field-level visibility control for lecturer profiles
- CORS is configured for localhost:3000 and localhost:5173

## Project Structure

```
src/main/java/com/example/backend/
├── config/
│   ├── DataLoader.java (Initializes admin account)
│   └── WebConfig.java (CORS configuration)
├── controller/
│   ├── AuthController.java
│   └── LecturerController.java
├── dto/
│   ├── auth/
│   └── lecturer/
├── entity/
│   ├── User.java
│   └── LecturerProfile.java
├── security/
│   └── jwt/
├── service/
│   ├── AuthService.java
│   └── LecturerService.java
└── BackendApplication.java
```

## Future Enhancements

1. Password reset functionality
2. Email verification for new accounts
3. Profile image upload functionality
4. Rate limiting
5. Activity logging
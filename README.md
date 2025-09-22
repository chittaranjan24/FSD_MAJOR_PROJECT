# Project Title: Full-Stack Application (SUPER-MARKET) - Microservices

## Description

**Short Description:** A microservices-based full-stack application with separate services for user authentication and product management.

**Long Description:** This project is a complete full-stack application built with a microservices architecture. It features a secure `auth` service for user management and a `product` service for handling products. It's designed to be a scalable starting point for building complex web applications that require robust user authentication, session management, and separation of concerns.

## Tech Stack

- **Frontend:** (To be determined - e.g., React, Vue, Angular)
- **Backend:** Node.js, Express.js
- **Services:**
    - **Auth Service:** Handles user registration, login, and authentication.
    - **Product Service:** Manages product listings, details, and inventory.
- **Database:** MongoDB (with Mongoose), Redis (for session management in the auth service)
- **Hosting/Deployment:** (To be determined - e.g., Heroku, AWS, Vercel)
- **Tools/Frameworks:**
  - `bcryptjs`: For hashing passwords
  - `jsonwebtoken`: For creating and verifying JSON Web Tokens
  - `cookie-parser`: For parsing cookies
  - `express-validator`: For validating request data
  - `dotenv`: For managing environment variables
  - `multer`: For handling file uploads (in the product service)
  - `imagekit`: For image storage and optimization (in the product service)

## Features

- **Auth Service:**
    - User registration
    - User login with JWT-based authentication
    - Secure password hashing
    - Session management with Redis
    - Input validation
- **Product Service:**
    - (Placeholder for) Product creation, retrieval, updating, and deletion (CRUD)
    - (Placeholder for) Image uploads for products

## Installation & Setup

This project consists of two separate services: `auth` and `product`. You need to run them independently.

### Auth Service

1. **Navigate to the `auth` directory:**
   ```bash
   cd auth
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file** in the `auth` directory and add the required environment variables (see below).
4. **Run the server:**
   ```bash
   npm run dev
   ```

### Product Service

1. **Navigate to the `product` directory:**
   ```bash
   cd product
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file** in the `product` directory and add the required environment variables (see below).
4. **Run the server:**
   ```bash
   npm run dev
   ```

### Frontend

(Instructions to be added once the frontend is developed)

## Environment Variables

### Auth Service (`auth/.env`)

```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
REDIS_URI=your_redis_connection_string
JWT_SECRET=your_jwt_secret
```

### Product Service (`product/.env`)

```
PORT=3002
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## Usage

Once the backend services are running, you can use a tool like Postman or `curl` to interact with the APIs.

## API Documentation

### Auth Service

#### Register a new user

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login a user

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:** (A cookie with the JWT token will be set in the response headers)
  ```json
  {
    "message": "Logged in successfully"
  }
  ```

### Product Service

(API documentation to be added)

## Folder Structure

```
.
├── auth/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       │   └── auth.controller.js
│       ├── db/
│       │   ├── db.js
│       │   └── redis.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── validator.middleware.js
│       ├── models/
│       │   └── user.model.js
│       └── routes/
│           └── auth.route.js
├── product/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       │   └── product.controller.js
│       ├── db/
│       │   └── db.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── validator.middleware.js
│       ├── models/
│       │   └── product.model.js
│       ├── routes/
│       │   └── product.route.js
│       └── services/
│           └── imagekit.service.js
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Improvements / Roadmap

- Implement password reset functionality
- Add social login (e.g., Google, GitHub)
- Develop the frontend application
- Implement inter-service communication (e.g., using a message broker like RabbitMQ or an API gateway)
- Add unit and integration tests for both services

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- And all the amazing npm packages used in this project.

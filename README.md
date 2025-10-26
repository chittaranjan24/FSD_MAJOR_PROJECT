<div align="center">
  <h1>Super-Market Microservices Platform</h1>
  <p>
    <strong>Enterprise-Grade Full-Stack Application</strong> built with Node.js, Express, MongoDB, and Redis. Modular microservices for Auth, Product, Cart, Order, Payment, and AI-Buddy.
  </p>
  <p>
    <a href="https://github.com/chittaranjan24/FSD_MAJOR_PROJECT/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License"></a>
    <a href="https://www.linkedin.com/in/chittaranjan-shit2/"><img src="https://img.shields.io/badge/LinkedIn-Chittaranjan-blue?style=flat-square&logo=linkedin" alt="LinkedIn"></a>
  </p>
</div>

This project is a robust, scalable full-stack application architected with microservices. It features:
- **Auth Service** for secure user management
- **Product Service** for product CRUD and image uploads
- **Cart Service** for shopping cart operations
- **Order Service** for order lifecycle management
- **Payment Service** for payment processing and verification
- **AI-Buddy Service** for real-time socket and agent integrations

Designed for extensibility, security, and real-world e-commerce scenarios.

## Tech Stack

### Frontend (Coming Soon)
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
</p>

### Database
<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis">
</p>

### Tools/Frameworks
<p>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv">
  <img src="https://img.shields.io/badge/Bcrypt-4B5972?style=for-the-badge" alt="Bcrypt">
  <img src="https://img.shields.io/badge/Cookie--Parser-E39842?style=for-the-badge" alt="Cookie-Parser">
  <img src="https://img.shields.io/badge/Express--Validator-555555?style=for-the-badge" alt="Express-Validator">
  <img src="https://img.shields.io/badge/Multer-333333?style=for-the-badge" alt="Multer">
  <img src="https://img.shields.io/badge/ImageKit-00BFFF?style=for-the-badge&logo=imagekit&logoColor=white" alt="ImageKit">
</p>

## Features by Service

- **Auth Service:**
    - User registration, login, logout
    - JWT authentication & secure password hashing
    - Session management (Redis)
    - Address management (CRUD)
    - Input validation
- **Product Service:**
    - Product creation, retrieval, update, deletion
    - Image uploads (ImageKit)
    - Seller-specific product queries
- **Cart Service:**
    - Add, update, and view cart items
    - Cart item validation
- **Order Service:**
    - Create, view, update, and cancel orders
    - Address update for orders
- **Payment Service:**
    - Create and verify payments (Razorpay integration)
- **AI-Buddy Service:**
    - Real-time socket server and agent tools (custom integrations)

This project consists of multiple independent microservices. Each service runs separately and communicates via REST APIs. Recommended: run each in its own terminal.

### Service Setup

For each service below, run these steps in its directory:
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Create a `.env` file** and add required environment variables (see below).
3. **Run the server:**
   ```bash
   npm run dev
   ```

#### Services:
- `auth` (User & session management)
- `product` (Product CRUD & images)
- `cart` (Shopping cart)
- `order` (Order lifecycle)
- `payment` (Payment processing)
- `ai-buddy` (Socket/agent integrations)

### Frontend
(Instructions to be added once developed)

## Environment Variables

Each service requires its own `.env` file. Example variables:

**Auth Service (`auth/.env`)**
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
REDIS_URI=your_redis_connection_string
JWT_SECRET=your_jwt_secret
```
**Product Service (`product/.env`)**
```
PORT=3002
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```
**Cart Service (`cart/.env`)**
```
PORT=3003
MONGODB_URI=your_mongodb_connection_string
```
**Order Service (`order/.env`)**
```
PORT=3004
MONGODB_URI=your_mongodb_connection_string
```
**Payment Service (`payment/.env`)**
```
PORT=3005
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Usage

Start all backend services. Use Postman, curl, or a frontend client to interact with the APIs. Each service exposes its own REST endpoints.

## API Documentation

### Auth Service
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user
- `GET /api/auth/logout` — Logout user
- `GET /api/auth/users/me/address` — Get user address
- `POST /api/auth/users/me/address` — Add address
- `DELETE /api/auth/users/me/address/:addressId` — Delete address

### Product Service
- `POST /api/products/` — Create product (admin/seller, images supported)
- `GET /api/products/` — List products
- `PATCH /api/products/:id` — Update product (seller)
- `DELETE /api/products/:id` — Delete product (seller)
- `GET /api/products/seller` — List seller's products
- `GET /api/products/:id` — Get product by ID

### Cart Service
- `GET /api/cart` — Get user's cart
- `POST /api/cart/items` — Add item to cart
- `PATCH /api/cart/items/:productId` — Update cart item

### Order Service
- `POST /api/orders/` — Create order
- `GET /api/orders/me` — Get user's orders
- `POST /api/orders/:id/cancel` — Cancel order
- `GET /api/orders/:id` — Get order by ID
- `PATCH /api/orders/:id/address` — Update order address

### Payment Service
- `POST /api/payments/create/:orderId` — Create payment for order
- `POST /api/payments/verify` — Verify payment

### AI-Buddy Service
- Real-time socket and agent endpoints (custom, see code)

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
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       └── routes/
├── product/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
├── cart/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       └── routes/
├── order/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       └── routes/
├── payment/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
├── ai-buddy/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── agent/
│       └── sockets/
└── README.md
```

## Contributing

We welcome contributions! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the ISC License.

## Roadmap & Future Improvements
- Password reset functionality
- Social login (Google, GitHub, etc.)
- Frontend application (React)
- Inter-service communication (RabbitMQ, API Gateway)
- Unit and integration tests for all services
- Advanced monitoring, logging, and CI/CD

## Acknowledgements
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Razorpay](https://razorpay.com/)
- [ImageKit](https://imagekit.io/)
- And all npm packages and open-source contributors

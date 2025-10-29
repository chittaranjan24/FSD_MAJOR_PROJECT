<div align="center">
  <img src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80" alt="Modern retail operations" width="900">
  <h1>Super-Market Microservices Platform</h1>
  <p>
    <strong>Enterprise-Grade Retail Commerce Suite</strong> delivering modular services for authentication, catalog, cart, ordering, payments, and AI enablement.
  </p>
  <p>
    <a href="https://github.com/chittaranjan24/FSD_MAJOR_PROJECT/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License"></a>
    <a href="https://www.linkedin.com/in/chittaranjan-shit2/"><img src="https://img.shields.io/badge/LinkedIn-Chittaranjan-blue?style=flat-square&logo=linkedin" alt="LinkedIn"></a>
  </p>
</div>

<div align="center">
  <table>
    <tr>
      <td><strong>Customers</strong><br>Personalized journeys, secure identity, and consistent cart experiences.</td>
      <td><strong>Operations</strong><br>Service isolation for streamlined deployments and fault containment.</td>
      <td><strong>Revenue</strong><br>Faster product launches, payment agility, and data-driven automation.</td>
    </tr>
  </table>
</div>

---

## Executive Overview

- Microservice topology designed for omnichannel retail workloads
- Event-ready APIs that scale independently across product, cart, order, and payment flows
- Authentication-first security posture with Redis-backed session hardening
- AI-Buddy assistant to augment customer support and operational intelligence

![Platform Collaboration](https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80)

*Photography courtesy of Unsplash creators supporting open knowledge sharing.*

## Platform Storyboard

| Module | Business Outcome | Delivery Assets |
| --- | --- | --- |
| <img src="https://img.shields.io/badge/Auth%20Service-Identity-blue?style=flat-square&logo=auth0&logoColor=white" alt="Auth badge"> | Reduce onboarding friction with resilient JWT flows and address book automation | REST APIs, Redis cache, validation middleware |
| <img src="https://img.shields.io/badge/Product%20Service-Catalog-darkgreen?style=flat-square&logo=producthunt&logoColor=white" alt="Product badge"> | Accelerate merchandizing through ImageKit powered asset delivery | CRUD controllers, media services, seller filters |
| <img src="https://img.shields.io/badge/Cart%20Service-Basket-orange?style=flat-square&logo=shopify&logoColor=white" alt="Cart badge"> | Maintain live baskets with inventory-aware validation | State-aware middleware, atomic updates |
| <img src="https://img.shields.io/badge/Order%20Service-Fulfillment-navy?style=flat-square&logo=adobecommerce&logoColor=white" alt="Order badge"> | Standardize order orchestration from creation to cancellation | Lifecycle APIs, address mutation endpoints |
| <img src="https://img.shields.io/badge/Payment%20Service-Fintech-purple?style=flat-square&logo=razorpay&logoColor=white" alt="Payment badge"> | Secure capture and verification with Razorpay integration | Signature verification, transactional audit logs |
| <img src="https://img.shields.io/badge/AI--Buddy-Intelligence-black?style=flat-square&logo=openai&logoColor=white" alt="AI badge"> | Deploy conversational tooling for support and insights | Socket gateway, agent toolkits, extensible adapters |

## Solution Architecture

```mermaid
flowchart LR
  subgraph Client Channels
    Web[Web Frontend]
    Mobile[Mobile App]
    Ops[Ops Console]
  end

  Web --> GW(API Gateway)
  Mobile --> GW
  Ops --> GW

  subgraph Core Services
    AuthSvc[Auth Service]
    ProductSvc[Product Service]
    CartSvc[Cart Service]
    OrderSvc[Order Service]
    PaymentSvc[Payment Service]
    AIBuddy[AI-Buddy Service]
  end

  GW --> AuthSvc
  GW --> ProductSvc
  GW --> CartSvc
  GW --> OrderSvc
  GW --> PaymentSvc
  GW --> AIBuddy

  AuthSvc --> Redis[(Redis Cache)]
  ProductSvc --> Mongo[(MongoDB Cluster)]
  CartSvc --> Mongo
  OrderSvc --> Mongo
  PaymentSvc --> Mongo
  PaymentSvc --> Razorpay[(Razorpay API)]
  ProductSvc --> ImageKit[(ImageKit CDN)]
  AIBuddy --> Socket[(Socket Server)]

  subgraph Observability
    Logs[Structured Logs]
    Metrics[Service Metrics]
  end

  Core Services --> Logs
  Core Services --> Metrics
```

## Technology Stack

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

### Tooling & Integrations
<p>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv">
  <img src="https://img.shields.io/badge/Bcrypt-4B5972?style=for-the-badge" alt="Bcrypt">
  <img src="https://img.shields.io/badge/Cookie--Parser-E39842?style=for-the-badge" alt="Cookie-Parser">
  <img src="https://img.shields.io/badge/Express--Validator-555555?style=for-the-badge" alt="Express-Validator">
  <img src="https://img.shields.io/badge/Multer-333333?style=for-the-badge" alt="Multer">
  <img src="https://img.shields.io/badge/ImageKit-00BFFF?style=for-the-badge&logo=imagekit&logoColor=white" alt="ImageKit">
</p>

## Capability Breakdown

- **Auth Service** secures user identities, sessions, and address books with Redis-backed tokens
- **Product Service** orchestrates catalog CRUD, media uploads, and seller segmentation
- **Cart Service** maintains active carts with policy-driven validation and adjustments
- **Order Service** governs order lifecycles, change requests, and fulfillment status
- **Payment Service** captures and verifies Razorpay transactions with signature validation
- **AI-Buddy Service** powers socket-based automation and assistant experiences for the platform

## Operating Playbook

This project is composed of independent Node.js services. Run each service in its own terminal for the best developer experience and resilience testing.

### Service Bootstrapping

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Add configuration** by creating a dedicated `.env` file per service (see matrix below).
3. **Run the service**
   ```bash
   npm run dev
   ```

| Service | Port (default) | Key Environment Variables |
| --- | --- | --- |
| Auth | 3001 | `MONGODB_URI`, `REDIS_URI`, `JWT_SECRET` |
| Product | 3002 | `MONGODB_URI`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` |
| Cart | 3003 | `MONGODB_URI` |
| Order | 3004 | `MONGODB_URI` |
| Payment | 3005 | `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` |
| AI-Buddy | 3006 (configurable) | `MONGODB_URI`, `SOCKET_PORT` |

### Environment File Templates

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

**AI-Buddy Service (`ai-buddy/.env`)**
```
PORT=3006
MONGODB_URI=your_mongodb_connection_string
SOCKET_PORT=4000
```

## API Surface

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
- Socket gateway and agent endpoints for conversational tooling (see service code)

## Repository Topology

```
.
├── auth/
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

## Delivery Lifecycle

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a pull request for review

## License

This project is licensed under the ISC License.

## Roadmap

- Password reset and MFA enrollment
- Social login providers (Google, GitHub, more)
- React storefront frontend
- Inter-service messaging via RabbitMQ or Kafka
- Observability stack (OpenTelemetry, Grafana)
- CI/CD automation with quality gates

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Razorpay](https://razorpay.com/)
- [ImageKit](https://imagekit.io/)
- [Unsplash](https://unsplash.com/) photographers for inspirational imagery
- Open-source maintainers powering this ecosystem

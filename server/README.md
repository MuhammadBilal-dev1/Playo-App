# ⚙️ PlaySpace Server

### **Backend Engineering & Scalable API Architecture**

---

## 🏗️ Architectural Core

> **System Design:** A stateless, RESTful API architecture built on `Node.js` and `Express.js`, specifically engineered for high-concurrency sports booking environments.

- **Atomic Transaction Logic:** Implementation of custom logic to ensure slot bookings are atomic, preventing double-bookings and maintaining data integrity at the database level.
- **Role-Based Access Control (RBAC):** Granular middleware-driven security layers that distinguish between `SuperAdmin` (Venue Owners) and `Players` (End-Users).
- **Scalable Document Modeling:** Leveraging `Mongoose` for flexible, schema-based modeling of complex sports data, including multi-sport venue structures and dynamic time-slots.

---

## 🔐 Security & Optimization

### 🛡️ Enterprise-Grade Authentication

- **JWT Implementation:** Stateless authentication using `JSON Web Tokens` for secure, cross-platform session management between the Native App and the PWA.
- **Secure Middleware:** Custom auth-guards that intercept every sensitive request to validate tokens and user permissions.

### 🚀 Performance Engineering

- **CORS Configuration:** Environment-aware Cross-Origin Resource Sharing (CORS) setup to allow secure communication with the Vercel-hosted frontend.
- **Query Optimization:** Indexed MongoDB queries to ensure sub-second response times even with large datasets of venues and matches.

---

## 📂 Backend Modular Structure

---

```
server/
├── 🛠️ controllers/    # Business Logic: Handlers for Users, Games, and Venues
├── 📜 models/         # Data Layer: Mongoose schemas & Validation logic
├── 🛤️ routes/         # API Gateway: RESTful endpoint definitions
├── 🛡️ middleware/     # Security Layer: JWT Auth & RBAC guards
├── 🧪 utils/          # Helpers: Time-slot generators & Error handlers
└── 🚀 index.js        # Entry Point: Vercel serverless configuration
```

---

## 📊 API Endpoints (Quick Overview)

---

| Category | Endpoint           | Method | Purpose                                         |
| -------- | ------------------ | ------ | ----------------------------------------------- |
| Auth     | /api/auth/register | POST   | User onboarding & RBAC assignment               |
| Venues   | /api/venues        | GET    | Geo-spatial retrieval of sports venues          |
| Slots    | /api/slots/:id     | GET    | Real-time availability check for specific dates |
| Bookings | /api/book          | POST   | Atomic slot reservation engine                  |

## 🛠️ Infrastructure & Deployment

---

- Database: Hosted on MongoDB Atlas for global availability and automated scaling.
- Hosting: Deployed as Serverless Functions on Vercel, ensuring high availability without the overhead of managing raw servers.
- Environment Safety: Strict usage of .env variables for sensitive keys (MONGO_URI, JWT_SECRET).

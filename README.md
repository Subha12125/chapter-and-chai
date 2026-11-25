# Chapter & Chai — Online Book Store

A full-stack MERN online bookstore web application featuring a curated storefront, search and genre filtering, cart and checkout workflow, JWT-based authentication, order tracking, and a seller/admin dashboard for managing inventory and orders.

## Live Deployments

- **Frontend (Vercel):** https://online-book-store-puce-theta.vercel.app/
- **Backend API (Render):** https://online-book-store-1-xfg0.onrender.com
- **Repository:** https://github.com/Subha12125/chapter-and-chai

## Features

- **Storefront & Catalog:** Curated home sections (Hero, Collections, Value Props, Testimonials, Newsletter), detailed book view modal, and live search/filtering by title, author, and genre.
- **Shopping Cart & Checkout:** Persistent cart state, quantity updates, and parcel checkout flow.
- **User Authentication & Profiles:** Registration, sign-in, JWT authentication, profile management, and password reset support.
- **Order Tracking:** Customer order history and status visibility.
- **Seller / Admin Dashboard:** Dedicated seller login and dashboard for adding/updating/deleting books, monitoring stock, and managing customer order statuses.

## Tech Stack

- **Frontend (`Client/bookstore`):** React 19, Tailwind CSS, React Hot Toast, Create React App
- **Backend (`Server`):** Node.js, Express 5, MongoDB & Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`
- **Hosting:** Vercel (Client) & Render (Server)

## Project Structure

```text
.
├── Client/
│   └── bookstore/          # React frontend (CRA + Tailwind CSS)
│       ├── public/         # Static assets and index.html
│       ├── src/
│       │   ├── Assets/     # Storefront images & branding
│       │   ├── Components/ # Auth, cart, common, home, and product components
│       │   ├── Context/    # AuthContext and CartContext
│       │   ├── Pages/      # Home, Orders, and AdminDashboard pages
│       │   └── Services/   # API service wrappers
│       └── vercel.json     # Vercel build & environment config
├── Server/                 # Express REST API & MongoDB models
│   ├── Config/             # Database connection config
│   ├── Controllers/        # Route handlers (auth, book, cart, order)
│   ├── Middleware/         # Auth, admin, and error-handling middleware
│   ├── Models/             # Mongoose schemas (User, Book, Cart, Order)
│   ├── Routes/             # Express route definitions
│   ├── Utils/              # JWT token helper
│   ├── seedAdmin.js        # Demo admin user seed script
│   └── server.js           # Express server entry point
├── Tests/                  # Backend, frontend, and integration test placeholders
└── render.yaml             # Render deployment blueprint
```

## Getting Started (Local Development)

### Prerequisites

- Node.js (v18+ recommended) and npm
- A MongoDB instance (MongoDB Atlas or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/Subha12125/chapter-and-chai.git
cd chapter-and-chai
```

### 2. Backend Setup (`Server`)

```bash
cd Server
npm install
```

Create a `.env` file in `Server/` (see `Server/.env.example` for reference):

```env
PORT=5050
MONGO_DB_URI=mongodb://127.0.0.1:27017/online-bookstore # or your MongoDB Atlas connection string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

The API server will run on `http://localhost:5050`.

*(Optional)* Seed a demo admin account:

```bash
node seedAdmin.js
```

### 3. Frontend Setup (`Client/bookstore`)

Open a new terminal from the project root:

```bash
cd Client/bookstore
npm install
```

Ensure `Client/bookstore/.env` points to your local backend:

```env
REACT_APP_API_URL=http://localhost:5050/api
```

Start the React development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoints Overview

Base URL: `/api`

| Resource | Endpoints |
| --- | --- |
| **Auth** (`/api/auth`) | `POST /register`, `POST /login`, `POST /forgot-password`, `POST /reset-password/:token`, `GET /profile`, `PUT /profile`, `GET /users` (Admin), `DELETE /users/:id` (Admin) |
| **Books** (`/api/books`) | `GET /`, `POST /` (Admin), `PUT /:id` (Admin), `DELETE /:id` (Admin) |
| **Cart** (`/api/cart`) | `GET /` (Auth), `POST /` (Auth), `DELETE /:bookId` (Auth) |
| **Orders** (`/api/orders`) | `POST /` (Auth), `GET /my-orders` (Auth), `GET /admin/all` (Admin), `PUT /admin/status/:id` (Admin) |

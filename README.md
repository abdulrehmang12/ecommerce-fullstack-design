# ecommerce-fullstack-design

A full-stack eCommerce web app with responsive React frontend and Express backend.

## Week 1-3 Status

- Week 1: Responsive desktop/mobile pages completed.
- Week 2: Dynamic backend API integration completed.
- Week 3: JWT auth, protected admin CRUD, cart persistence, and deployment templates completed.

## Features

- Responsive home, listing, details, and cart pages.
- Dynamic products from backend API.
- Search and category filtering.
- Cart add/remove/update persisted in localStorage.
- JWT login/signup flow.
- Protected admin panel for product create/edit/delete.
- Admin-only backend protection for product/user mutations.
- Password reset flow with reset token request and reset endpoint.
- MongoDB persistence with Mongoose models.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS
- Backend: Node.js, Express
- Auth: JWT + bcryptjs
- Data: MongoDB + Mongoose

## Project Structure

```text
backend/
  config/db.js
  data/products.js
  models/
  server.js
frontend/
  src/
    api/
    components/
    pages/
    utils/
server.js
render.yaml
```

## Local Setup

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

Create `backend/.env` with:

```env
PORT=5000
JWT_SECRET=replace-with-a-strong-random-secret
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_fullstack_design
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Frontend runs at `http://localhost:3000`.

## Demo Admin Credentials

- Email: `admin@estore.com`
- Password: `admin123`

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/request-password-reset`
- `POST /api/auth/reset-password`

### Admin Users (admin)

- `POST /api/admin/users`
- `GET /api/admin/users`

### Products

- `GET /api/products`
- `GET /api/products/categories`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

## Deployment (Render)

A deployment template is included in `render.yaml`:

- `ecommerce-api` web service (backend)
- `ecommerce-frontend` static site (frontend)

After creating services on Render, set the static site env var:

- `REACT_APP_API_URL=https://<your-api-service>.onrender.com/api`

Set backend env vars on Render:

- `JWT_SECRET`
- `MONGODB_URI`

## Notes

- Admin bootstrap user is seeded if no users exist:
  - Email: `admin@estore.com`
  - Password: `admin123`
- Demo walkthrough script is available in `DEMO_SCRIPT.md`.

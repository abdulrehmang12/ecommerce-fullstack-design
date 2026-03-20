# Ecommerce Fullstack Demo Script (3-5 minutes)

## 1) Intro (20-30 sec)
- "This is my MERN ecommerce project built in internship phases."
- "Week 1 covers responsive UI and user flow. Week 2 adds backend API integration. Week 3 adds auth, admin controls, and deployment readiness."

## 2) Frontend Walkthrough (60-90 sec)
- Open home page and show responsive layout.
- Scroll hero, featured products, categories, and footer.
- Open products page and demonstrate:
  - category filtering
  - sorting
  - product detail navigation
- Open a product detail page and click Add to Cart.
- Open cart page and show quantity updates and remove flow.

## 3) Auth Flow (45-60 sec)
- Open login page.
- Login with demo admin account:
  - Email: admin@estore.com
  - Password: admin123
- Show navbar auth state changes after login.
- Logout once, then show signup quickly (optional), and login again.

## 4) Password Reset Flow (45-60 sec)
- In login page, click Forgot password.
- Enter user email and request reset token.
- Show returned demo token.
- Enter token + new password and submit reset.
- Return to login and sign in with new password.

## 5) Admin Panel (60-90 sec)
- Navigate to admin panel route.
- Show protected access (admin-only).
- Product CRUD demo:
  - create one product
  - edit the same product
  - delete it
- User management demo:
  - create a new customer/admin user
  - show users table with roles

## 6) Backend + Mongo Proof (30-45 sec)
- Show backend terminal running.
- Mention MongoDB connection via MONGODB_URI.
- Briefly show API route examples in Postman/Thunder Client:
  - GET /api/products
  - POST /api/auth/login
  - POST /api/admin/users (with admin token)

## 7) Deployment/Wrap-up (20-30 sec)
- Show environment templates and deployment config.
- "Project is ready to deploy with separate frontend and backend services."
- "This demonstrates full-stack functionality, role-based security, and responsive UI implementation."

## Optional Closing Line
- "Given more time, I would add order placement, payment integration, and email-based password reset delivery."

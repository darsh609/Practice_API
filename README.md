
# 🍕 Food Ordering & Cart Management System

A **full-stack food ordering application** built using **React, Node.js, Express, and MongoDB**, supporting **user & admin roles**, cart management, and order lifecycle handling.

---

## 🚀 Live Links

* **Frontend (React)**
  👉 [https://practice-api.vercel.app/](https://practice-api.vercel.app/)

* **Backend (Node + Express)**
  👉 [https://practice-api-419w.onrender.com/](https://practice-api-419w.onrender.com/)

---

## 🧠 Project Overview

This project simulates a real-world **food ordering platform** where:

* Users can browse menu items
* Add/remove products from cart
* Place orders and track order status
* Admins can manage products and orders

The focus was on **clean API design**, **role-based access**, and **realistic e-commerce flows**.

---

## ✨ Features

### 👤 User Features

* View menu items
* Add items to cart
* Increase / decrease quantity using `+ / -`
* Clear cart
* Place orders
* View **My Orders**
* Cancel order (if allowed)

---

### 🛠 Admin Features

* Admin Dashboard
* Add new products
* Update product details (price, inventory, availability)
* Toggle product availability
* View **All Orders**
* Cancel any order
* Mark order as **RECEIVED** (admin-only)

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control

  * `USER`
  * `ADMIN`
* Protected routes for cart, orders, and admin operations

---

## 🧩 Tech Stack

### Frontend

* React
* Axios
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### Deployment

* Frontend: **Vercel**
* Backend: **Render**

---

## 📦 API Highlights

### Cart APIs

* `POST /cart/add`
* `POST /cart/reduce`
* `DELETE /cart/remove/:productId`
* `DELETE /cart/clear`
* `GET /cart`

### Order APIs

* `POST /orders`
* `GET /orders/my-orders`
* `PUT /orders/:orderId/cancel`
* `PUT /orders/:orderId/received` (Admin)

### Product APIs (Admin)

* `POST /products/add`
* `PATCH /products/:id`
* `GET /products/menu`

---

## 🖥 Admin Pages

* **Admin Dashboard**

  * Product management
  * Inventory control
  * Availability toggle

* **Admin Orders Page** (`/admin/orders`)

  * View all user orders
  * Cancel orders
  * Mark orders as received

---

## 🧪 Sample Admin Workflow

1. Login as Admin
2. Add / update products
3. View all orders
4. Cancel invalid orders
5. Mark delivered orders as RECEIVED

---

## 🛠 Environment Variables

### Frontend

```env
REACT_APP_BASE_URL=https://practice-api-419w.onrender.com
REACT_APP_API_KEY=your_api_key
```

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
```

---

## 🎯 What Makes This Project Stand Out

* Real-world cart logic using incremental APIs
* Clean separation of user vs admin responsibilities
* Proper REST API design
* Scalable backend structure
* Deployed and production-ready

---

## 👨‍💻 Author

**Darsh Kumar**
Final-year B.Tech student, NIT Warangal
Interested in backend systems, APIs, and scalable applications

---

## ⭐ Future Improvements

* Pagination for orders
* Product image upload
* Order status timeline
* Payment gateway integration
* Swagger API documentation

---



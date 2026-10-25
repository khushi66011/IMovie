# 🎬 IMovies — Premier Cinema Ticket Booking Application (MERN)

A full-stack cinema ticketing web application built with **React.js**, **Bootstrap 5**, **Node.js**, **Express.js**, **MongoDB (Mongoose)**, **JWT Authentication**, and **bcryptjs**.

---

## 🌟 Key Features

1. **User Authentication (JWT & bcryptjs)**
   - Secure customer registration & login with password hashing.
   - JWT authorization token stored in client with automatic session restoration.
   - User profile dropdown with easy 1-click logout.
   - Built-in **"Quick Demo Account Fill"** for instant 1-click testing (`rajesh@example.com` / `password123`).

2. **Movie Catalog & Live IST Clock**
   - Live Indian Standard Time (IST) clock ticking in real-time in the Navbar with an active pulse indicator.
   - Real-time search by movie title, director, language, or cast.
   - Genre filter pills ("All", "Sci-Fi", "Action", "Drama", "Thriller", etc.).
   - Prices displayed in Indian Rupees (**₹**) across all tiers and screens.
   - Trending blockbuster hero banner with quick booking shortcut.

3. **Interactive Cinema Seat Matrix**
   - Curved panoramic cinema screen representation with ambient glow ("🎬 SCREEN THIS WAY 🎬").
   - Rows **A to E**, Seats **1 to 8**:
     - **VIP Recliners (Rows A, B)**: ₹450 / seat (Golden accent with spatial sweetspot).
     - **Standard Classic (Rows C, D, E)**: ₹250 / seat (Cyan accent).
   - Real-time seat locking: occupied seats are automatically disabled and locked against double booking.
   - Concurrency collision protection on backend prevents race conditions.

4. **Checkout & Real-Time GST Calculation**
   - Real-time financial calculation: Subtotal + **18% GST** (Goods and Services Tax) = Grand Total.
   - Multiple payment options: UPI, Credit Card, Debit Card, Net Banking.
   - Upon confirmation, displays the exact required success notification:
     > **"Congratulations! Your ticket has been booked."**
   - Generates a digital printable **E-Ticket** with:
     - Scannable verification **QR Code** containing booking reference and seat details.
     - Perforated ticket styling with authentic side notches and dash lines.
     - One-click **"Print / Save PDF"** action pre-configured with print stylesheets.

5. **Booking History**
   - View past confirmed reservations with movie posters, showtimes, seats reserved, and total amount paid.
   - Instant "View E-Ticket" button to inspect or re-print any past digital admission pass.

---

## 📁 Project Structure

```
IMovies/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx            # Sign In / Register dialog
│   │   │   ├── BookingHistoryModal.jsx  # Past confirmed bookings list
│   │   │   ├── ETicketModal.jsx         # Printable pass with QR code
│   │   │   ├── LiveClock.jsx            # Real-time IST clock (Asia/Kolkata)
│   │   │   ├── MovieCard.jsx            # Cinema movie display card
│   │   │   ├── MovieGrid.jsx            # Responsive catalog grid
│   │   │   ├── Navbar.jsx               # Header with logo, IST clock, user menu
│   │   │   ├── SearchFilter.jsx         # Search bar + genre buttons
│   │   │   └── SeatMatrixModal.jsx      # Cinema screen & Rows A-E (1-8) matrix
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # User auth state provider
│   │   ├── services/
│   │   │   └── api.js                   # REST API client
│   │   ├── App.jsx                      # Root application layout
│   │   ├── index.css                    # Dark cinema styling & print CSS
│   │   └── index.jsx                    # React 18 bootstrap mount
│   ├── index.html
│   ├── package.json
│   └── vite.config.js                   # Vite config with /api proxy to port 5000
│
└── server/
    ├── config/
    │   └── db.js                        # MongoDB / MongoMemoryServer config & seed
    ├── middleware/
    │   └── auth.js                      # JWT verification middleware
    ├── models/
    │   ├── Booking.js                   # Booking schema with seats, GST, QR data
    │   ├── Movie.js                     # Movie schema with pricing, showtimes
    │   └── User.js                      # User schema with bcrypt password hashing
    ├── routes/
    │   ├── authRoutes.js                # /api/auth (register, login, me)
    │   ├── bookingRoutes.js             # /api/bookings (create, my-bookings, details)
    │   └── movieRoutes.js               # /api/movies (list, details, seats occupancy, seed)
    ├── seed/
    │   └── seedMovies.js                # Rich initial Bollywood/Hollywood movie catalog
    ├── .env                             # Environment configuration
    ├── package.json
    └── server.js                        # Express server entry point
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Start the Backend Server
```bash
cd IMovies/server
npm install
npm start
```
*The server will start on `http://localhost:5000`. If a local MongoDB instance is not detected, it automatically initializes a built-in in-memory MongoDB instance and auto-seeds initial movies and a demo user!*

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd IMovies/client
npm install
npm run dev
```
*The client will open on `http://localhost:3000` with hot module reloading and API proxying.*

---

## 🔑 Demo Account Credentials
- **Email:** `rajesh@example.com`
- **Password:** `password123`
*(Or simply click **"Quick Demo Account Fill"** inside the Sign In modal)*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new customer | No |
| `POST` | `/api/auth/login` | Login & receive JWT | No |
| `GET` | `/api/auth/me` | Fetch logged-in customer profile | Yes |
| `GET` | `/api/movies` | Fetch movies with optional `?search=&genre=` | No |
| `GET` | `/api/movies/:id` | Fetch single movie details | No |
| `GET` | `/api/movies/:id/seats` | Real-time booked seats `?date=&showtime=` | No |
| `POST` | `/api/bookings` | Reserve seats & create booking (Subtotal + 18% GST) | Yes |
| `GET` | `/api/bookings/my-bookings` | Retrieve user booking history | Yes |
| `GET` | `/api/health` | Server health check | No |


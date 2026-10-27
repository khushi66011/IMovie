# 🎬 IMovies — Premier Full-Stack Cinema Ticket Booking Platform (MERN)

A modern, production-ready cinema ticketing web application built with the **MERN Stack**:
- **Frontend**: React.js 18, Vite, Bootstrap 5, Bootstrap Icons, Canvas Confetti, QRCode.react
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs

---

## 🌟 Key Features

1. **User Authentication (JWT & bcryptjs)**
   - Secure customer registration & login with password hashing.
   - JWT authorization token stored in client with automatic session restoration.
   - User profile dropdown with easy 1-click logout.
   - Built-in **"Quick Demo Account Fill"** (`rajesh@example.com` / `password123`) for instant evaluation.

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

```text
IMovies/
├── client/                     # React Frontend
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Navbar, MovieCard, SeatMatrix, ETicket, History, Auth
│   │   ├── context/            # AuthContext (JWT state & user persistence)
│   │   ├── services/           # Axios/Fetch API client wrapper
│   │   ├── App.jsx             # Main dashboard & modal controllers
│   │   ├── index.css           # Custom cinema glassmorphism & print CSS
│   │   └── index.jsx           # Application entry point
│   ├── package.json
│   ├── vercel.json             # Vercel SPA routing configuration
│   └── vite.config.js          # Vite config & API reverse proxy
├── server/                     # Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection (Atlas & Auto-Fallback)
│   ├── middleware/
│   │   └── auth.js             # JWT bearer verification middleware
│   ├── models/
│   │   ├── User.js             # User Mongoose schema
│   │   ├── Movie.js            # Movie Mongoose schema
│   │   └── Booking.js          # Booking & ticket schema
│   ├── routes/
│   │   ├── authRoutes.js       # Register, Login, Me
│   │   ├── movieRoutes.js      # Catalog, filters, real-time seat locks
│   │   └── bookingRoutes.js    # Reservation, GST calculation, ticket generation
│   ├── seed/
│   │   └── seedMovies.js       # Curated blockbuster movie catalog
│   ├── package.json
│   └── server.js               # Express application entry & static serving
├── render.yaml                 # Render Blueprint for 1-click cloud deployment
├── package.json                # Root monorepo build & start scripts
└── README.md                   # Documentation & Deployment Guide
```

---

## 🚀 Deployment Guide (100% Free)

### Option 1: Unified 1-Click Deployment on Render (Recommended)

Render can build both the React frontend and Express backend into a single Web Service!

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy IMovies"
   git push origin main
   ```

2. **Create Web Service on Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com/) and click **"New" → "Web Service"**.
   - Connect your GitHub repository: `khushi66011/IMovie`.
   - Settings:
     - **Name**: `imovies-cinema` (or any custom name)
     - **Environment**: `Node`
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: `Free`

3. **Add Environment Variables**:
   Under **Environment Variables**, add:
   - `MONGO_URI`: `mongodb+srv://bhawsarkhushi983_db_user:%24Khushi25%24@cluster0.kxgvvnn.mongodb.net/imovies?compressors=zlib`
   - `JWT_SECRET`: `imovies_cinema_jwt_secret_key_2026_super_secure`
   - `NODE_ENV`: `production`
   - `PORT`: `5000`

4. Click **"Deploy Web Service"**.
   - Render will run `npm run build` (compiling the React app into `client/dist`).
   - Express will serve the API at `/api` and the React frontend on the root URL `https://your-app.onrender.com`.

---

### Option 2: Frontend on Vercel + Backend on Render

If you prefer deploying the frontend separately on Vercel:

1. **Deploy Backend on Render**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
   - Copy your Render backend URL (e.g. `https://imovies-server.onrender.com`).

2. **Deploy Frontend on Vercel**:
   - Go to [vercel.com](https://vercel.com/) → **"Add New Project"**.
   - Import your GitHub repo `khushi66011/IMovie`.
   - Set **Root Directory** to `client`.
   - Framework Preset: `Vite`.
   - Under **Environment Variables**, add:
     - `VITE_API_URL`: `https://imovies-server.onrender.com/api`
   - Click **"Deploy"**.

---

## 💻 Local Development

### 1. Start Both Frontend & Backend:
```bash
npm run install:all
npm start
```

### 2. Or Run Separately:

**Backend:**
```bash
cd server
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 👤 Demo Credentials

- **Email**: `rajesh@example.com`
- **Password**: `password123`
- Or use the **"Quick Demo Account Fill"** button inside the Sign In modal!

---

## 🎟️ Seat Matrix & Pricing

| Tier | Rows | Price per Seat | Features |
|---|---|---:|---|
| **VIP Recliner** | Rows A & B | ₹450 | Luxury leather recliners, prime Dolby sweetspot |
| **Standard Classic** | Rows C, D, E | ₹250 | High-comfort seating, wide sightlines |

*Note: All transactions automatically itemize and calculate 18% Indian GST with instant verifiable QR E-Tickets.*

---

## 📜 License
MIT License. Created for IMovies Cinema Ticketing Platform.

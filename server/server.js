require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger (Development)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// Server Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'IMovies Cinema Ticketing API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// In production, serve the React frontend build (Express 4 & 5 compatible)
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.originalUrl.startsWith('/api')) {
    return res.sendFile(path.resolve(clientDistPath, 'index.html'));
  }
  next();
});

// 404 Handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Unhandled Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error.'
  });
});

// Initialize Database & Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(` 🎬  IMovies Cinema Server running on port ${PORT}`);
      console.log(` 🚀  API Base URL: http://localhost:${PORT}/api`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

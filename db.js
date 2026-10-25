const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Movie = require('../models/Movie');
const User = require('../models/User');
const Booking = require('../models/Booking');
const moviesData = require('../seed/seedMovies');

let mongoMemoryServerInstance = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    let connected = false;

    if (mongoUri) {
      try {
        console.log(`[DB] Attempting connection to configured MONGO_URI: ${mongoUri.replace(/:[^:@]+@/, ':***@')}...`);
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
        console.log(`[DB] Successfully connected to MongoDB: ${mongoose.connection.host}`);
        connected = true;
      } catch (uriErr) {
        console.warn(`[DB] Warning: Unable to connect to specified MONGO_URI (${uriErr.message}). Falling back...`);
      }
    }

    if (!connected) {
      // Try local default MongoDB
      try {
        console.log(`[DB] Checking local MongoDB instance at mongodb://127.0.0.1:27017/imovies...`);
        await mongoose.connect('mongodb://127.0.0.1:27017/imovies', { serverSelectionTimeoutMS: 2000 });
        console.log(`[DB] Connected to local MongoDB: mongodb://127.0.0.1:27017/imovies`);
        connected = true;
      } catch (localErr) {
        console.log(`[DB] Local MongoDB not running. Initializing built-in MongoMemoryServer...`);
        try {
          const { MongoMemoryServer } = require('mongodb-memory-server');
          mongoMemoryServerInstance = await MongoMemoryServer.create({
            instance: { dbName: 'imovies' }
          });
          mongoUri = mongoMemoryServerInstance.getUri();
          await mongoose.connect(mongoUri);
          console.log(`[DB] Connected to in-memory MongoDB instance: ${mongoUri}`);
          connected = true;
        } catch (memErr) {
          console.error(`[DB] Failed to start in-memory MongoDB:`, memErr.message);
          throw memErr;
        }
      }
    }

    // Auto-seed initial movie catalog if empty
    const movieCount = await Movie.countDocuments();
    if (movieCount === 0) {
      console.log(`[DB] Movie collection is empty. Auto-seeding initial blockbuster catalog...`);
      await Movie.insertMany(moviesData);
      console.log(`[DB] Successfully seeded ${moviesData.length} movies.`);
    } else {
      console.log(`[DB] Movie catalog ready with ${movieCount} titles.`);
    }

    // Auto-seed demo user 'rajesh@example.com' for instant login testing
    const demoUser = await User.findOne({ email: 'rajesh@example.com' });
    if (!demoUser) {
      console.log(`[DB] Seeding default demo customer account (rajesh@example.com)...`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      const newDemoUser = await User.create({
        name: 'Rajesh Sharma',
        email: 'rajesh@example.com',
        password: hashedPassword,
        phone: '+91 98765 43210'
      });

      // Also create an initial confirmed booking for demonstration
      const sampleMovie = await Movie.findOne({ title: 'Kalki 2898 AD' }) || await Movie.findOne();
      if (sampleMovie) {
        const todayStr = new Date().toISOString().split('T')[0];
        const initialBookingId = `IMV-${todayStr.replace(/-/g, '')}-DEMO1`;
        const initialSeats = [
          { seatNumber: 'A4', tier: 'VIP', price: 450 },
          { seatNumber: 'A5', tier: 'VIP', price: 450 }
        ];
        const subtotal = 900;
        const gst = 162;
        const totalAmount = 1062;

        await Booking.create({
          bookingId: initialBookingId,
          user: newDemoUser._id,
          userName: newDemoUser.name,
          userEmail: newDemoUser.email,
          movie: sampleMovie._id,
          movieTitle: sampleMovie.title,
          moviePoster: sampleMovie.poster,
          movieCertificate: sampleMovie.certificate,
          showDate: todayStr,
          showtime: '06:00 PM',
          screen: sampleMovie.screen,
          seats: initialSeats,
          subtotal,
          gst,
          totalAmount,
          paymentMethod: 'UPI',
          paymentStatus: 'CONFIRMED',
          qrCodeData: JSON.stringify({
            bookingId: initialBookingId,
            movie: sampleMovie.title,
            seats: ['A4', 'A5'],
            total: `₹${totalAmount}`,
            customer: newDemoUser.name,
            verified: true
          })
        });
        console.log(`[DB] Seeded initial confirmed ticket booking for demo user (${initialBookingId}).`);
      }
    }
  } catch (error) {
    console.error(`[DB] MongoDB Initialization Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

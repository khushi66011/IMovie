const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Reserve seats, calculate subtotal + 18% GST, and create confirmed ticket booking
// @access  Private (JWT Required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { movieId, showDate, showtime, seats, paymentMethod = 'UPI' } = req.body;

    if (!movieId || !showDate || !showtime) {
      return res.status(400).json({
        success: false,
        message: 'Movie, show date, and showtime are required.'
      });
    }

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one seat to proceed with booking.'
      });
    }

    // Retrieve movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Selected movie could not be found.'
      });
    }

    // Retrieve user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    // Extract seat numbers and validate tier pricing
    const requestedSeatNumbers = [];
    const validatedSeats = [];

    for (const seat of seats) {
      const seatNo = (seat.seatNumber || '').toUpperCase().trim();
      if (!/^[A-E][1-8]$/.test(seatNo)) {
        return res.status(400).json({
          success: false,
          message: `Invalid seat format: "${seatNo}". Rows must be A-E and seats 1-8.`
        });
      }

      if (requestedSeatNumbers.includes(seatNo)) {
        return res.status(400).json({
          success: false,
          message: `Duplicate seat "${seatNo}" in booking request.`
        });
      }
      requestedSeatNumbers.push(seatNo);

      const row = seatNo.charAt(0);
      const isVIP = row === 'A' || row === 'B';
      const tier = isVIP ? 'VIP' : 'Standard';
      const price = isVIP ? 450 : 250;

      validatedSeats.push({
        seatNumber: seatNo,
        tier,
        price
      });
    }

    // Concurrency / Collision Check: Verify seats are not already reserved for this movie, date, and showtime
    const existingConflictBookings = await Booking.find({
      movie: movieId,
      showDate: showDate,
      showtime: showtime,
      paymentStatus: 'CONFIRMED',
      'seats.seatNumber': { $in: requestedSeatNumbers }
    });

    if (existingConflictBookings.length > 0) {
      const conflictedSeats = [];
      existingConflictBookings.forEach(b => {
        b.seats.forEach(s => {
          if (requestedSeatNumbers.includes(s.seatNumber)) {
            conflictedSeats.push(s.seatNumber);
          }
        });
      });
      return res.status(409).json({
        success: false,
        message: `Seats [${conflictedSeats.join(', ')}] are already reserved for this showtime. Please select alternative seats.`
      });
    }

    // Financial Calculation: Subtotal + 18% GST (Indian Goods and Services Tax)
    const subtotal = validatedSeats.reduce((sum, s) => sum + s.price, 0);
    const gstRate = 0.18;
    const gst = Math.round(subtotal * gstRate * 100) / 100;
    const totalAmount = Math.round((subtotal + gst) * 100) / 100;

    // Generate unique alpha-numeric booking identifier
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const bookingId = `IMV-${datePrefix}-${randomHex}`;

    // Generate verifiable QR code payload
    const qrPayload = JSON.stringify({
      bookingId,
      movie: movie.title,
      screen: movie.screen,
      date: showDate,
      time: showtime,
      seats: requestedSeatNumbers,
      total: `₹${totalAmount}`,
      customer: user.name,
      verified: true
    });

    const newBooking = new Booking({
      bookingId,
      user: user._id,
      userName: user.name,
      userEmail: user.email,
      movie: movie._id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      movieCertificate: movie.certificate || 'UA',
      showDate,
      showtime,
      screen: movie.screen || 'Audi 1 - Dolby Cinema 4K Laser',
      seats: validatedSeats,
      subtotal,
      gst,
      totalAmount,
      paymentMethod,
      paymentStatus: 'CONFIRMED',
      qrCodeData: qrPayload
    });

    await newBooking.save();

    // Exact required confirmation message: "Congratulations! Your ticket has been booked."
    res.status(201).json({
      success: true,
      message: 'Congratulations! Your ticket has been booked.',
      booking: newBooking
    });
  } catch (error) {
    console.error('[Booking POST Error]:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while confirming your booking. Please try again.'
    });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Retrieve all past confirmed bookings for the logged-in user
// @access  Private (JWT Required)
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('[My Bookings GET Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve your booking history.'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get detailed digital ticket by booking ID
// @access  Private (JWT Required)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or unauthorized access.'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('[Booking ID GET Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking ticket details.'
    });
  }
});

module.exports = router;

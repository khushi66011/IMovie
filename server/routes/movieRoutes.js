const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const moviesData = require('../seed/seedMovies');

// @route   GET /api/movies
// @desc    Get all movies with optional search & genre filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { director: searchRegex },
        { cast: searchRegex },
        { language: searchRegex }
      ];
    }

    if (genre && genre !== 'All' && genre.trim()) {
      query.genre = { $in: [new RegExp(`^${genre.trim()}$`, 'i')] };
    }

    const movies = await Movie.find(query).sort({ rating: -1, createdAt: -1 });
    
    // Also extract all unique genres for easy filter buttons on client
    const allMovies = await Movie.find({}, 'genre');
    const genreSet = new Set(['All']);
    allMovies.forEach(m => {
      if (Array.isArray(m.genre)) {
        m.genre.forEach(g => genreSet.add(g));
      }
    });

    res.json({
      success: true,
      count: movies.length,
      genres: Array.from(genreSet),
      movies
    });
  } catch (error) {
    console.error('[Movies GET Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve movie catalog.'
    });
  }
});

// @route   GET /api/movies/:id
// @desc    Get a single movie by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found.'
      });
    }
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    console.error('[Movie GET ID Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve movie details.'
    });
  }
});

// @route   GET /api/movies/:id/seats
// @desc    Get real-time booked/reserved seats for a specific movie, date, and showtime
// @access  Public
router.get('/:id/seats', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, showtime } = req.query;

    if (!date || !showtime) {
      return res.status(400).json({
        success: false,
        message: 'Both date and showtime parameters are required to check seat occupancy.'
      });
    }

    // Find all confirmed bookings for this movie, date, and showtime
    const bookings = await Booking.find({
      movie: id,
      showDate: date,
      showtime: showtime,
      paymentStatus: 'CONFIRMED'
    }).select('seats');

    const bookedSeats = [];
    bookings.forEach(b => {
      if (Array.isArray(b.seats)) {
        b.seats.forEach(s => {
          if (s.seatNumber) bookedSeats.push(s.seatNumber);
        });
      }
    });

    res.json({
      success: true,
      movieId: id,
      date,
      showtime,
      bookedSeats: Array.from(new Set(bookedSeats))
    });
  } catch (error) {
    console.error('[Movie Seats Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve seat occupancy status.'
    });
  }
});

// @route   POST /api/movies/seed
// @desc    Reset and re-seed the movie catalog
// @access  Public (Utility)
router.post('/seed', async (req, res) => {
  try {
    await Movie.deleteMany({});
    const inserted = await Movie.insertMany(moviesData);
    res.json({
      success: true,
      message: `Movie catalog re-seeded successfully with ${inserted.length} movies.`,
      movies: inserted
    });
  } catch (error) {
    console.error('[Movie Seed Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to re-seed movies.'
    });
  }
});

module.exports = router;

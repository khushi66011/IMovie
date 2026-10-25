const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true
    },
    genre: {
      type: [String],
      required: true,
      default: ['Action']
    },
    language: {
      type: String,
      required: true,
      default: 'Hindi'
    },
    rating: {
      type: Number,
      default: 8.5,
      min: 0,
      max: 10
    },
    duration: {
      type: String,
      required: true,
      default: '2h 30m'
    },
    synopsis: {
      type: String,
      required: true
    },
    director: {
      type: String,
      default: 'Director'
    },
    cast: {
      type: [String],
      default: []
    },
    poster: {
      type: String,
      required: true
    },
    banner: {
      type: String,
      required: true
    },
    standardPrice: {
      type: Number,
      default: 250
    },
    vipPrice: {
      type: Number,
      default: 450
    },
    showtimes: {
      type: [String],
      default: ['10:30 AM', '01:45 PM', '05:15 PM', '08:45 PM', '11:15 PM']
    },
    screen: {
      type: String,
      default: 'Audi 1 - Dolby Atmos 4K'
    },
    certificate: {
      type: String,
      default: 'UA'
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);

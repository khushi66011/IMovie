const mongoose = require('mongoose');

const bookingSeatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true,
      trim: true
    },
    tier: {
      type: String,
      enum: ['VIP', 'Standard'],
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    },
    moviePoster: {
      type: String,
      default: ''
    },
    movieCertificate: {
      type: String,
      default: 'UA'
    },
    showDate: {
      type: String,
      required: true
    },
    showtime: {
      type: String,
      required: true
    },
    screen: {
      type: String,
      default: 'Audi 1 - Dolby Atmos 4K'
    },
    seats: {
      type: [bookingSeatSchema],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'At least one seat must be selected']
    },
    subtotal: {
      type: Number,
      required: true
    },
    gst: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'],
      default: 'UPI'
    },
    paymentStatus: {
      type: String,
      enum: ['CONFIRMED', 'PENDING', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    qrCodeData: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SeatMatrixModal = ({ movie, isOpen, onClose, onBookingSuccess }) => {
  const { isAuthenticated, openAuthModal } = useAuth();

  // Rows and Columns definition
  const VIP_ROWS = ['A', 'B'];
  const STANDARD_ROWS = ['C', 'D', 'E'];
  const ALL_ROWS = [...VIP_ROWS, ...STANDARD_ROWS];
  const SEATS_PER_ROW = [1, 2, 3, 4, 5, 6, 7, 8];

  // Dates: Today, Tomorrow, Day After
  const dateOptions = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      dates.push({ iso, label });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize date & showtime when movie opens
  useEffect(() => {
    if (movie && isOpen) {
      if (dateOptions.length > 0) {
        setSelectedDate(dateOptions[0].iso);
      }
      if (movie.showtimes && movie.showtimes.length > 0) {
        setSelectedShowtime(movie.showtimes[0]);
      }
      setSelectedSeats([]);
      setErrorMessage('');
    }
  }, [movie, isOpen, dateOptions]);

  // Fetch booked seats whenever movie, date, or showtime changes
  useEffect(() => {
    if (!movie?._id || !selectedDate || !selectedShowtime || !isOpen) return;

    let isMounted = true;
    const fetchOccupancy = async () => {
      setLoadingSeats(true);
      setErrorMessage('');
      try {
        const res = await api.movies.getBookedSeats(movie._id, selectedDate, selectedShowtime);
        if (isMounted && res.success) {
          setBookedSeats(res.bookedSeats || []);
          // Deselect any seats that are now booked
          setSelectedSeats(prev => prev.filter(s => !(res.bookedSeats || []).includes(s.seatNumber)));
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch seat occupancy:', err);
        }
      } finally {
        if (isMounted) setLoadingSeats(false);
      }
    };

    fetchOccupancy();
    return () => { isMounted = false; };
  }, [movie, selectedDate, selectedShowtime, isOpen]);

  if (!isOpen || !movie) return null;

  // Toggle seat selection
  const handleSeatClick = (seatNumber, tier, price) => {
    if (bookedSeats.includes(seatNumber)) return;

    setErrorMessage('');
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.seatNumber === seatNumber);
      if (exists) {
        return prev.filter(s => s.seatNumber !== seatNumber);
      } else {
        if (prev.length >= 8) {
          setErrorMessage('Maximum 8 seats can be selected per transaction.');
          return prev;
        }
        return [...prev, { seatNumber, tier, price }];
      }
    });
  };

  // Financial calculations
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const gst = Math.round(subtotal * 0.18 * 100) / 100;
  const grandTotal = Math.round((subtotal + gst) * 100) / 100;

  // Checkout submission
  const handleProceedToBooking = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (selectedSeats.length === 0) {
      setErrorMessage('Please select at least one seat to proceed.');
      return;
    }

    setSubmittingBooking(true);
    setErrorMessage('');

    try {
      const response = await api.bookings.create({
        movieId: movie._id,
        showDate: selectedDate,
        showtime: selectedShowtime,
        seats: selectedSeats,
        paymentMethod
      });

      if (response.success && response.booking) {
        onBookingSuccess(response.booking, response.message);
      } else {
        setErrorMessage(response.message || 'Failed to complete booking.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Booking transaction failed. Please retry.');
      // Refresh seat occupancy
      try {
        const refresh = await api.movies.getBookedSeats(movie._id, selectedDate, selectedShowtime);
        if (refresh.success) setBookedSeats(refresh.bookedSeats || []);
      } catch (e) {
        console.error(e);
      }
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-2 p-md-3">
      <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered w-100 seat-modal-dialog">
        <div className="modal-content bg-dark text-light border-secondary-subtle rounded-4 shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="modal-header border-secondary-subtle px-4 py-3 bg-black bg-opacity-40">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="modal-title fw-bold text-white mb-0">{movie.title}</h5>
                <span className="badge bg-warning text-dark fw-bold">{movie.certificate || 'UA'}</span>
                <span className="badge bg-secondary-subtle text-light">{movie.language}</span>
              </div>
              <p className="text-secondary small mb-0">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                {movie.screen || 'Audi 1 - Dolby Atmos 4K Laser'}
              </p>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-3 p-md-4">
            {/* Date & Showtime Selector Controls */}
            <div className="showtime-date-panel p-3 rounded-4 mb-4 bg-black bg-opacity-30 border border-secondary-subtle">
              <div className="row g-3 align-items-center">
                {/* Date Picker */}
                <div className="col-12 col-md-5">
                  <label className="form-label text-secondary small fw-semibold mb-2">
                    <i className="bi bi-calendar-event text-warning me-1"></i> 1. Select Date
                  </label>
                  <div className="d-flex gap-2">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt.iso}
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold flex-fill ${
                          selectedDate === opt.iso
                            ? 'btn-warning text-dark shadow-sm'
                            : 'btn-outline-secondary text-light'
                        }`}
                        onClick={() => {
                          setSelectedDate(opt.iso);
                          setSelectedSeats([]);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Showtime Picker */}
                <div className="col-12 col-md-7">
                  <label className="form-label text-secondary small fw-semibold mb-2">
                    <i className="bi bi-clock-fill text-warning me-1"></i> 2. Select Showtime
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {(movie.showtimes || []).map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 font-monospace fw-semibold ${
                          selectedShowtime === time
                            ? 'btn-info text-dark shadow-sm'
                            : 'btn-outline-secondary text-light'
                        }`}
                        onClick={() => {
                          setSelectedShowtime(time);
                          setSelectedSeats([]);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger border-danger-subtle bg-danger-subtle text-danger-emphasis py-2 px-3 rounded-3 small mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-octagon-fill"></i>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Cinema Screen Curved Element */}
            <div className="cinema-screen-container text-center my-4">
              <div className="screen-curve-beam"></div>
              <div className="screen-curve">
                <span className="screen-label">🎬 SCREEN THIS WAY 🎬</span>
              </div>
            </div>

            {/* Dynamic Interactive Seat Matrix */}
            <div className="seat-matrix-wrapper my-4">
              {loadingSeats && (
                <div className="text-center py-2 mb-2">
                  <span className="spinner-border spinner-border-sm text-warning me-2" role="status"></span>
                  <span className="text-secondary small">Synchronizing real-time seat locks...</span>
                </div>
              )}

              {/* VIP Rows (A & B) */}
              <div className="tier-section mb-4">
                <div className="tier-header d-flex justify-content-between align-items-center mb-2 px-2">
                  <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
                    ⭐ VIP RECLINERS — ₹450
                  </span>
                  <span className="text-secondary small">Dolby Spatial Sweetspot</span>
                </div>

                <div className="d-flex flex-column gap-2 align-items-center">
                  {VIP_ROWS.map((rowLetter) => (
                    <div key={rowLetter} className="seat-row d-flex align-items-center gap-2">
                      <span className="row-label fw-bold text-warning">{rowLetter}</span>
                      <div className="seats-group d-flex gap-2">
                        {SEATS_PER_ROW.map((seatNum) => {
                          const seatCode = `${rowLetter}${seatNum}`;
                          const isBooked = bookedSeats.includes(seatCode);
                          const isSelected = selectedSeats.some(s => s.seatNumber === seatCode);

                          return (
                            <button
                              key={seatCode}
                              type="button"
                              disabled={isBooked}
                              title={`${seatCode} (VIP ₹450) - ${isBooked ? 'Reserved' : isSelected ? 'Selected' : 'Available'}`}
                              className={`seat-btn seat-vip ${
                                isBooked ? 'seat-booked' : isSelected ? 'seat-selected' : 'seat-available'
                              }`}
                              onClick={() => handleSeatClick(seatCode, 'VIP', 450)}
                            >
                              {isBooked ? (
                                <i className="bi bi-lock-fill" style={{ fontSize: '0.65rem' }}></i>
                              ) : isSelected ? (
                                <i className="bi bi-check-lg fw-bold"></i>
                              ) : (
                                seatNum
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <span className="row-label fw-bold text-warning">{rowLetter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aisle Divider */}
              <div className="aisle-divider my-3 d-flex align-items-center justify-content-center">
                <div className="aisle-line"></div>
                <span className="aisle-text text-secondary small px-3">WALKWAY AISLE</span>
                <div className="aisle-line"></div>
              </div>

              {/* Standard Rows (C, D, E) */}
              <div className="tier-section mb-3">
                <div className="tier-header d-flex justify-content-between align-items-center mb-2 px-2">
                  <span className="badge bg-info text-dark fw-bold px-3 py-1 rounded-pill">
                    🎟️ STANDARD CLASSIC — ₹250
                  </span>
                  <span className="text-secondary small">Rows C, D & E</span>
                </div>

                <div className="d-flex flex-column gap-2 align-items-center">
                  {STANDARD_ROWS.map((rowLetter) => (
                    <div key={rowLetter} className="seat-row d-flex align-items-center gap-2">
                      <span className="row-label fw-bold text-info">{rowLetter}</span>
                      <div className="seats-group d-flex gap-2">
                        {SEATS_PER_ROW.map((seatNum) => {
                          const seatCode = `${rowLetter}${seatNum}`;
                          const isBooked = bookedSeats.includes(seatCode);
                          const isSelected = selectedSeats.some(s => s.seatNumber === seatCode);

                          return (
                            <button
                              key={seatCode}
                              type="button"
                              disabled={isBooked}
                              title={`${seatCode} (Standard ₹250) - ${isBooked ? 'Reserved' : isSelected ? 'Selected' : 'Available'}`}
                              className={`seat-btn seat-standard ${
                                isBooked ? 'seat-booked' : isSelected ? 'seat-selected' : 'seat-available'
                              }`}
                              onClick={() => handleSeatClick(seatCode, 'Standard', 250)}
                            >
                              {isBooked ? (
                                <i className="bi bi-lock-fill" style={{ fontSize: '0.65rem' }}></i>
                              ) : isSelected ? (
                                <i className="bi bi-check-lg fw-bold"></i>
                              ) : (
                                seatNum
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <span className="row-label fw-bold text-info">{rowLetter}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seat Matrix Legend */}
            <div className="seat-legend d-flex flex-wrap justify-content-center gap-3 gap-md-4 py-2 border-top border-bottom border-secondary-subtle my-3">
              <div className="d-flex align-items-center gap-2">
                <span className="legend-indicator seat-available seat-vip"></span>
                <span className="small text-secondary">VIP (₹450)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="legend-indicator seat-available seat-standard"></span>
                <span className="small text-secondary">Standard (₹250)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="legend-indicator seat-selected"></span>
                <span className="small text-secondary">Selected</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="legend-indicator seat-booked"></span>
                <span className="small text-secondary">Booked / Locked</span>
              </div>
            </div>

            {/* Checkout Calculation & Confirmation Area */}
            <div className="checkout-summary-box p-3 p-md-4 rounded-4 bg-black bg-opacity-40 border border-secondary-subtle">
              <div className="row g-3 align-items-center">
                {/* Selected Seats List */}
                <div className="col-12 col-md-5">
                  <div className="text-secondary small mb-1 fw-semibold">Selected Seats:</div>
                  {selectedSeats.length === 0 ? (
                    <span className="text-muted fst-italic small">No seats selected yet. Click on available seats above.</span>
                  ) : (
                    <div className="d-flex flex-wrap gap-1">
                      {selectedSeats.map((s) => (
                        <span
                          key={s.seatNumber}
                          className={`badge ${s.tier === 'VIP' ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold px-2 py-1`}
                        >
                          {s.seatNumber} (₹{s.price})
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Payment Method Selector */}
                  {selectedSeats.length > 0 && (
                    <div className="mt-3">
                      <label className="form-label text-secondary small fw-semibold mb-1">Payment Method:</label>
                      <div className="d-flex gap-2">
                        {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            className={`btn btn-sm py-1 px-2 rounded-2 ${
                              paymentMethod === method
                                ? 'btn-outline-warning active fw-bold'
                                : 'btn-outline-secondary text-secondary'
                            }`}
                            style={{ fontSize: '0.72rem' }}
                            onClick={() => setPaymentMethod(method)}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-time Subtotal + 18% GST calculation */}
                <div className="col-12 col-md-4 border-start-md border-secondary-subtle ps-md-4">
                  <div className="d-flex justify-content-between text-secondary small mb-1">
                    <span>Tickets ({selectedSeats.length}):</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between text-secondary small mb-1">
                    <span>Goods & Services Tax (18% GST):</span>
                    <span className="text-info">+ ₹{gst.toFixed(2)}</span>
                  </div>
                  <hr className="border-secondary-subtle my-2" />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-white">Grand Total:</span>
                    <span className="fs-4 fw-extrabold text-warning">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm Action CTA */}
                <div className="col-12 col-md-3 text-md-end">
                  {isAuthenticated ? (
                    <button
                      type="button"
                      disabled={selectedSeats.length === 0 || submittingBooking}
                      className="btn btn-warning btn-lg w-100 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={handleProceedToBooking}
                    >
                      {submittingBooking ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Reserving...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-shield-check"></i>
                          <span>Confirm & Pay</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={selectedSeats.length === 0}
                      className="btn btn-outline-warning btn-lg w-100 fw-bold rounded-pill shadow-sm"
                      onClick={() => openAuthModal('login')}
                    >
                      Sign In to Book
                    </button>
                  )}
                  <div className="text-muted text-center text-md-end mt-1" style={{ fontSize: '0.68rem' }}>
                    <i className="bi bi-lock-fill me-1"></i> 256-bit Secure Reservation
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrixModal;

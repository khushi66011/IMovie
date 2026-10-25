import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingHistoryModal = ({ isOpen, onClose, onViewTicket }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchHistory();
    }
  }, [isOpen, isAuthenticated]);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.bookings.getMyBookings();
      if (res.success) {
        setBookings(res.bookings || []);
      } else {
        setError(res.message || 'Failed to retrieve bookings.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching your booking history.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-2 p-md-3">
      <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered w-100 history-modal-dialog">
        <div className="modal-content bg-dark text-light border-secondary-subtle rounded-4 shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="modal-header border-secondary-subtle px-4 py-3 bg-black bg-opacity-40">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5 text-warning">
                <i className="bi bi-clock-history"></i>
              </span>
              <h5 className="modal-title fw-bold text-white mb-0">My Booking History</h5>
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
            {!isAuthenticated ? (
              <div className="text-center py-5">
                <p className="text-secondary mb-3">Please sign in to view your confirmed ticket bookings.</p>
                <button
                  className="btn btn-warning rounded-pill px-4 fw-bold"
                  onClick={() => openAuthModal('login')}
                >
                  Sign In
                </button>
              </div>
            ) : loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading history...</span>
                </div>
                <p className="text-secondary small mt-2">Retrieving your ticket passes...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger border-danger-subtle bg-danger-subtle text-danger-emphasis rounded-3">
                {error}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-5 glass-card rounded-4 border border-secondary-subtle p-4">
                <div className="display-4 text-secondary mb-2">🎟️</div>
                <h5 className="fw-bold text-white">No Bookings Found</h5>
                <p className="text-secondary small mb-3">
                  You haven't reserved any movie tickets yet. Pick a blockbuster and experience the magic!
                </p>
                <button className="btn btn-warning rounded-pill px-4 fw-semibold" onClick={onClose}>
                  Browse Movies
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="history-booking-card p-3 rounded-4 bg-black bg-opacity-40 border border-secondary-subtle transition-all"
                  >
                    <div className="row g-3 align-items-center">
                      {/* Movie Poster Preview */}
                      <div className="col-3 col-sm-2 text-center">
                        <img
                          src={booking.moviePoster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=80'}
                          alt={booking.movieTitle}
                          className="rounded-3 shadow-sm img-fluid"
                          style={{ maxHeight: '90px', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="col-9 col-sm-6">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="fw-bold text-white mb-0 text-truncate">{booking.movieTitle}</h6>
                          <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '0.65rem' }}>
                            {booking.paymentStatus || 'CONFIRMED'}
                          </span>
                        </div>

                        <div className="text-secondary small mb-1">
                          <span><i className="bi bi-calendar3 me-1"></i>{booking.showDate}</span>
                          <span className="mx-2">•</span>
                          <span className="text-warning font-monospace"><i className="bi bi-clock me-1"></i>{booking.showtime}</span>
                        </div>

                        <div className="d-flex flex-wrap gap-1 align-items-center">
                          <span className="text-secondary small me-1">Seats:</span>
                          {(booking.seats || []).map((s, idx) => (
                            <span
                              key={idx}
                              className={`badge ${s.tier === 'VIP' ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold`}
                              style={{ fontSize: '0.7rem' }}
                            >
                              {s.seatNumber}
                            </span>
                          ))}
                        </div>

                        <div className="text-muted mt-1" style={{ fontSize: '0.68rem' }}>
                          ID: <span className="font-monospace text-secondary">{booking.bookingId}</span>
                        </div>
                      </div>

                      {/* Financial & View Ticket CTA */}
                      <div className="col-12 col-sm-4 text-sm-end border-top-sm border-secondary-subtle pt-2 pt-sm-0">
                        <div className="text-secondary small">Total Paid</div>
                        <div className="fs-5 fw-bold text-warning mb-2">
                          ₹{Number(booking.totalAmount || 0).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm rounded-pill px-3 py-1 fw-semibold d-inline-flex align-items-center gap-1"
                          onClick={() => {
                            onClose();
                            onViewTicket(booking);
                          }}
                        >
                          <i className="bi bi-qr-code"></i>
                          <span>View E-Ticket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer border-secondary-subtle px-4 py-2 bg-black bg-opacity-30">
            <button type="button" className="btn btn-secondary btn-sm rounded-pill px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryModal;

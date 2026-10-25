import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

const ETicketModal = ({ booking, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrValue = booking.qrCodeData || JSON.stringify({
    bookingId: booking.bookingId,
    movie: booking.movieTitle,
    screen: booking.screen,
    date: booking.showDate,
    time: booking.showtime,
    seats: (booking.seats || []).map(s => s.seatNumber),
    total: `₹${booking.totalAmount}`
  });

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-2 p-md-3">
      <div className="modal-dialog modal-lg modal-dialog-centered w-100 ticket-modal-dialog">
        <div className="modal-content bg-transparent border-0">
          
          {/* Main Success Announcement Card */}
          <div className="booking-success-banner text-center mb-3 p-3 rounded-4 bg-success bg-gradient text-white shadow-lg d-print-none">
            <div className="display-6 mb-1">🎉</div>
            <h4 className="fw-extrabold mb-1">
              Congratulations! Your ticket has been booked.
            </h4>
            <p className="mb-0 small opacity-90">
              Your official digital cinema admission pass is ready. Please present the QR code at the audi entrance.
            </p>
          </div>

          {/* Printable Ticket Container */}
          <div className="printable-e-ticket rounded-4 shadow-lg overflow-hidden bg-dark text-light border border-secondary-subtle">
            {/* Ticket Header */}
            <div className="ticket-top-bar p-3 px-md-4 d-flex justify-content-between align-items-center bg-black border-bottom border-secondary-subtle">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4">🎬</span>
                <div>
                  <h6 className="fw-extrabold text-white mb-0 font-space">IMOVIES ADMISSION PASS</h6>
                  <span className="text-secondary" style={{ fontSize: '0.7rem' }}>
                    OFFICIAL DIGITAL E-TICKET
                  </span>
                </div>
              </div>
              <div className="text-end">
                <div className="text-secondary" style={{ fontSize: '0.65rem' }}>BOOKING ID</div>
                <div className="font-monospace fw-bold text-warning" style={{ fontSize: '0.85rem' }}>
                  {booking.bookingId}
                </div>
              </div>
            </div>

            {/* Ticket Main Content */}
            <div className="ticket-body p-3 p-md-4">
              <div className="row g-4 align-items-center">
                {/* Poster & Movie Title */}
                <div className="col-12 col-md-4 text-center">
                  <div className="ticket-poster-box mx-auto rounded-3 overflow-hidden shadow">
                    <img
                      src={booking.moviePoster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80'}
                      alt={booking.movieTitle}
                      className="img-fluid"
                      style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                  <h5 className="fw-bold text-white mt-2 mb-1">{booking.movieTitle}</h5>
                  <span className="badge bg-warning text-dark fw-bold me-1">{booking.movieCertificate || 'UA'}</span>
                  <span className="badge bg-secondary-subtle text-light">Dolby Cinema</span>
                </div>

                {/* Show Details & Seats */}
                <div className="col-12 col-md-5">
                  <div className="ticket-info-grid d-flex flex-column gap-2">
                    <div>
                      <span className="text-secondary small d-block">Cinema Screen:</span>
                      <strong className="text-light">{booking.screen || 'Audi 1 - Dolby Atmos 4K'}</strong>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="text-secondary small d-block">Show Date:</span>
                        <strong className="text-light">{booking.showDate}</strong>
                      </div>
                      <div>
                        <span className="text-secondary small d-block">Showtime:</span>
                        <strong className="text-warning font-monospace">{booking.showtime}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-secondary small d-block mb-1">Seats Reserved:</span>
                      <div className="d-flex flex-wrap gap-1">
                        {(booking.seats || []).map((s, idx) => (
                          <span
                            key={idx}
                            className={`badge ${s.tier === 'VIP' ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold px-2 py-1`}
                          >
                            {s.seatNumber} ({s.tier})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-top border-secondary-subtle">
                      <span className="text-secondary small d-block">Ticket Holder:</span>
                      <strong className="text-light">{booking.userName}</strong>
                      <span className="text-muted small d-block">{booking.userEmail}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code & Verification */}
                <div className="col-12 col-md-3 text-center border-start-md border-secondary-subtle ps-md-3">
                  <div className="qr-code-wrapper p-2 bg-white rounded-3 d-inline-block shadow-sm">
                    <QRCodeSVG
                      value={qrValue}
                      size={110}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="mt-2">
                    <span className="badge bg-success-subtle text-success border border-success-subtle small">
                      <i className="bi bi-shield-check me-1"></i> VERIFIED TICKET
                    </span>
                    <p className="text-secondary mt-1 mb-0" style={{ fontSize: '0.65rem' }}>
                      Scan at gate for paperless contactless entry
                    </p>
                  </div>
                </div>
              </div>

              {/* Perforation Divider */}
              <div className="ticket-perforation my-4 position-relative">
                <div className="ticket-notch notch-left"></div>
                <div className="perforated-dash-line"></div>
                <div className="ticket-notch notch-right"></div>
              </div>

              {/* Price Breakdown Footer */}
              <div className="ticket-price-strip p-3 rounded-3 bg-black bg-opacity-50 border border-secondary-subtle">
                <div className="row g-2 align-items-center">
                  <div className="col-6 col-sm-3">
                    <span className="text-secondary small d-block">Subtotal:</span>
                    <strong className="text-light">₹{Number(booking.subtotal || 0).toFixed(2)}</strong>
                  </div>
                  <div className="col-6 col-sm-3">
                    <span className="text-secondary small d-block">18% GST:</span>
                    <strong className="text-info">₹{Number(booking.gst || 0).toFixed(2)}</strong>
                  </div>
                  <div className="col-6 col-sm-3">
                    <span className="text-secondary small d-block">Total Paid:</span>
                    <strong className="text-warning fs-5">₹{Number(booking.totalAmount || 0).toFixed(2)}</strong>
                  </div>
                  <div className="col-6 col-sm-3 text-sm-end">
                    <span className="text-secondary small d-block">Payment Mode:</span>
                    <span className="badge bg-dark border border-secondary text-light">
                      {booking.paymentMethod || 'UPI'} • {booking.paymentStatus || 'CONFIRMED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Footer Actions (hidden in print) */}
            <div className="ticket-actions p-3 px-md-4 bg-black bg-opacity-40 border-top border-secondary-subtle d-flex justify-content-between align-items-center d-print-none">
              <span className="text-secondary small">
                <i className="bi bi-info-circle me-1"></i> Carry a valid Government Photo ID.
              </span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm fw-semibold rounded-pill px-3 py-1 d-flex align-items-center gap-2"
                  onClick={handlePrint}
                >
                  <i className="bi bi-printer-fill"></i>
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-sm fw-bold rounded-pill px-3 py-1"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ETicketModal;

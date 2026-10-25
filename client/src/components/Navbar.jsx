import React from 'react';
import { useAuth } from '../context/AuthContext';
import LiveClock from './LiveClock';

const Navbar = ({ onOpenBookingHistory }) => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top glass-navbar py-2 px-3 border-bottom border-secondary-subtle">
      <div className="container-fluid px-lg-4">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-decoration-none" href="#">
          <span className="brand-logo-icon">🎬</span>
          <span className="brand-text">
            I<span className="text-warning">Movies</span>
          </span>
          <span className="badge bg-warning text-dark ms-1 d-none d-sm-inline-block fw-bold" style={{ fontSize: '0.65rem' }}>
            CINEMA
          </span>
        </a>

        {/* Live IST Clock (Prominent in Navbar) */}
        <div className="mx-auto order-3 order-lg-2 my-2 my-lg-0">
          <LiveClock />
        </div>

        {/* Action Buttons & Auth */}
        <div className="d-flex align-items-center gap-2 order-2 order-lg-3">
          {isAuthenticated ? (
            <>
              {/* My Bookings History Button */}
              <button
                type="button"
                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-2 rounded-pill px-3 py-1 shadow-sm"
                onClick={onOpenBookingHistory}
                title="View your confirmed bookings and tickets"
              >
                <i className="bi bi-ticket-perforated-fill"></i>
                <span className="d-none d-md-inline">My Bookings</span>
              </button>

              {/* User Dropdown / Profile Badge */}
              <div className="dropdown">
                <button
                  className="btn btn-dark border border-secondary-subtle btn-sm rounded-pill dropdown-toggle d-flex align-items-center gap-2 px-3 py-1 text-light"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="user-avatar-circle">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span className="d-none d-sm-inline fw-medium text-truncate" style={{ maxWidth: '120px' }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow border-secondary-subtle mt-2">
                  <li className="px-3 py-2 border-bottom border-secondary-subtle">
                    <div className="fw-bold text-white small">{user?.name}</div>
                    <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: '180px' }}>
                      {user?.email}
                    </div>
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2 d-flex align-items-center gap-2"
                      onClick={onOpenBookingHistory}
                    >
                      <i className="bi bi-clock-history text-warning"></i> Booking History
                    </button>
                  </li>
                  <li><hr className="dropdown-divider border-secondary-subtle my-1" /></li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger d-flex align-items-center gap-2"
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-light btn-sm rounded-pill px-3 py-1"
                onClick={() => openAuthModal('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm fw-semibold rounded-pill px-3 py-1 shadow-sm"
                onClick={() => openAuthModal('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

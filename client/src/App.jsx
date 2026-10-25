import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';
import MovieGrid from './components/MovieGrid';
import SeatMatrixModal from './components/SeatMatrixModal';
import ETicketModal from './components/ETicketModal';
import BookingHistoryModal from './components/BookingHistoryModal';
import AuthModal from './components/AuthModal';
import api from './services/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal controls
  const [activeMovieForSeats, setActiveMovieForSeats] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Fetch movies with search & genre filtering
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.movies.getAll({
          search: searchTerm,
          genre: selectedGenre
        });
        if (isMounted && res.success) {
          setMovies(res.movies || []);
          if (res.genres && res.genres.length > 0) {
            setGenres(res.genres);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to connect to IMovies API.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Debounce search input slightly
    const timer = setTimeout(fetchCatalog, 250);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchTerm, selectedGenre]);

  // Handle successful ticket booking
  const handleBookingConfirmed = (booking) => {
    setActiveMovieForSeats(null);
    setConfirmedBooking(booking);
  };

  // Featured movie (e.g. first movie in list or Kalki)
  const featuredMovie = movies.find(m => m.featured) || movies[0];

  return (
    <div className="min-vh-100 d-flex flex-column bg-dark text-light app-wrapper">
      {/* Navbar with brand, live IST clock, and user controls */}
      <Navbar onOpenBookingHistory={() => setIsHistoryOpen(true)} />

      {/* Hero Showcase Banner */}
      {featuredMovie && !searchTerm && selectedGenre === 'All' && (
        <section className="hero-cinematic-banner position-relative overflow-hidden mb-4">
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${featuredMovie.banner || featuredMovie.poster})` }}
          ></div>
          <div className="hero-gradient-overlay"></div>
          <div className="container py-5 position-relative z-1">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
                    ⚡ TRENDING BLOCKBUSTER
                  </span>
                  <span className="badge bg-black bg-opacity-75 text-light border border-secondary-subtle">
                    {featuredMovie.certificate || 'UA'}
                  </span>
                  <span className="badge bg-black bg-opacity-75 text-warning">
                    ⭐ {featuredMovie.rating} / 10
                  </span>
                </div>
                <h1 className="display-4 fw-extrabold text-white mb-2 font-space">
                  {featuredMovie.title}
                </h1>
                <p className="lead text-light opacity-90 mb-3 hero-synopsis">
                  {featuredMovie.synopsis}
                </p>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <button
                    className="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow d-flex align-items-center gap-2"
                    onClick={() => setActiveMovieForSeats(featuredMovie)}
                  >
                    <i className="bi bi-ticket-detailed-fill"></i>
                    <span>Book Tickets Now (From ₹250)</span>
                  </button>
                  <div className="text-secondary small d-flex align-items-center gap-2">
                    <i className="bi bi-broadcast text-danger"></i>
                    <span>{featuredMovie.screen || 'Audi 1 - Dolby Cinema 4K Laser'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <main className="container flex-grow-1 py-4">
        {/* Section Title */}
        <div className="d-flex justify-content-between align-items-end mb-3">
          <div>
            <span className="text-warning text-uppercase fw-bold small letter-spacing-1">
              Now Showing in Theatres
            </span>
            <h2 className="fw-bold text-white mb-0 font-space">Movie Catalog & Showtimes</h2>
          </div>
        </div>

        {/* Real-time Search & Genre Filtering */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={genres}
          movieCount={movies.length}
        />

        {/* Movie Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          onSelectMovie={(movie) => setActiveMovieForSeats(movie)}
        />
      </main>

      {/* Cinema Footer */}
      <footer className="footer bg-black border-top border-secondary-subtle py-4 mt-auto">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="fs-5">🎬</span>
                <span className="fw-bold text-white fs-5">
                  I<span className="text-warning">Movies</span> Cinema
                </span>
              </div>
              <p className="text-secondary small mb-0">
                Premium multi-screen cinema ticketing platform powered by Dolby Atmos 4K Laser projection. All ticket bookings calculate 18% Indian GST with instant verifiable QR E-Tickets.
              </p>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <div className="text-secondary small mb-1">
                Supported Payments: UPI, RuPay, Visa, Mastercard, NetBanking
              </div>
              <div className="text-muted small">
                © {new Date().getFullYear()} IMovies Entertainment Ltd. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Seat Matrix Modal */}
      {activeMovieForSeats && (
        <SeatMatrixModal
          movie={activeMovieForSeats}
          isOpen={!!activeMovieForSeats}
          onClose={() => setActiveMovieForSeats(null)}
          onBookingSuccess={handleBookingConfirmed}
        />
      )}

      {/* Digital Printable E-Ticket Modal */}
      {confirmedBooking && (
        <ETicketModal
          booking={confirmedBooking}
          isOpen={!!confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      {/* Booking History Modal */}
      {isHistoryOpen && (
        <BookingHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onViewTicket={(ticket) => setConfirmedBooking(ticket)}
        />
      )}

      {/* Auth Modal (Login / Register) */}
      <AuthModal />
    </div>
  );
}

export default App;

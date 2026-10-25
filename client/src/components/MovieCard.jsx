import React from 'react';

const MovieCard = ({ movie, onSelectMovie }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div className="card movie-card h-100 bg-dark border-secondary-subtle rounded-4 overflow-hidden shadow-sm d-flex flex-column">
        {/* Poster Wrapper */}
        <div className="movie-poster-wrapper position-relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="card-img-top movie-poster"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="movie-poster-overlay d-flex flex-column justify-content-between p-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="badge bg-warning text-dark fw-bold px-2 py-1 shadow">
                <i className="bi bi-star-fill me-1"></i>
                {movie.rating ? movie.rating.toFixed(1) : '8.5'}
              </span>
              <span className="badge bg-black bg-opacity-75 text-light border border-secondary-subtle px-2 py-1">
                {movie.certificate || 'UA'}
              </span>
            </div>
            <div>
              <span className="badge bg-primary bg-opacity-80 text-light px-2 py-1">
                {movie.language}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
              <h5 className="card-title fw-bold text-white mb-0 text-truncate" title={movie.title}>
                {movie.title}
              </h5>
            </div>
            
            <p className="text-secondary small mb-2 d-flex align-items-center gap-2">
              <span><i className="bi bi-clock-history me-1"></i>{movie.duration}</span>
              <span>•</span>
              <span className="text-truncate" style={{ maxWidth: '140px' }}>
                {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
              </span>
            </p>

            <p className="card-text text-light-emphasis small movie-synopsis mb-3">
              {movie.synopsis}
            </p>
          </div>

          <div>
            {/* Price badges in Indian Rupees (₹) */}
            <div className="pricing-strip p-2 rounded-3 mb-3 bg-black bg-opacity-40 border border-secondary-subtle d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-1">
                <span className="text-secondary" style={{ fontSize: '0.72rem' }}>STD:</span>
                <span className="text-info fw-bold" style={{ fontSize: '0.85rem' }}>
                  ₹{movie.standardPrice || 250}
                </span>
              </div>
              <div className="vr bg-secondary opacity-50"></div>
              <div className="d-flex align-items-center gap-1">
                <span className="text-secondary" style={{ fontSize: '0.72rem' }}>VIP:</span>
                <span className="text-warning fw-bold" style={{ fontSize: '0.85rem' }}>
                  ₹{movie.vipPrice || 450}
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              type="button"
              className="btn btn-warning w-100 fw-bold rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm book-btn"
              onClick={() => onSelectMovie(movie)}
            >
              <i className="bi bi-ticket-detailed-fill"></i>
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

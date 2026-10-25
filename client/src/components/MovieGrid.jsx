import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, error, onSelectMovie }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading movie catalog...</span>
        </div>
        <p className="text-secondary mt-3">Fetching the latest blockbusters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger border-danger-subtle bg-danger-subtle text-danger-emphasis rounded-4 p-4 text-center my-4">
        <i className="bi bi-exclamation-triangle-fill fs-3 mb-2 d-block"></i>
        <h5 className="fw-bold">Unable to Load Movies</h5>
        <p className="mb-0 small">{error}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-5 glass-card rounded-4 border border-secondary-subtle my-4 p-5">
        <div className="display-4 text-secondary mb-3">🎬</div>
        <h4 className="fw-bold text-white">No Movies Found</h4>
        <p className="text-secondary mb-0">Try searching with a different movie title, language, or genre filter.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid-container">
      <div className="row g-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onSelectMovie={onSelectMovie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;

import React from 'react';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres = [],
  movieCount = 0
}) => {
  return (
    <div className="search-filter-section mb-4 p-3 p-md-4 rounded-4 glass-card border border-secondary-subtle">
      <div className="row g-3 align-items-center">
        {/* Real-time Search Input */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="input-group">
            <span className="input-group-text bg-dark border-secondary-subtle text-warning">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary-subtle search-input shadow-none"
              placeholder="Search movies by title, director, cast..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary border-secondary-subtle"
                type="button"
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Status / Count indicator */}
        <div className="col-12 col-md-6 col-lg-7 d-flex justify-content-md-end align-items-center gap-2">
          <span className="text-secondary small">
            Showing <strong className="text-warning">{movieCount}</strong> {movieCount === 1 ? 'movie' : 'movies'}
          </span>
          {(searchTerm || selectedGenre !== 'All') && (
            <button
              className="btn btn-sm btn-link text-warning text-decoration-none p-0 ms-2"
              onClick={() => {
                onSearchChange('');
                onGenreChange('All');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="genre-pills-container mt-3 d-flex flex-wrap gap-2 align-items-center">
        <span className="text-secondary small fw-semibold me-1">
          <i className="bi bi-funnel-fill text-warning me-1"></i> Genre:
        </span>
        {genres.map((genre) => {
          const isActive = selectedGenre.toLowerCase() === genre.toLowerCase();
          return (
            <button
              key={genre}
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 transition-all ${
                isActive
                  ? 'btn-warning fw-semibold shadow-sm text-dark'
                  : 'btn-outline-secondary text-light-emphasis border-secondary-subtle'
              }`}
              onClick={() => onGenreChange(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilter;

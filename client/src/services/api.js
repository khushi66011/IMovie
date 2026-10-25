const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Helper to fetch with JSON and auth headers
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('imovies_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: 'Invalid response format from server.'
    }));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Authentication
  auth: {
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    login: (credentials) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    getMe: () => request('/auth/me')
  },

  // Movies Catalog
  movies: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append('search', params.search);
      if (params.genre && params.genre !== 'All') searchParams.append('genre', params.genre);
      const queryString = searchParams.toString();
      return request(`/movies${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => request(`/movies/${id}`),
    getBookedSeats: (movieId, date, showtime) => {
      const qs = new URLSearchParams({ date, showtime }).toString();
      return request(`/movies/${movieId}/seats?${qs}`);
    },
    seed: () => request('/movies/seed', { method: 'POST' })
  },

  // Bookings & Tickets
  bookings: {
    create: (bookingData) => request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),
    getMyBookings: () => request('/bookings/my-bookings'),
    getById: (id) => request(`/bookings/${id}`)
  }
};

export default api;

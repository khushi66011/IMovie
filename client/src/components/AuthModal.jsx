import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { authModal, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState(authModal.mode || 'login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModal.isOpen) return null;

  // Sync mode if changed from external context
  if (authModal.mode && authModal.mode !== mode && !loading) {
    setMode(authModal.mode);
  }

  const resetForm = () => {
    setError('');
    setSuccessMsg('');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  const handleSwitchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleQuickDemoFill = () => {
    setEmail('rajesh@example.com');
    setPassword('password123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (!result.success) {
          setError(result.message);
        }
      } else {
        const result = await register({ name, email, password, phone });
        if (!result.success) {
          setError(result.message);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
      <div className="modal-dialog modal-dialog-centered w-100" style={{ maxWidth: '440px' }}>
        <div className="modal-content bg-dark text-light border-secondary-subtle rounded-4 shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="modal-header border-secondary-subtle px-4 py-3 bg-black bg-opacity-40">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">🎬</span>
              <h5 className="modal-title fw-bold text-white mb-0">
                {mode === 'login' ? 'Sign In to IMovies' : 'Join IMovies Cinema'}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeAuthModal}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Mode Switcher Tabs */}
            <div className="nav nav-pills nav-fill bg-black bg-opacity-50 p-1 rounded-pill mb-4 border border-secondary-subtle">
              <button
                type="button"
                className={`nav-link rounded-pill py-1 small fw-semibold ${mode === 'login' ? 'active bg-warning text-dark' : 'text-secondary'}`}
                onClick={() => handleSwitchMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`nav-link rounded-pill py-1 small fw-semibold ${mode === 'register' ? 'active bg-warning text-dark' : 'text-secondary'}`}
                onClick={() => handleSwitchMode('register')}
              >
                Register
              </button>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="alert alert-danger border-danger-subtle bg-danger-subtle text-danger-emphasis py-2 px-3 rounded-3 small mb-3">
                <i className="bi bi-exclamation-circle-fill me-1"></i> {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-black border-secondary-subtle text-secondary">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      className="form-control bg-dark text-light border-secondary-subtle"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold mb-1">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-black border-secondary-subtle text-secondary">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="form-control bg-dark text-light border-secondary-subtle"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    Mobile Number (Optional)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-black border-secondary-subtle text-secondary">
                      <i className="bi bi-phone"></i>
                    </span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="form-control bg-dark text-light border-secondary-subtle"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="form-label text-secondary small fw-semibold mb-1">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-black border-secondary-subtle text-secondary">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimum 6 characters"
                    className="form-control bg-dark text-light border-secondary-subtle"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-secondary-subtle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100 fw-bold rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{mode === 'login' ? 'Sign In & Continue' : 'Create Account'}</span>
                )}
              </button>
            </form>

            {/* Quick Demo Fill Helper */}
            {mode === 'login' && (
              <div className="mt-3 pt-3 border-top border-secondary-subtle text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary border-secondary-subtle rounded-pill text-warning"
                  style={{ fontSize: '0.75rem' }}
                  onClick={handleQuickDemoFill}
                >
                  <i className="bi bi-lightning-fill text-warning me-1"></i> Quick Demo Account Fill
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;

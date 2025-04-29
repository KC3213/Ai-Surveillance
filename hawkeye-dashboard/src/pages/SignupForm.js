import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { authService } from '../services/api';
import './LoginForm.css';

const BubblesBackground = () => (
  <div className="bubbles">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="bubble"></div>
    ))}
  </div>
);

const SignupForm = ({ toggleForm, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !password || !confirmPassword || !username) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      await authService.signup(username, email, password);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <BubblesBackground />
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Manual Signup Section */}
        <div className="signup-section">
          <div className="profile-picture">
            <FaUser />
          </div>
          <h2><span className="log">Sign</span><span className="in">up</span></h2>
          
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                placeholder="Create password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>

        {/* Divider */}
        <div className="signup-divider" />

        {/* Social Signup Section */}
        <div className="social-signup-section">
          <h3>Quick Sign Up</h3>
          <div className="social-signup-buttons">
            <button
              type="button"
              className="social-signup-button google"
              onClick={() => console.log('Google signup')}
            >
              <FaGoogle /> Continue with Google
            </button>
            <button
              type="button"
              className="social-signup-button github"
              onClick={() => console.log('GitHub signup')}
            >
              <FaGithub /> Continue with GitHub
            </button>
          </div>
          
          <div className="form-toggle">
            Already have an account?{' '}
            <button type="button" onClick={toggleForm}>
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm; 
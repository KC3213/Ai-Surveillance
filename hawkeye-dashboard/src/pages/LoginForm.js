import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { authService } from '../services/api';
import './LoginForm.css';
import SignupForm from './SignupForm';

const BubblesBackground = () => (
    <div className="bubbles">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="bubble"></div>
      ))}
    </div>
);

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  if (!isLogin) {
    return <SignupForm toggleForm={toggleForm} setIsAuthenticated={setIsAuthenticated} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, you'd implement OAuth login here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="login-container">
      <BubblesBackground />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="profile-picture">
          <FaUser />
        </div>
        <h2><span className="log">Log</span><span className="in">in</span></h2>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              placeholder="Enter your password"
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

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="login-button"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-buttons">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="social-button github"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <FaGithub /> GitHub
            </button>
          </div>
        </div>

        <div className="form-toggle">
          Don't have an account?{' '}
          <button type="button" onClick={toggleForm}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
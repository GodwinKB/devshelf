import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/errorHandler';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await login(email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/resources'), 1500);
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    /* 1. NEW: Responsive Wrapper added here to keep it centered and padded on mobile */
    <div className="auth-wrapper" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 2. NEW: Forced width to 100% and max-width so it scales automatically on phones */}
      <div className="auth-container" style={{ width: '100%', maxWidth: '420px' }}>
        <h2>Sign In to DevShelf</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <InputField 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <div className="input-group">
            <div className="password-header">
              <label className="input-label">Password</label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <InputField 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* 3. NEW: Forced the button to take up the full width of the mobile screen */}
          <Button type="submit" disabled={loading || success} className="auth-submit" style={{ width: '100%', marginTop: '1rem' }}>
            {loading && !success ? 'Signing In...' : success ? 'Success!' : 'Sign In'}
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/errorHandler';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. ADDED: pull 'login' from useAuth as well
  const { register, login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // 2. Register the user in the C# database
      await register(userName, email, password);
      
      // 3. NEW: Automatically log them in immediately!
      await login(email, password);

      // 4. Send them straight to the resources dashboard instead of the login page
      setSuccess('Registration successful! Logging you in...');
      setTimeout(() => navigate('/resources'), 2000);
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <InputField 
          label="Username" 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        <InputField 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <InputField 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <Button type="submit" disabled={loading || success} className="btn-primary auth-submit">
          {loading && !success ? 'Registering...' : success ? 'Success!' : 'Register'}
        </Button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
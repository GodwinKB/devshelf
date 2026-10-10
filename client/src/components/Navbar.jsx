import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Import the external CSS

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">DevShelf</Link>
        </h1>
        
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/resources">Resources</Link>
              <Link to="/snippets">Snippets</Link>
              <Link to="/tasks">Tasks</Link>
              <span className="welcome-text">Welcome, {user?.userName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
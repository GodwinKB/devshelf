import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css'; 

// 1. IMPORT YOUR LOGO HERE (Make sure the filename matches exactly)
import myLogo from '../assets/logo.png'; 

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Brand Logo / Home Link */}
        <div className="navbar-brand">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            {/* 2. ADD THE IMAGE TAG HERE */}
            <img src={myLogo} alt="DevShelf Logo" className="logo-image" />
            
            {/* You can delete this span if you ONLY want the image, or keep it to have the image + text */}
            <span className="logo-text">DevShelf</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Dynamic Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <li><Link to="/resources" className="nav-link" onClick={closeMenu}>Resources</Link></li>
              <li><Link to="/snippets" className="nav-link" onClick={closeMenu}>Snippets</Link></li>
              <li><Link to="/tasks" className="nav-link" onClick={closeMenu}>Tasks</Link></li>
              
              {user?.userName && (
                <li style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>
                  {user.userName}
                </li>
              )}
              
              <li>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link></li>
              <li><Link to="/register" className="nav-link nav-register" onClick={closeMenu}>Register</Link></li>
            </>
          )}
        </ul>
        
      </div>
    </nav>
  );
}

export default Navbar;
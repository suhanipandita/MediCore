import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

// --- SVG Icon Components ---

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M4 18a4 4 0 1 1 8 0m-8 0v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0a4 4 0 1 1 8 0m-8 0h4m4 0v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m-2-7h.01M18 11h.01" />
    <path d="M12 6V2" />
    <path d="M12 2a2 2 0 1 0-4 0v4" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);


export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <nav className="navbar">
          <div className="nav-brand">Medicore</div>
          <div className="nav-links">
            <a href="#find-doctors">Find Doctors</a>
            <a href="#appointments">Appointments</a>
            <a href="#my-health">My Health</a>
          </div>
          <div className="user-actions">
            <button className="icon-button notification-button">
              <img src="New notifications.svg" />
              <span className="notification-badge">4</span>
            </button>
            {user ? (
              <div className="user-profile-wrapper">
                <div className="user-profile">
                  <img src="profile.svg" />
                  <span>{user.email.split('@')[0]}</span>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            ) : (
              <Link to="/patient-login" className="user-profile">
                <button className="icon-button">
                <img src="profile.svg" />
                <span>Login / Sign Up</span>
                </button>
              </Link>
            )}
          </div>
        </nav>

        <header className="hero-section">
          <div className="hero-content">
            <h1>Find Trusted Doctors in Seconds.</h1>
            <p>
              Search by specialty, condition, or location — book your appointment in just minutes
            </p>
            <div className="search-container">
              <div className="search-input-wrapper">
                <img src="Frame.svg" />
                <input type="text" placeholder="City or Zip code" />
              </div>
              <div className="search-input-wrapper">
                <StethoscopeIcon />
                <input type="text" placeholder="Condition, Doctor, Name..." />
              </div>
              <button className="search-button">
                <SearchIcon />
              </button>
            </div>
            <a href="#browse" className="browse-link">Browse All Specialties &gt;</a>
          </div>
          <div className="hero-image">
            <img src="doctorimage.png" alt="Doctor with clipboard" />
          </div>
        </header>
      </div>
    </div>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(){
  return (
    <header>
      <div className="header-inner">
        <h1 style={{margin:0}}>Medicore</h1>
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/appointments">Appointments</Link>
        </nav>
      </div>
    </header>
  )
}

import React from 'react';
import './Dashboard.css';

export default function Dashboard(){
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards-row">
        <div className="card"><h3>Patients</h3><p>Manage patient records</p></div>
        <div className="card"><h3>Appointments</h3><p>View upcoming</p></div>
        <div className="card"><h3>Doctors</h3><p>Manage schedule</p></div>
      </div>
    </div>
  )
}

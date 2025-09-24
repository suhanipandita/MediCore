import React from 'react';
import './PatientCard.css';

export default function PatientCard({name, age, status}){
  return (
    <div className="patient-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Status: {status}</p>
      <div className="card-actions">
        <button>View</button>
        <button>Edit</button>
      </div>
    </div>
  )
}

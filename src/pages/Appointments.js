import React, {useState} from 'react';
import './Appointments.css';

export default function Appointments(){
  const [appointments, setAppointments] = useState([
    {id:1, patient:'John Doe', date:'2025-09-10', time:'10:00'},
    {id:2, patient:'Jane Smith', date:'2025-09-12', time:'11:30'}
  ]);

  return (
    <div>
      <h2>Appointments</h2>
      <table className="appt-table">
        <thead><tr><th>Patient</th><th>Date</th><th>Time</th></tr></thead>
        <tbody>
          {appointments.map(a=>(
            <tr key={a.id}><td>{a.patient}</td><td>{a.date}</td><td>{a.time}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

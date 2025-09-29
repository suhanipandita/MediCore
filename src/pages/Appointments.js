import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import supabase client
import './Appointments.css';

export default function Appointments(){
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*');
      
      if (error) {
        console.error('Error fetching appointments:', error);
      } else {
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, []);

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
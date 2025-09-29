import React, { useState, useEffect } from 'react';
import PatientCard from '../components/PatientCard';
import { supabase } from '../supabaseClient'; // Import supabase client
import './Patients.css';

export default function Patients(){
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*');
      
      if (error) {
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <div className="patients-grid">
        {patients.map(p=> <PatientCard key={p.id} {...p} />)}
      </div>
    </div>
  )
}
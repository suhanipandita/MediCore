import React, {useState} from 'react';
import PatientCard from '../components/PatientCard';
import './Patients.css';

export default function Patients(){
  const [patients, setPatients] = useState([
    {id:1, name:'John Doe', age:45, status:'Admitted'},
    {id:2, name:'Jane Smith', age:30, status:'Discharged'}
  ]);

  return (
    <div>
      <h2>Patients</h2>
      <div className="patients-grid">
        {patients.map(p=> <PatientCard key={p.id} {...p} />)}
      </div>
    </div>
  )
}

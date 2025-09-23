import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: register user
    alert('Registered (placeholder). Now login.');
  }

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  )
}

import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: authenticate -> on success redirect
    navigate('/dashboard');
  }

  return (
    <div className="auth-card">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/signup">Create account</Link></p>
    </div>
  )
}

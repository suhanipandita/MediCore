import React from 'react';

function StaffLogin() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Staff Login</h1>
      <form>
        <input type="email" placeholder="Enter your email" /><br /><br />
        <input type="password" placeholder="Enter your password" /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default StaffLogin;

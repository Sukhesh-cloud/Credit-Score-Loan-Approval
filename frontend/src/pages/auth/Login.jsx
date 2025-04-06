import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth, navigate }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(true);

      // 🔐 Decode JWT to extract role
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const role = decoded.role;

      // ✅ Role-based navigation
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/credit');
      }

    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../context/globalContext';
function Register({ onAuthenticate, togglePage }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, formData, {
        withCredentials: true,
      });
    //   const { token } = response.data;
    //   localStorage.setItem('authToken', token);
    //   axios.defaults.headers.common['Authorization'] = `${token}`;
    //   onAuthenticate();
    togglePage();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
      <p>
        Already have an account? <span onClick={togglePage}>Login here</span>
      </p>
    </form>
  );
}

export default Register;

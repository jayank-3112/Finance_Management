import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../context/globalContext';
function Login({ onAuthenticate, togglePage }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, credentials, {
        withCredentials: true, // Ensures cookies are included
      });
      const { token } = response.data; // Assuming the backend returns a token in the response
      localStorage.setItem('authToken', token); // Store token securely in localStorage
      axios.defaults.headers.common['Authorization'] = `${token}`; // Set default header for future requests
      onAuthenticate(); // Mark the user as authenticated
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <span onClick={togglePage}>Register here</span>
      </p>
    </form>
  );
}

export default Login;

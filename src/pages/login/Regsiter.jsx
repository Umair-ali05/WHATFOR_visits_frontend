/** @format */

import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import login from '../../assets/images/hero-section-logo.svg';
import Toast from '../../utils/utils';
import baseUrl from '../../urlConfigFile';

export const Regsiter = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${baseUrl.url}sign-up`, {
        name,
        email,
        password,
        role,
        adminKey,
      });
      if (res.data.user.success) {
        Toast.successToastMessage(res.data.user.message);
        window.location.replace('/login');
      } else {
        Toast.errorToastMessage(res.data.user.message);
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.err.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='back'>
            <img
              className='hero-section-img'
              src={login}
              alt=''
            />
          </div>
          <div className='signup-header'>
            <h1>Sign Up</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Name *</span>
            <input
              type='text'
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Email address *</span>
            <input
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Password *</span>
            <input
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Set Role *</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=''>Select Role</option>
              <option value='Admin'>Admin</option>
              <option value='User'>User</option>
            </select>

            {role === 'Admin' && (
              <>
                <span> Admin Key *</span>
                <input
                  type='text'
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </>
            )}

            <button
              type='submit'
              className='button signup-form-btn'
            >
              Register
            </button>
          </form>
          {error && <span>{error}</span>}
        </div>
      </section>
    </>
  );
};

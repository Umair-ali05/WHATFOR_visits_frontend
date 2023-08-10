/** @format */

import React, { useRef, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import login from '../../assets/images/hero-section-logo.svg';
import Toast from '../../utils/utils';

export const Login = () => {
  const userRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:30000/api/sign-in', {
        email: userRef.current.value,
        password: passRef.current.value,
      });
      if (res.data.profile.success) {
        localStorage.setItem('Authorization', res.data.profile.user);

        let data = decodeToken(res.data.profile.user);
        localStorage.setItem('name', data.user.name);

        Toast.successToastMessage(res.data.profile.message);

        window.location.replace('/');
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.err.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };
  //console.log(user)
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='login-header'>
            <h1>Log In</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <span className='class-mail'>Email address *</span>
            <input
              type='text'
              required
              ref={userRef}
            />
            <span className='class-pass'>Password *</span>
            <input
              type='password'
              required
              ref={passRef}
            />
            <button
              className='button login-form-btn'
              type='submit'
            >
              Log in
            </button>

            <Link
              to='/register'
              className='link'
            >
              Don't have account? Sign up
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

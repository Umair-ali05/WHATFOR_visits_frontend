/** @format */

import React, { useEffect, useState } from 'react';
import './account.css';
import axios from 'axios';
import Toast from '../../utils/utils';
import { decodeToken } from 'react-jwt';
import baseUrl from '../../urlConfigFile';

export const Account = () => {
  // State variables for form inputs and success/error messages
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [adminKey, setAdminKey] = useState('');

  // Fetch user information from the token when the component mounts
  useEffect(() => {
    const userToken = localStorage.getItem('Authorization');
    if (userToken) {
      const user = decodeToken(userToken);
      setUsername(user.user.name);
      setRole(user.user.role);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to update the user
    const updateUser = {
      name,
      role,
      adminKey,
    };

    try {
      // Send the API request to update user information
      const res = await axios.put(`${baseUrl.url}user`, updateUser, {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (res.data.profile.success) {
        // Update the user token and name in local storage
        localStorage.setItem('Authorization', res.data.profile.user);
        const data = decodeToken(res.data.profile.user);
        localStorage.setItem('name', data.user.name);

        // Show success message using the Toast utility
        Toast.successToastMessage(res.data.profile.message);

        // You may choose to redirect the user after a successful update
        // window.location.replace('/');
      }
    } catch (error) {
      // Show error message using the Toast utility
      if (error.response?.data?.err?.message) {
        Toast.errorToastMessage(error.response.data.err.message);
      } else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  return (
    <section className='accountInfo'>
      <div className='container boxItems'>
        <h1 className='edit-details-heading font-color'>
          Edit Your Account Information
        </h1>
        <div className='content'>
          <form
            className='right'
            onSubmit={handleSubmit}
          >
            <label
              htmlFor='name'
              className='font-color'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label
              htmlFor='role'
              className='font-color'
            >
              Change Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=''>Select Role</option>
              <option value='Admin'>Admin</option>
            </select>

            {role === 'Admin' && (
              <>
                <label
                  htmlFor='adminKey'
                  className='font-color'
                >
                  Admin Key
                </label>
                <input
                  type='text'
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </>
            )}

            <button
              className='button edit-btn'
              type='submit'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

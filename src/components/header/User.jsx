/** @format */

import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { RiImageAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import './user.css';
import icon from '../../assets/images/user-icon.png';

export const User = () => {
  const [name, setName] = useState();
  let user = localStorage.getItem('Authorization');
  let mainUser;
  if (user) {
    mainUser = decodeToken(user);
  } else {
    mainUser = null;
  }
  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('rated');
  };
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <div className='profile profile-btn'>
        {!mainUser ? (
          <Link to='/login'>
            <button className='account-btn'>
              <span>
                <img src={icon} alt='' />
              </span>
              <p className='login-btn'>Log in</p>
            </button>
          </Link>
        ) : mainUser.user.role === 'Admin' ? (
          <>
            <button
              className='img user-name account-btn'
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span>
                <img src={icon} alt='' />
              </span>{' '}
              {localStorage.getItem('name')}
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to={'/account'}>
                  <div className='image'>
                    <div className='text'>
                      <h4>{localStorage.getItem('name')}</h4>
                      <label>Roll {mainUser.user.role}</label>
                    </div>
                  </div>
                </Link>
                <div className='profile-option'>
                  <Link className='hover' to='/category'>
                    <button className='box hover'>
                      <RiImageAddLine className='icon' />
                      <h4 className='hover'>Create Category</h4>
                    </button>
                  </Link>
                  <Link className='hover' to='/create'>
                    <button className='box hover'>
                      <RiImageAddLine className='icon' />
                      <h4 className='hover'>Create Post</h4>
                    </button>
                  </Link>
                  <Link to='/account'>
                    <button className='box hover'>
                      <RiImageAddLine className='icon' />
                      <h4 className='hover'>Edit Account info</h4>
                    </button>
                  </Link>
                  <button className='box hover' onClick={handleLogout}>
                    <BiLogOut className='icon' />
                    {mainUser.user && <h4 className='hover'>Log Out</h4>}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <img className='user-roll-icon' src={icon} alt='' />
            <button
              className='img user-name'
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {localStorage.getItem('name')}
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to={'/account'}>
                  <div className='image'>
                    <div className='text'>
                      <h4>{localStorage.getItem('name')}</h4>
                      <label>Roll {mainUser.user.role}</label>
                    </div>
                  </div>
                </Link>
                <Link to='/account'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4> Edit Account info</h4>
                  </button>
                </Link>
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  {mainUser.user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

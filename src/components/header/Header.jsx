/** @format */

import React, { useContext } from 'react';
import logo from '../../assets/images/logo2.png';
import './header.css';
import { User } from './User';
import { nav } from '../../assets/data/data';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './search';

export const Header = () => {
  const location = useLocation();
  window.addEventListener('scroll', function () {
    const header = this.document.querySelector('.header');
    header.classList.toggle('active', this.window.scrollY > 100);
  });

  return (
    <>
      <header className='header'>
        <div className='nav'>
          <div className='scontainer flex'>
            <Link
              className='box'
              to='/'
            >
              <img
                src={logo}
                className='nav-logo'
                alt=''
              />
            </Link>
            {location.pathname.split('/')[1] === 'blogs' ? (
              <>
                <SearchBar />
                {/* <form action='/' method='get'>
                  <label htmlFor='header-search'>
                    <span className='visually-hidden'>Search blog posts</span>
                  </label>
                  <input
                    type='text'
                    id='header-search'
                    placeholder='Search blog posts'
                    name='s'
                  />
                  <button type='submit'>Search</button>
                </form> */}
              </>
            ) : (
              <></>
            )}
            <div className='account flexCenter'>
              <User />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

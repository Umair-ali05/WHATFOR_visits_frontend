/** @format */
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SingleCard } from '../blog/singleblog';
import baseUrl from '../../urlConfigFile';

export const SearchBar = () => {
  const [placeName, setPlaceName] = useState();
  const [errors, setErrors] = useState();
  const location = useLocation();
  let placeType = location.pathname.split('/')[2];
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${baseUrl.url}blogs/${placeType}/${placeName}`
      );

      if (res.data.post.success) {
        localStorage.setItem('post', JSON.stringify(res.data.post.post));
        window.location.replace('/single-Card');
        // <SingleCard  />;
      } else {
        localStorage.setItem('error', res.data.err);
        window.location.replace('/single-Card');
      }
    } catch (error) {
      localStorage.setItem('error', error.message);
      window.location.replace('/single-Card');
    }
  };

  return (
    <form
      style={{
        background: 'black',
        border: 'none',
        flexDirection: 'row',
        width: '24%',
        padding: '10px',
        alignItems: 'center',
        color: 'white',
      }}
      onSubmit={onSubmit}
    >
      <input
        onInput={(e) => setPlaceName(e.target.value)}
        type='text'
        id='header-search'
        style={{
          border: '1px solid orange',
          marginBottom: '0',
          marginRight: '8px',
        }}
        placeholder='Search post by name'
        name='s'
      />
      <button
        style={{
          padding: '14px',
          background: 'orange',
          height: '30px',
          padding: '9px 10px',
        }}
        type='submit'
      >
        Search
      </button>
    </form>
  );
};

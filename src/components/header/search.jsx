/** @format */
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SingleCard } from '../blog/singleblog';
import baseUrl from '../../urlConfigFile';
import Toast from '../../utils/utils';

export const SearchBar = () => {
  const [placeName, setPlaceName] = useState();
  const location = useLocation();
  let placeType = location.pathname.split('/')[2];
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${baseUrl.url}blogs/${placeType}/${placeName}`
      );
      if (res.data.post.success) {
        Toast.successToastMessage(res.data.post.message);

        localStorage.setItem('post', JSON.stringify(res.data.post.post));
        window.location.replace('/single-Card');
        <SingleCard />;
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
    <form
      style={{
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
          border: '1px solid  #598c5e',
          marginBottom: '0',
          marginRight: '8px',
        }}
        placeholder='Search post by name'
        name='s'
      />
      <button
        style={{
          padding: '14px',
          background: '#598c5e',
          color: 'white',
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

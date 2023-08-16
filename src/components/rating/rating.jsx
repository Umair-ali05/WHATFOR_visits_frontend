/** @format */

import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import baseUrl from '../../urlConfigFile';
import Toast from '../../utils/utils';

export const RatingBlog = (props) => {
  const location = useLocation();
  const [rating, setRating] = useState();
  let id = props.id.split('/')[2]; // initial rating value

  // Catch Rating value
  const handleRating = async (rate) => {
    setRating(rate);
    getRating(rate);
    // Some logic
  };
  // useEffect(() => {
  //   console.log('hiii', rating);
  //   getRating(rating);
  // }, [rating]);

  const getRating = async (rated) => {
    try {
      const res = await axios.put(
        `${baseUrl.url}rating/${id}`,
        { totalStars: rated },
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      if (res.data.user.success) {
        Toast.successToastMessage(res.data.user.message);
        window.location.replace(`${location.pathname}`);
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
    <div className='App'>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={20}
        label
        transition
        fillColor='orange'
        emptyColor='gray'
        className='foo' // Will remove the inline style if applied
      />
    </div>
  );
};

export const GetRating = (props) => {
  return (
    <div className='App'>
      <Rating
        initialValue={props.rating.totalStars}
        size={20}
        readonly={true}
        label
        transition
        fillColor='orange'
        emptyColor='gray'
        className='foo' // Will remove the inline style if applied
      />
    </div>
  );
};

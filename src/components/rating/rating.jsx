/** @format */

import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import baseUrl from '../../urlConfigFile';

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

      window.location.replace(`${location.pathname}`);
      if (res.data) {
        localStorage.setItem('rated', true);
        window.location.replace(`${location.pathname}`);
      }
    } catch (error) {
      window.location.replace(`${location.pathname}`);
      localStorage.setItem('rated', true);
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

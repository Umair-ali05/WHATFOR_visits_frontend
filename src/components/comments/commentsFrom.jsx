import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import baseUrl from '../../urlConfigFile';

export const CommentForm = (props) => {
  const location = useLocation();
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}${props.name}/${props._id}`,
        { text: comment },
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );

      if (res.data.post.success) {
        window.location.replace(location.pathname);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='comment-form'>
        <label htmlFor='comment'>Comment *</label>
        <input
          type='text'
          id='comment'
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='submit'
          className='button'
        >
          Post
        </button>
      </div>
    </form>
  );
};

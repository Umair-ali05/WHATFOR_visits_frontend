import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import baseUrl from '../../urlConfigFile';

export const CommentForm = (props) => {
  const location = useLocation();
  const [comment, setComment] = useState('');
  const [file, setFile] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('text', comment);
      if (file) {
        formData.append('image', file);
      }

      const res = await axios.post(
        `${baseUrl.url}${props.name}/${props._id}`,
        formData,
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
    <div className='form-main-div'>
      <form onSubmit={handleSubmit}>
        <div className='comment-form'>
          {props.name === 'reply-comment' ? (
            <input
              className='reply-comment-image'
              type='file'
              placeholder='select a picture'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
          ) : (
            <></>
          )}
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
    </div>
  );
};

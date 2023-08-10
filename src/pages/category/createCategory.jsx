/** @format */

import './createCategory.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';
import Toast from '../../utils/utils';
import baseUrl from '../../urlConfigFile';

export const CreateCategory = () => {
  const [category, setCategory] = useState();
  const [file, setFile] = useState(null);

  const addPost = async (data) => {
    try {
      const res = await axios.post(`${baseUrl.url}category`, data, {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });

      if (res.data.post.success) {
        Toast.successToastMessage(res.data.post.message);
        window.location.replace('/');
      } else {
        Toast.errorToastMessage(res.data.post.message);
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.err.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', file);
    data.append('category', category);

    addPost(data);
  };

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='login-header'>
            <h1>Add Category</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'grey',
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              >
                {file ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    src={URL.createObjectURL(file)}
                    alt='uploaded image'
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <p style={{ textAlign: 'center', lineHeight: '100px' }}>
                    Click to upload image
                  </p>
                )}
              </div>
              <input
                type='file'
                accept='image/*'
                id='image-upload'
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                style={{ display: 'none' }}
              />
            </div>

            <div className='p-title'>
              <p>category</p>
              <input
                type='text'
                placeholder='Title'
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <button className='button post-btn'>Create Category</button>
          </form>
        </div>
      </section>
    </>
  );
};

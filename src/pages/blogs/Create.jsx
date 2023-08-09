/** @format */

import './create.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../../utils/utils';
import { useLocation } from 'react-router-dom';
import baseUrl from '../../urlConfigFile';

export const Create = () => {
  const [placeType, setType] = useState('');
  const [placeCountry, setCountry] = useState('');
  const [placeCity, setCity] = useState('');
  const [placeName, setTitle] = useState('');
  const [placeDescription, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  const location = useLocation();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${baseUrl.url}category`);

      if (res.data.posts.success) {
        Toast.successToastMessage(res.data.posts.message);
        setCategory(res.data.posts.post);
      } else {
        Toast.errorToastMessage(res.data.posts.message);
      }
    } catch (error) {
      if (error.response.data)
        Toast.errorToastMessage(error.response.data.err.message);
      else {
        Toast.errorToastMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addPost = async (data) => {
    try {
      const res = await axios.post(`${baseUrl.url}blog`, data, {
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
    data.append('placeName', placeName);
    data.append('placeType', placeType);
    data.append('placeCountry', placeCountry);
    data.append('placeCity', placeCity);
    data.append('image', file);
    data.append('placeDescription', placeDescription);
    data.append('recommendation', recommendation);

    addPost(data);
  };

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
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
              <div className='select'>
                <p>Select category</p>

                {category.length === 0 ? (
                  <select>
                    <option value=''>no Category</option>
                  </select>
                ) : (
                  <>
                    <select
                      value={placeType}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>select</option>
                      {category.map((category) => (
                        <option
                          key={category._id}
                          value={category.category}
                        >
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <input
                type='file'
                id='inputfile'
                style={{ display: 'none' }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <div className='p-title'>
              <p>Title</p>
              <input
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='p-title'>
              <p>Country</p>
              <input
                type='text'
                placeholder='Country'
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className='p-title'>
              <p>City</p>
              <input
                type='text'
                placeholder='City'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <span>Set Recommendation *</span>
            <select onChange={(e) => setRecommendation(e.target.value)}>
              <option value=''>Select Recommendation</option>
              <option value='General'>General</option>
              <option value='Important'>Recommended</option>
            </select>

            <div className='description'>
              <p>Description</p>
              <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <button className='button post-btn'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  );
};

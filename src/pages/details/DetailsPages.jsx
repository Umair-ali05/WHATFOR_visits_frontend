/** @format */

import React, { useEffect, useState } from 'react';
import './details.css';
import '../../components/header/header.css';

import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { decodeToken } from 'react-jwt';
import { Comments } from '../../components/comments/commets';
import { CommentForm } from '../../components/comments/commentsFrom';
import { GetRating, RatingBlog } from '../../components/rating/rating';
import baseUrl from '../../urlConfigFile';
import Toast from '../../utils/utils';
import { FaMapMarkerAlt, FaPhone, FaClock, FaGlobe } from 'react-icons/fa';

export const DetailsPages = () => {
  const location = useLocation();

  let admin = localStorage.getItem('Authorization');
  let mainUser;
  if (admin) {
    mainUser = decodeToken(admin);
  } else {
    mainUser = '';
  }

  // step 4 for update
  const [title, setTitle] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState();
  const [file, setFile] = useState([]);
  const [placeAddress, setAddress] = useState('');
  const [placeWebsite, setWebsite] = useState('');
  const [placePhone, setPhone] = useState('');
  const [placeTime, setTime] = useState('');
  const [image, setImage] = useState();
  const [comments, setComments] = useState([]);

  const [update, setUpdate] = useState(false);

  const [show, setShow] = useState(false);
  const [post, setPost] = useState({});
  let [stars, setStars] = useState({});

  const getPost = async () => {
    try {
      const res = await axios.get(`${baseUrl.url}${location.pathname}`);

      if (res.data.post.success) {
        setPost(res.data);
        setName(res.data.post.post.placeName);
        setStars(res.data.post.post);
        setCountry(res.data.post.post.placeCountry);
        setCity(res.data.post.post.placeCity);
        setTitle(res.data.post.post.placeType);
        setAddress(res.data.post.post.placeAddress);
        setWebsite(res.data.post.post.placeWebsite);
        setPhone(res.data.post.post.placePhone);
        setTime(res.data.post.post.placeTime);
        setDesc(res.data.post.post.placeDescription);
        setRating(res.data.post.post.rated);
        setImage(res.data.post.post.placeImageUrl);
        setComments(res.data.post.post.comments);
        Toast.successToastMessage(res.data.post.message);
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
  useEffect(() => {
    getPost();
  }, [location.pathname]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${baseUrl.url}${location.pathname}`, {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });
      window.location.replace(`/blogs/${post.post.post.placeType}`);
      if (res.data.user.success) {
        Toast.successToastMessage(res.data.user.message);
        window.location.replace('/login');
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

  // setp 4
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('placeName', name);
      formData.append('placeDescription', desc);
      formData.append('placeAddress', placeAddress);
      formData.append('placeWebsite', placeWebsite);
      formData.append('placePhone', placePhone);
      formData.append('placeTime', placeTime);
      formData.append('image', file);
      // ... append other fields

      const res = await axios.put(
        `${baseUrl.url}${location.pathname}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.post.success) {
        Toast.successToastMessage(res.data.post.message);
        window.location.reload(location.pathname);
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

  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='wrapper'>
            <div className='left'>
              <a
                href={placeWebsite}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                <img
                  src={image}
                  alt=''
                />
              </a>
            </div>
            {!mainUser ? (
              <>
                <div className='right'>
                  <div className='user-title'>{title}</div>
                  <div className='user-rating'>
                    <GetRating rating={stars} />
                  </div>
                  <div className='user-roll-name'>{name}</div>
                  <div className='user-roll-name'>{country}</div>
                  <div className='user-roll-name'>{city}</div>
                  <div className='user-roll-name'>
                    <FaMapMarkerAlt className='icon' />
                    {placeAddress}
                  </div>
                  <div className='user-roll-name'>
                    <FaPhone className='icon' />
                    {placePhone}
                  </div>
                  <div className='user-roll-name'>
                    <FaClock className='icon' />
                    {placeTime}
                  </div>
                  <div className='user-website'>
                    <FaGlobe className='icon' />
                    <a
                      href={placeWebsite}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {placeWebsite}
                    </a>
                  </div>
                  <div className='user-roll-desc'>{desc}</div>
                </div>
              </>
            ) : mainUser.user.role === 'Admin' ? (
              <div className='right'>
                <div className='user-title'>{title}</div>
                <div className='user-rating'>
                  <div className='user-rating'>
                    <GetRating rating={stars} />
                  </div>
                </div>{' '}
                <div className='user-roll-name'>{name}</div>
                <div className='user-roll-name'>{country}</div>
                <div className='user-roll-name'>{city}</div>
                <div className='user-roll-name'>
                  {' '}
                  <FaMapMarkerAlt className='icon' />
                  {placeAddress}
                </div>
                <div className='user-roll-name'>
                  <FaPhone className='icon' />
                  {placePhone}
                </div>
                <div className='user-roll-name'>
                  <FaClock className='icon' />
                  {placeTime}
                </div>
                <div className='user-website'>
                  <FaGlobe className='icon' />
                  <a
                    href={placeWebsite}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {placeWebsite}
                  </a>
                </div>
                <div className='user-roll-desc'>{desc}</div>
                <div className='buttons'>
                  <button
                    className='button'
                    onClick={() => setUpdate(true)}
                  >
                    Edit Post <BsPencilSquare />
                  </button>
                  <button
                    className='button '
                    onClick={handleDelete}
                  >
                    Delete Post <AiOutlineDelete />
                  </button>
                  {update && (
                    <button
                      className='button'
                      onClick={handleUpdate}
                    >
                      Update Post
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className='right'>
                  <div className='user-title'>{title}</div>
                  <div className='user-rating'>
                    {localStorage.getItem('rated') ? (
                      <>
                        <GetRating rating={stars} />
                      </>
                    ) : (
                      <RatingBlog id={location.pathname} />
                    )}
                  </div>
                  <div className='user-roll-name'>{name}</div>
                  <div className='user-roll-name'>{country}</div>
                  <div className='user-roll-name'>{city}</div>
                  <div className='user-roll-name'>
                    {' '}
                    <FaMapMarkerAlt className='icon' />
                    {placeAddress}
                  </div>
                  <div className='user-roll-name'>
                    <FaPhone className='icon' />
                    {placePhone}
                  </div>
                  <div className='user-roll-name'>
                    <FaClock className='icon' />
                    {placeTime}
                  </div>
                  <div className='user-website'>
                    <FaGlobe className='icon' />
                    <a
                      href={placeWebsite}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {placeWebsite}
                    </a>
                  </div>
                  <div className='user-roll-desc'>{desc}</div>
                </div>
              </>
            )}
          </div>
          {mainUser && mainUser.user.role !== 'Admin' ? (
            <div>
              {comments.length !== 0 ? (
                <Comments
                  className='comment-b1'
                  comments={comments}
                />
              ) : (
                <></>
              )}
              {show && (
                <CommentForm
                  className='comment-b2'
                  name='comment'
                  _id={post.post.post._id}
                />
              )}
              <button
                className='comment-btn'
                onClick={() => {
                  setShow(true);
                }}
              >
                Add a Comment
              </button>
            </div>
          ) : (
            <>
              <div>
                {comments.length !== 0 ? (
                  <Comments comments={comments} />
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
          {update && (
            <div>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                type='text'
                placeholder='Title'
                value={name}
                className='updateInput'
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='text'
                placeholder='Address'
                value={placeAddress}
                className='updateInput'
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type='text'
                placeholder='Website'
                value={placeWebsite}
                className='updateInput'
                onChange={(e) => setWebsite(e.target.value)}
              />
              <input
                type='text'
                placeholder='Phone'
                value={placePhone}
                className='updateInput'
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type='text'
                placeholder='Time'
                value={placeTime}
                className='updateInput'
                onChange={(e) => setTime(e.target.value)}
              />

              <input
                type='text'
                placeholder='Description'
                className='updateInput'
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

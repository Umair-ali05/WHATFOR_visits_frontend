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
  const [rating, setRating] = useState();
  const [image, setImage] = useState();
  const [comments, setComments] = useState([]);

  const [update, setUpdate] = useState(false);

  const [show, setShow] = useState(false);
  const [post, setPost] = useState({});
  let [stars, setStars] = useState({});

  const getPost = async () => {
    const res = await axios.get(`${baseUrl.url}${location.pathname}`);
    setPost(res.data);
    setName(res.data.post.post.placeName);
    setStars(res.data.post.post);
    setTitle(res.data.post.post.placeType);
    setDesc(res.data.post.post.placeDescription);
    setRating(res.data.post.post.rated);
    setImage(res.data.post.post.placeImageUrl);
    setComments(res.data.post.post.comments);
  };
  useEffect(() => {
    getPost();
  }, [location.pathname]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl.url}${location.pathname}`, {
        headers: { Authorization: localStorage.getItem('Authorization') },
      });
      window.location.replace(`/blogs/${post.post.post.placeType}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  // setp 4
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${baseUrl.url}${location.pathname}`,
        {
          placeName: name,
          placeDescription: desc,
        },
        {
          headers: { Authorization: localStorage.getItem('Authorization') },
        }
      );
      window.location.reload(location.pathname);
    } catch (error) {}
  };

  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='wrapper'>
            <div className='left'>
              <img
                src={image}
                alt=''
              />
            </div>
            {!mainUser ? (
              <>
                <div className='page-title'>{title}</div>
                <div className='user-rating'>
                  <GetRating rating={stars} />
                </div>
                <div className='page-name'>{name}</div>
                <div className='page-des'>{desc}</div>
                <div>
                  {comments.length !== 0 ? (
                    <Comments comments={comments} />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : mainUser.user.role === 'Admin' ? (
              <div className='right'>
                <div className='page-title'>{title}</div>
                <div>
                  {localStorage.getItem('rated') ? (
                    <>
                      <GetRating rating={stars} />
                    </>
                  ) : (
                    <RatingBlog id={location.pathname} />
                  )}
                </div>
                <div className='page-name'>{name}</div>
                <div className='page-des'>{desc}</div>
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
                {update ? (
                  <input
                    type='text'
                    placeholder='title'
                    value={name}
                    className='updateInput'
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <h1>{post.title}</h1>
                )}
                {update ? (
                  <textarea
                    value={desc}
                    cols='30'
                    rows='10'
                    className='updateInput'
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                ) : (
                  <p>{post.desc}</p>
                )}
              </div>
            ) : (
              <>
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
                <div className='user-roll-desc'>{desc}</div>
                <div>
                  {comments.length !== 0 ? (
                    <Comments
                      className='comment-b1'
                      comments={comments}
                    />
                  ) : (
                    <></>
                  )}
                </div>
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
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

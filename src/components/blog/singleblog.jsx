import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../blog/blogCard.css';
import { GetRating } from '../rating/rating';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from 'mdb-react-ui-kit';

export const SingleCard = () => {
  const history = useHistory();
  const [post, setPost] = useState({});

  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem('post'));

    if (storedPost) {
      setPost(storedPost);
    }

    localStorage.removeItem('post');
  }, []);

  const navigateToBlog = () => {
    history.push(`/blog/${post._id}`);
  };

  return (
    <div className='parent'>
      <button
        className='card-btn'
        onClick={navigateToBlog}
      >
        <div className='maindiv'>
          {/* <MDBRipple
          rippleColor='light'
          rippleTag='div'
          className='bg-image hover-overlay'
        > */}
          <div className='imagediv'>
            <img
              src={post.placeImageUrl}
              alt='no image to display'
            />
          </div>
          {/* <a>
            <div
              className='mask'
              style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
            ></div>
          </a> */}
          {/* </MDBRipple> */}
          <div className='paragraphdiv'>
            <MDBCardTitle className='c-title'>{post.placeType}</MDBCardTitle>

            <MDBCardText className='card-name'>{post.placeName}</MDBCardText>
            <MDBCardText className='card-desc'>
              <div className='three-line-description'>
                {post.placeDescription}
              </div>
            </MDBCardText>
          </div>
        </div>
      </button>
    </div>
  );
};

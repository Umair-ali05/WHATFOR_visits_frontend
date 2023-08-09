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
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem('post'));
    const storedError = localStorage.getItem('error');

    if (storedPost) {
      setPost(storedPost);
    }

    if (storedError) {
      setError(storedError);
    }

    localStorage.removeItem('post');
    localStorage.removeItem('error');
  }, []);

  const navigateToBlog = () => {
    history.push(`/blog/${post._id}`);
  };

  const navigateToHome = () => {
    history.replace('/');
  };

  return (
    <div className='single-card-container'>
      {error ? (
        <div className='error-container'>
          <span className='error-message'>{error}</span>
          <button
            className='ok-button'
            onClick={navigateToHome}
          >
            <h1>OK</h1>
          </button>
        </div>
      ) : post._id ? (
        <div className='parent'>
          <button
            className='card-btn'
            onClick={navigateToBlog}
          >
            <MDBCard>
              <MDBRipple
                rippleColor='light'
                rippleTag='div'
                className='bg-image hover-overlay'
              >
                <MDBCardImage
                  src={post.placeImageUrl}
                  alt='no image to display'
                  className='image-size'
                />
                <div
                  className='mask'
                  style={{
                    backgroundColor: 'rgba(251, 251, 251, 0.15)',
                  }}
                ></div>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle className='c-title'>
                  Category: {post.placeType}
                </MDBCardTitle>
                <MDBCardText>
                  <GetRating rating={post} />
                </MDBCardText>
                <MDBCardText className='card-name'>
                  Name: {post.placeName}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </button>
        </div>
      ) : (
        <div className='no-record'>
          <div className='back-btn'>
            <button
              className='go-back-btn'
              onClick={navigateToHome}
            >
              <h1>Back</h1>
            </button>
          </div>
          <div className='no-rec'>
            <span className='no-record-found'>Record not found</span>
          </div>
        </div>
      )}
    </div>
  );
};

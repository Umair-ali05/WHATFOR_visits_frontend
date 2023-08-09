import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
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
import Toast from '../../utils/utils';
import baseUrl from '../../urlConfigFile';

const CardItem = ({ item }) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/blog/${item._id}`);
  };

  return (
    <div className='parent'>
      <button
        className='card-btn'
        onClick={handleCardClick}
      >
        <MDBCard>
          <MDBRipple
            rippleColor='light'
            rippleTag='div'
            className='bg-image hover-overlay'
          >
            <MDBCardImage
              src={item.placeImageUrl}
              alt='no image to display'
              className='image-size'
            />
            <a>
              <div
                className='mask'
                style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle className='c-title'>
              Catagory: {item.placeType}
            </MDBCardTitle>
            <MDBCardText>
              <GetRating rating={item} />
            </MDBCardText>
            <MDBCardText className='card-name'>
              Name: {item.placeName}
            </MDBCardText>
            <MDBCardText className='card-name'>
              Country: {item.placeCountry}
            </MDBCardText>
            <MDBCardText className='card-name'>
              City: {item.placeCity}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </button>
    </div>
  );
};

const CardSection = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <CardItem
          key={item._id}
          item={item}
        />
      ))}
    </>
  );
};

export const Card = () => {
  const [recommended, setRecommended] = useState([]);
  const [general, setGeneral] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${baseUrl.url}${location.pathname}`);

      if (res.data.posts.success) {
        Toast.successToastMessage(res.data.posts.message);
        setRecommended(res.data.posts.post[0].recommended);
        setGeneral(res.data.posts.post[0].general);
      } else {
        setError(res.data.user.message);
      }
    } catch (error) {
      setError(error.response?.data?.err?.message || error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [location.pathname]);

  const navigateToHome = () => {
    history.replace('/');
  };

  return (
    <>
      <div className='signup-header'>
        <h1>Recommended</h1>
      </div>
      {error ? (
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
      ) : (
        <CardSection items={recommended} />
      )}

      <div className='signup-header'>
        <h1>General</h1>
      </div>
      <CardSection items={general} />
    </>
  );
};

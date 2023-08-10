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
        <div className='maindiv'>
          {/* <MDBRipple
            rippleColor='light'
            rippleTag='div'
            className='bg-image hover-overlay'
          > */}
          <div className='imagediv'>
            <img
              src={item.placeImageUrl}
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
            <MDBCardTitle className='c-title'>{item.placeType}</MDBCardTitle>

            <MDBCardText className='card-name'>{item.placeName}</MDBCardText>
            <MDBCardText className='card-desc'>
              <div className='three-line-description'>
                {item.placeDescription}
              </div>
            </MDBCardText>
          </div>
        </div>
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
      }
    } catch (error) {
      if (error.response.data) {
        Toast.errorToastMessage(error.response.data.err.message);
        history.replace('/');
      } else {
        Toast.errorToastMessage(error.message);
        history.replace('/');
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [location.pathname]);

  return (
    <>
      <div className='signup-header'>
        <h1>Recommended</h1>
      </div>
      (
      <CardSection items={recommended} />)
      <div className='signup-header'>
        <h1>General</h1>
      </div>
      <CardSection items={general} />
    </>
  );
};

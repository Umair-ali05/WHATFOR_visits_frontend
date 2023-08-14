import React from 'react';
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import footer from '../footer/footer.css';
export const Footer = () => {
  return (
    <>
      <footer className='boxItems footer-color'>
        <div className='container flex'>
          <div className='social'>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsFacebook className='icon' />
            </a>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <RiInstagramFill className='icon' />
            </a>
            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <AiFillTwitterCircle className='icon' />
            </a>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <AiFillLinkedin className='icon' />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

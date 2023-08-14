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
            <BsFacebook className='icon'href='https://www.wbstudiotour.co.uk/' />
            <RiInstagramFill className='icon' />
            <AiFillTwitterCircle className='icon' />
            <AiFillLinkedin className='icon' />
          </div>
        </div>
      </footer>
    </>
  );
};

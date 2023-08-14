/** @format */

import React from 'react';
import { Category } from './Category';

export const Home = () => {
  return (
    <>
      <div className='layout'>
        <p className='typography'>WELCOME TO WATFORD VISITS</p>;
        <h1 className='explore'>EXPLORE NEW WATFORD WITH US</h1>;
      </div>
      <Category />
      <div className='aboutus'>
        <p className='aboutus-title'>About Us</p>
        <p className='aboutus-paragraph'>
          At our platform, we've created a dynamic and inclusive space where
          individuals from all walks of life can come together to explore,
          share, engage with a world of diverse content and give rating according to their experience Whether you're an
          enthusiastic explorer, an aspiring creator, or simply a curious
          observer, our platform is designed to cater to your interests and
          preferences.
        </p>
      </div>
    </>
  );
};

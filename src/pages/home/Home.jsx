/** @format */

import React from 'react';
import { Category } from './Category';

export const Home = () => {
  return (
    <>
      <div className='layout'>
        <p className='typography'>WELCOME TO WHATFORD VISITS</p>;
        <h1 className='explore'>EXPLORE NEW WORLDS WITH US</h1>;
      </div>
      <Category />
      {/* <Card posts={posts} /> */}
    </>
  );
};

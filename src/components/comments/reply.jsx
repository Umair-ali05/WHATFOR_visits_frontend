/** @format */

import React, { useState } from 'react';
import './reply.css';

export const Reply = (props) => {
  return (
    <>
      {props.reply.map((item) => (
        <>
          <div className='main12'>
            <div className='item-username12'>{item.userName}</div>
            <div className='item-date12'>
              {' '}
              {new Date(item.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            {item.replyImageUrl ? (
              <div>
                <img
                  className='comment-image'
                  src={item.replyImageUrl}
                  alt=''
                />
              </div>
            ) : (
              <></>
            )}
            <div className='item-text12'>{item.text}</div>
          </div>
        </>
      ))}
    </>
  );
};

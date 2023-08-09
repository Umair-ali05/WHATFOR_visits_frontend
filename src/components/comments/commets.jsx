import React, { useState } from 'react';
import { Reply } from './reply';
import { decodeToken } from 'react-jwt';
import { CommentForm } from './commentsFrom';
import './comments.css';

export const Comments = (props) => {
  const [replyStates, setReplyStates] = useState({}); // Store reply states for each comment
  let admin = localStorage.getItem('Authorization');
  let mainUser;
  if (admin) {
    mainUser = decodeToken(admin);
  } else {
    mainUser = '';
  }

  const handleReplyButtonClick = (commentId) => {
    setReplyStates((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  return (
    <>
      {props.comments.map((item) => (
        <div
          key={item._id}
          className='comment-item'
        >
          <div className='main'>
            <div className='item-username'>{item.userName}</div>
            <div className='item-date'>{item.date}</div>
            <div className='item-text'>{item.text}</div>
            {mainUser && (
              <div className='item-text'>{item.chatGPTResponse}</div>
            )}
          </div>
          <div className='item-reply-message'>
            {item.reply.length !== 0 ? <Reply reply={item.reply} /> : null}
          </div>
          {mainUser && (
            <>
              {replyStates[item._id] && (
                <CommentForm
                  name='reply-comment'
                  _id={item._id}
                />
              )}
              <button
                className='reply-btn'
                onClick={() => handleReplyButtonClick(item._id)}
              >
                Reply a comment
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

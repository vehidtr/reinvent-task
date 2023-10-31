import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };
  return (
    <div className='NotFound'>
      <h1>
        Looks like you got lost inside all these{' '}
        <div className='colorful-text'> things.</div>
      </h1>
      <button className='button-lotus redirect-btn' onClick={handleRedirect}>
        Click here to go to Home
      </button>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Buttons.css';

const ToRanking = () => {
  const { buttonName } = this.props;
  return (
    <Link to='/ranking'>
      <button
        className='Button_ranking'
        type='button'
      >
        {buttonName}
      </button>
    </Link>
  );
};

export default ToRanking;

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Buttons.css';

const PlayAgain = ({ buttonName }) => {
  return (
    <Link to="/questions">
      <button
        className="Button_play-again"
        type="button"
      >
        {buttonName}
      </button>
    </Link>
  );
};

export default PlayAgain;

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Buttons.css';

const PlayAgain = () => {
  const { buttonName } = this.props;
  return (
    <Link to="/questions">
      <button
        className="Button_PlayAgain"
        type="button"
      >
        {buttonName}
      </button>
    </Link>
  );
};

export default PlayAgain;

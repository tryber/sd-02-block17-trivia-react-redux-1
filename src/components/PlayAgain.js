import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/Buttons.css';

const PlayAgain = ({ buttonName }) => (
  <Link to="/questions">
    <button
      className="Button_play-again"
      type="button"
    >
      {buttonName}
    </button>
  </Link>
);

export default PlayAgain;

PlayAgain.propTypes = {
  buttonName: PropTypes.string.isRequired,
}

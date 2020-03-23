import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/Buttons.css';

const ToRanking = ({ buttonName }) => (
  <Link to="/ranking">
    <button
      className="Button_ranking"
      type="button"
    >
      {buttonName}
    </button>
  </Link>
);

export default ToRanking;

ToRanking.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

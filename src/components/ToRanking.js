import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleScoreChanges } from '../actions'
import '../style/Buttons.css';

const handleClick = (changeScore) => {
  const player = JSON.parse(localStorage.getItem('player'));
  const invertedScore = player.score * -1;
  player.assertions = 0;
  player.score = 0;
  changeScore(invertedScore);
};

const ToRanking = ({ buttonName, changeScore }) => (
  <Link to="/ranking">
    <button
      className="Button_ranking"
      onClick={() => handleClick(changeScore)}
      type="button"
    >
      {buttonName}
    </button>
  </Link>
);

const mapDispatchToProps = (dispatch) => ({
  changeScore: (value) => dispatch(handleScoreChanges(value)),
});

export default connect(null, mapDispatchToProps)(ToRanking);

ToRanking.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

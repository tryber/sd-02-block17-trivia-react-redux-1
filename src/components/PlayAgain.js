import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleScoreChanges } from '../actions';
import '../style/Buttons.css';

const handleClick = (changeScore) => {
  const state = JSON.parse(localStorage.getItem('state'));
  const invertedScore = state.player.score * -1;
  state.player.assertions = 0;
  state.player.score = 0;
  localStorage.setItem('state', JSON.stringify(state));
  changeScore(invertedScore);
};

const PlayAgain = ({ buttonName, changeScore }) => (
  <Link to="/game">
    <button
      onClick={() => handleClick(changeScore)}
      className="Button_play-again"
      type="button"
    >
      {buttonName}
    </button>
  </Link>
);

const mapDispatchToProps = (dispatch) => ({
  changeScore: (value) => dispatch(handleScoreChanges(value)),
});

export default connect(null, mapDispatchToProps)(PlayAgain);

PlayAgain.propTypes = {
  buttonName: PropTypes.string.isRequired,
  changeScore: PropTypes.func.isRequired,
};

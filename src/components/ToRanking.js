import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleScoreChanges } from '../actions';
import '../style/Buttons.css';

const handleClick = (changeScore) => {
  const state = JSON.parse(localStorage.getItem('state'));
  const invertedScore = state.player.score * -1;
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
  changeScore: PropTypes.func.isRequired,
};

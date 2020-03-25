import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleScoreChanges } from '../actions';
import '../style/Buttons.css';


const handleClick = (changeScore) => {
  const player = JSON.parse(localStorage.getItem("player"));
  const invertedScore = player.score * -1;
  player.assertions = 0;
  player.score = 0;
  localStorage.setItem('player', JSON.stringify(player));
  changeScore(invertedScore);
}

const PlayAgain = ({ buttonName, changeScore }) => (
  <Link to="/questions">
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
};

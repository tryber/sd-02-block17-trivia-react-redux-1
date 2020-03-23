import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handlingInputChanges } from '../actions';
import ConfigurationButon from './configurationButton';
import { getToken, getQuestions } from '../services/triviaAPI';
import '../style/InitialInputs.css';
import getGravatar from '../services/gravatarAPI';

async function handleClick(name, email, categorie = '', difficulty = '', type = '') {
  console.log(categorie, difficulty, type);
  const picture = getGravatar(email);
  const playerStatus = {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
    picture,
  };
  localStorage.setItem('player', JSON.stringify(playerStatus));
  await getToken();
  getQuestions(`&category=${categorie}`, `&difficulty=${difficulty}`, `&type=${type}`);
}

const handleChange = (e, handleInputChange) => {
  const { name, value } = e.target;
  handleInputChange(value, name);
};

const InitialInputs = ({ name, email, handleInputChange, categorie, difficulty, type }) => (
  <div>
    <div className="container-config-btn" data-testid="config-button">
      <ConfigurationButon />
    </div>
    <div className="home-container">
      <label className="home-text" htmlFor="email">Email do Gravatar:</label>
      <input
        className="home-inputs-and-btn"
        value={email}
        id="email"
        onChange={(event) => handleChange(event, handleInputChange)}
        name="email"
        type="text"
        data-testid="input-gravatar-email"
      />
      <label className="home-text" htmlFor="name">Nome do jogador:</label>
      <input
        className="home-inputs-and-btn"
        value={name}
        id="name"
        onChange={(event) => handleChange(event, handleInputChange)}
        name="name"
        type="text"
        data-testid="input-player-name"
      />
      <button
        className="home-inputs-and-btn home-btn-play"
        onClick={() => handleClick(name, email, categorie, difficulty, type)}
        data-testid="btn-play"
      >
        JOGAR!
      </button>
    </div>
  </div>
);

const mapStateToProps = ({
  handleInputChange,
  inputChanges: { name, email },
  selectorsChange: { categorie, difficulty, type }
}) => (
    {
      name, email, handleInputChange, categorie, difficulty, type,
    }
  );

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (value, name) => dispatch(handlingInputChanges(value, name)),
});

InitialInputs.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialInputs);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handlingInputChanges } from '../actions';
import ConfigurationButon from './configurationButton';
import { getToken, getQuestions } from '../services/triviaAPI';
import getGravatar from '../services/gravatarAPI';

async function handleClick(name, email) {
  const picture = getGravatar(email);
  const playerStatus = {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
    picture
  };
  localStorage.setItem('player', JSON.stringify(playerStatus));
  await getToken();
  getQuestions();
  console.log('agora tem que fazer as requisições de API');
}

const handleChange = (e, handleInputChange) => {
  const { name, value } = e.target;
  handleInputChange(value, name);
};

const InitialInputs = ({ name, email, handleInputChange }) => (
  <div>
    <label htmlFor="email">Email do Gravatar</label>
    <input
      value={email}
      onChange={(event) => handleChange(event, handleInputChange)}
      name="email"
      type="text"
      data-testid="input-gravatar-email"
    />
    <label htmlFor="name">Nome do jogador</label>
    <input
      value={name}
      onChange={(event) => handleChange(event, handleInputChange)}
      name="name"
      type="text"
      data-testid="input-player-name"
    />
    <button onClick={() => handleClick(name, email)} data-testid="btn-play">JOGAR!</button>
    <div data-testid="config-button"><ConfigurationButon /></div>
  </div>
);

const mapStateToProps = ({ handleInputChange, inputChanges: { name, email } }) => (
  {
    name, email, handleInputChange,
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

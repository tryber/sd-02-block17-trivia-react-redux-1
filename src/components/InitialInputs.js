import React from 'react';
import { connect } from 'react-redux';
import { handlingInputChanges } from '../actions';
import ConfigurationButon from './configurationButton';

const handleClick = (name, email) => {
  const playerStatus = {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email
  }
  localStorage.setItem('player', JSON.stringify(playerStatus));
  console.log('agora tem que fazer as requisições de API');
}

const handleChange = (e, handleInputChange) => {
  const { name, value } = e.target;
  handleInputChange(value, name);
}

const InitialInputs = ({ name, email, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="email">Email do Gravatar</label>
      <input value={email} onChange={(event) => handleChange(event, handleInputChange)}
        name='email' type="text" data-testid='input-gravatar-email' />
      <label htmlFor="name">Nome do jogador</label>
      <input value={name} onChange={(event) => handleChange(event, handleInputChange)}
        name='name' type="text" data-testid='input-player-name' />
      <button onClick={() => handleClick(name, email)} data-testid='btn-play'>JOGAR!</button>
      <div data-testid='config-button'><ConfigurationButon /></div>
    </div>
  );
}

const mapStateToProps = ({ handleInputChange, inputChanges: { name, email } }) => (
  {
    name, email, handleInputChange
  }
)

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (value, name) => dispatch(handlingInputChanges(value, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialInputs);

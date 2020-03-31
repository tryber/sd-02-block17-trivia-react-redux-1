import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getGravatar from '../services/gravatarAPI';
import ConfigurationButton from './ConfigurationButton';
import { handlingInputChanges } from '../actions';
import { getToken } from '../services/triviaAPI';
import '../style/InitialInputs.css';

async function handleClick(name, email) {
  const picture = getGravatar(email);
  const initial = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
      picture,
    },
  };
  localStorage.setItem('state', JSON.stringify(initial));
  await getToken();
}

const handleChange = (e, handleInputChange) => {
  const { name, value } = e.target;
  handleInputChange(value, name);
};

const disableButton = (name, email) => {
  if (name !== '' && email !== '') {
    return false;
  }
  return true;
};

const InitialInputs = ({ name, email, handleInputChange }) => (
  <div>
    <div className="container-config-btn">
      <ConfigurationButton />
    </div>
    <div className="home-container">
      <label className="home-text" htmlFor="email">Email do Gravatar:</label>
      <input
        className="home-inputs-and-btn"
        value={email || ''}
        id="email"
        onChange={(event) => handleChange(event, handleInputChange)}
        name="email"
        type="text"
        data-testid="input-gravatar-email"
      />
      <label className="home-text" htmlFor="name">Nome do jogador:</label>
      <input
        className="home-inputs-and-btn"
        value={name || ''}
        id="name"
        onChange={(event) => handleChange(event, handleInputChange)}
        name="name"
        type="text"
        data-testid="input-player-name"
      />
      <Link to="/game">
        <button
          className="home-inputs-and-btn home-btn-play"
          disabled={disableButton(name, email)}
          onClick={() => handleClick(name, email)}
          data-testid="btn-play"
        >
          JOGAR!
      </button>
      </Link>
    </div>
  </div>
);


const mapStateToProps = ({
  handleInputChange,
  inputChanges: { name, email },
}) => (
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

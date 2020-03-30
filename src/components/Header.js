import React from 'react';
import { connect } from 'react-redux';
import ConfigurationButton from './ConfigurationButton';
import '../style/Header.css';

const showConfig = () => {
  if (window.location.href.includes('feedback')) return <ConfigurationButton />;
  return '';
};

class Header extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || [];
    const { name, picture, score } = state.player || '';
    return (
      <div className="Header_father">
        <div className="Header_image-and-name">
          <img
            className="Header_player-image"
            alt={`${name} player gravatar`}
            src={picture}
          />
          <p
            data-testid="header-player-name"
            className="Header_player-name"
          >
            Jogador: {name || ''}
          </p>
        </div>
        <div className="Header_score">
          <p
            data-testid="header-score"
            className="Header_score-text"
          >
            Pontos: {score}
          </p>
          {showConfig()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ scoreChangeReducer: { score } }) => ({ storeScore: score });

export default connect(mapStateToProps)(Header);

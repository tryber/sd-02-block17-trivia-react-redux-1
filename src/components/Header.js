import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfigurationButton from './ConfigurationButton';
import '../style/Header.css';

const showConfig = () => {
  if (window.location.href.includes('feedback')) return <ConfigurationButton />;
  return '';
};

class Header extends React.Component {
  render() {
    const { score } = this.props;
    const player = JSON.parse(localStorage.getItem('player'));
    const { name, picture } = player;
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
            Jogador: {name}
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

const mapStateToProps = ({ scoreChangeReducer: { score } }) => ({ score });

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);

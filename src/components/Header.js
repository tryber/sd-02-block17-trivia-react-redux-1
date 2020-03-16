import React from 'react';
import Proptypes from 'prop-types';
import '../style/Header.css'

class Header extends React.Component {
  render() {
    const player = JSON.parse(localStorage.getItem('player'));
    const { name, score, picture } = player;
    return (
      <div className="Header_father">
        <div className="Header_image-and-name">
          <img
            className="Header_player-image"
            alt={`${name} player gravatar`}
            src={picture}
          />
          <p className="Header_player-name">Jogador: {name}</p>
        </div>
        <div className="Header_score">
          <p className="Header_score-text">Pontos: {score}</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: Proptypes.string,
  srcAvatar: Proptypes.string,
  points: Proptypes.string,
}

export default Header;

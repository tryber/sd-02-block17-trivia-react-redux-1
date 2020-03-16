import React from 'react';

class Header extends React.Component {
  render() {
    const { name, srcAvatar, points } = this.props;
    return (
      <div className="Header_father">
        <div className="Header_image-and-name">
          <img
            className="Header_player-image"
            alt={`${name} player gravatar`}
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          />
          <p>Jogador: {name}</p>
        </div>
        <div className="Header_score">
          <p>Pontos: {points}</p>
        </div>
      </div>
    );
  }
}

export default Header;

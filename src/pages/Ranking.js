import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Ranking.css';

const imgComponent = (picture, position) => (
  <img
    data-testid={`profile-picture-${position}`}
    className="ranking-img"
    src={picture}
    alt="Player pictures"
  />
);

const Ranking = () => {
  const getLocalStor = JSON.parse(localStorage.getItem('ranking')) || [];
  getLocalStor.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
  return (
    <div className="Ranking_father">
      <h1 className="ranking-title">Ranking</h1>
      {getLocalStor.map(({ name, score, picture }, index) => {
        const position = index + 1;
        return (
          <div className="ranking-item" key={`${name}-${score}`}>
            {imgComponent(picture, position)}
            <span data-testid={`${name}-${position}`} className="ranking-text">
              {name} - {score} pontos
            </span>
          </div>
        );
      })
      }
      <Link to="/">
        <button data-testid="btn-go-home" className="Button_home">Voltar ao início</button>
      </Link>
    </div>
  );
};

export default Ranking;

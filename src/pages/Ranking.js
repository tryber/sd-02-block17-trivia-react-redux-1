import React from 'react';
import '../style/Ranking.css';

const getLocalStor = JSON.parse(localStorage.getItem('ranking'));
getLocalStor.sort((a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
});
const Ranking = () => (
  <div>
    <h1 className="ranking-title">Ranking</h1>
    {getLocalStor.map(({name, score, picture}, position) => (
      <div className="ranking-item" key={`${name}-${score}`}>
        <img
          data-testid={`profile-picture-${position}`}
          className="ranking-img"
          src={picture}
        />
        <span
          data-testid={`${name}-${position}`}
          className="ranking-text"
        >
          {name} - {score} pontos
          </span>
      </div>
    )
    )}
  </div>
);

export default Ranking;

import React from 'react';
import '../style/Ranking.css';

let getLocalStor = JSON.parse(localStorage.getItem('ranking'));
getLocalStor.sort((a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
});
const Ranking = () => (
  <div>
    <h1 className="ranking-title">Ranking</h1>
    {getLocalStor.map((item) => {
      return (
        <div className="ranking-item" key={`${item.name}-${item.score}`}>
          <img
            data-testid={`profile-picture-${position}`}
            className="ranking-img"
            src={item.picture}
          />
          <span
            data-testid="${nome-do-jogador}-${position}"
            className="ranking-text"
          >
            {item.name} - {item.score} pontos
          </span>
        </div>
      )
    })}
  </div>
);

export default Ranking;

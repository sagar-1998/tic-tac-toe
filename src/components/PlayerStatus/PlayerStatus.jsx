import React from "react";
import "./PlayerStatus.scss";
const PlayerStatus = (props) => {
  const { player1Winnings, player2Winnings, draws } = props;
  const playersWinnings = [
    { title: "Player-1", score: player1Winnings },
    { title: "Draws", score: draws },
    { title: "Player-2", score: player2Winnings },
  ];
  return (
    <div className="PlayerStatus">
      {playersWinnings.map((el) => (
        <div className="players">
          <p className="player-name">{el.title}</p>
          <p className="player-score">{el.score}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatus;

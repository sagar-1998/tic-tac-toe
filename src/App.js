import { useState } from "react";
import "./App.scss";
import TicTacToe from "./components/TicTacToe/TicTacToe";

function App() {
  // States to count the winnings and Number of draws
  const [player1Winnings, setPlayer1Winnings] = useState(0);
  const [player2Winnings, setPlayer2Winnings] = useState(0);
  const [draws, setDraws] = useState(0);

  return (
    <div className="App">
      {/* Game Component */}
      <TicTacToe
        setPlayer1Winnings={setPlayer1Winnings}
        setPlayer2Winnings={setPlayer2Winnings}
        player1Winnings={player1Winnings}
        player2Winnings={player2Winnings}
        draws={draws}
        setDraws={setDraws}
      />
    </div>
  );
}

export default App;

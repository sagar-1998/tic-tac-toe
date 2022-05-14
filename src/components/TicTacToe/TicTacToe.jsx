import React, { useEffect, useState } from "react";
import PlayerStatus from "../PlayerStatus/PlayerStatus";
import Cell from "./Cell/Cell";
import "./TicTacToe.scss";
const TicTacToe = (props) => {
  const {
    setPlayer1Winnings,
    setPlayer2Winnings,
    player1Winnings,
    player2Winnings,
    setDraws,
    draws,
  } = props;
  const [currentClass, setCurrentClass] = useState("x");
  const [winnerFound, setWinnerFound] = useState(false);
  const [winningText, setWinningText] = useState("");
  const [cellData, setCellData] = useState([
    { id: 0, cellClassName: "" },
    { id: 1, cellClassName: "" },
    { id: 2, cellClassName: "" },
    { id: 3, cellClassName: "" },
    { id: 4, cellClassName: "" },
    { id: 5, cellClassName: "" },
    { id: 6, cellClassName: "" },
    { id: 7, cellClassName: "" },
    { id: 8, cellClassName: "" },
  ]);
  const [cellElements, setCellElements] = useState();
  useEffect(() => {
    setCellElements(document.querySelectorAll("[data-cell]"));
  }, []);
  // This will help to calculate who is the winner
  const WINNING_COMBINATION = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // This function will print the currentClass i.e. X or O in the cell
  function printClass(cell, currentClass) {
    cell.target.classList.add(currentClass);
  }
  // This function will switch the turns of the player
  function switchTurn() {
    setCurrentClass((prevProps) => (prevProps === "x" ? "circle" : "x"));
  }
  // This is the function which will check for the winner
  function checkWin() {
    return WINNING_COMBINATION.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
  // This function will calculate the count of the winning player on the basis of the currentClass
  const winCounter = (currentClass) => {
    if (currentClass === "x") {
      setPlayer1Winnings((player1Winnings) => player1Winnings + 1);
    } else {
      setPlayer2Winnings((player2Winnings) => player2Winnings + 1);
    }
  };
  // This function will determine whether the game got draw or won by Player and set values accordingly
  const endGame = (draw) => {
    if (draw) {
      setWinningText(`Draw !`);
      setWinnerFound(true);
    } else {
      setWinnerFound(true);
      setWinningText(`${currentClass === "x" ? "X" : "O"} Won!`);
      winCounter(currentClass);
    }
  };
  // This function check the draw condition of the game
  const isDraw = () => {
    return [...cellElements].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("circle");
    });
  };
  // This function will reset the game but not the winning count of the player
  const resetGame = () => {
    setWinnerFound(false);
    cellElements.forEach((cell) => {
      cell.classList.remove("x");
      cell.classList.remove("circle");
    });
  };

  // This Reset everything including the player winning count
  const restartGame = () => {
    resetGame();
    setCurrentClass("x");
    setPlayer1Winnings(0);
    setPlayer2Winnings(0);
    setDraws(0);
  };

  // This function will determine what will happen when a user click on the cell
  // It Prints the X or O in the cell
  // Check for the win and draw conditions
  // Switch Turns
  const handleCellClick = (e) => {
    if (
      !e.target.classList.contains("x") &&
      !e.target.classList.contains("circle")
    ) {
      printClass(e, currentClass);
      if (checkWin()) {
        endGame(false);
      } else if (isDraw()) {
        setDraws((draws) => draws + 1);
        endGame(true);
      } else {
        switchTurn();
      }
    }
  };

  return (
    <div className="TicTacToe">
      <h1 className="heading">Tic Tac Toe</h1>

      <div className="board-and-status">
        <p className="turn-message">
          {currentClass === "x" ? "Player-1 " : "Player-2 "}(
          {currentClass === "circle" ? "O" : "X"}'s) Turn
        </p>
        <div className={`board ${currentClass}`} id="board">
          {cellData.map((el, index) => (
            <Cell
              key={index + el}
              cellData={el}
              setCellData={setCellData}
              handleClick={handleCellClick}
            />
          ))}
        </div>
        <PlayerStatus
          player1Winnings={player1Winnings}
          setPlayer1Winnings={setPlayer1Winnings}
          player2Winnings={player2Winnings}
          setPlayer2Winnings={setPlayer2Winnings}
          setDraws={setDraws}
          draws={draws}
        />
      </div>

      {/* Winner Message and Restart and Reset Game buttons */}
      {winnerFound && (
        <div className="winning-msg-container">
          <p className="winning-msg">{winningText}</p>
          <div className="reset-btns-container">
            <div className="btn-container">
              <button className="reset-button" onClick={resetGame}>
                Reset Board
              </button>
              <p className="reset-description">Resets the board only</p>
            </div>
            <div className="btn-container">
              <button className="reset-button" onClick={restartGame}>
                Restart Game
              </button>
              <p className="reset-description">Resets Everything!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;

import { useLayoutEffect, useState } from "react";
import Banner from "../components/Banner";
import PlayerOrb from "../components/PlayerOrb";

enum Player {
  X = "X",
  O = "O",
}

export default function GamePage() {
  const [board, setBoard] = useState<(Player | null)[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);
  const [winner, setWinner] = useState<Player | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<number[][] | null>(null);

  const winningCombinations = [
    // first row
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    // second row
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    // third row
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // first column
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    // second column
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    // third column
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // left to right diagonal
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    // right to left diagonal
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const generateNewEmptyBoard = (): void => {
    const board: (Player | null)[][] = [];

    for (let row = 0; row < 3; row++) {
      board[row] = [];
      for (let col = 0; col < 3; col++) {
        board[row][col] = null;
      }
    }

    setBoard(board);
  };

  const toggleCurrentPlayer = (): void => {
    setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
  };

  const isDraw = (): boolean => {
    let emptyFieldsNum = 0;

    board.forEach((row) => {
      if (row.includes(null)) {
        return emptyFieldsNum++;
      }
    });

    // if there are no empty fields (and the winner check was checked before, it is a draw)
    return emptyFieldsNum < 1;
  };

  // returns false if game moves on, true if game ended
  const validateGameMove = (): boolean => {
    // check if winner exists
    for (const combination of winningCombinations) {
      if (
        combination.every(([row, col]) => board[row][col] === currentPlayer)
      ) {
        setWinner(currentPlayer);
        setWinningCells(combination);
        return true;
      }
    }

    // otherwise check for draw
    if (isDraw()) {
      setDraw(true);
      return true;
    }

    return false;
  };

  const handleGridItemClick = (row: number, cell: number): void => {
    if (winner || draw) {
      return;
    }

    // if grid item is not empty (X or O isset) return
    if (board[row][cell] !== null) {
      return;
    }

    const newGrid = [...board];
    newGrid[row][cell] = currentPlayer;
    setBoard(newGrid);

    // if there is a winner / draw, return and handle
    if (validateGameMove()) {
      return;
    }

    toggleCurrentPlayer();
  };

  const resetGame = () => {
    generateNewEmptyBoard();
    setCurrentPlayer(Player.X);
    setWinner(null);
    setDraw(false);
    setWinningCells(null);
  };

  const cellClass = (row: number, col: number): string => {
    if (!winningCells) {
      return "";
    }

    if (
      winningCells.some(([winRow, winCol]) => winRow === row && winCol === col)
    ) {
      return "winning-cell";
    }

    return "";
  };

  useLayoutEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="backdrop">
      {winner && (
        <Banner
          cName="winner"
          text={`Player ${winner} won the Game!`}
          resetGame={resetGame}
        />
      )}

      {draw && (
        <Banner
          cName="draw"
          text={`The game ended in a Draw!`}
          resetGame={resetGame}
        />
      )}

      <div>
        {!draw && !winner && (
          <div className="current-player">
            <span className="current-player-text">Current Player:</span>{" "}
            <PlayerOrb text={currentPlayer} />
          </div>
        )}

        <div>
          {board.map((row, rowNumber) => (
            <div className="row" key={rowNumber}>
              {row.map((cell, colNumber) => (
                <div
                  onClick={() => {
                    handleGridItemClick(rowNumber, colNumber);
                  }}
                  className="grid-item"
                  key={colNumber}
                >
                  {cell !== null && (
                    <PlayerOrb
                      text={cell}
                      cName={cellClass(rowNumber, colNumber)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useLayoutEffect, useState } from "react";

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

    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = null;
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

    return emptyFieldsNum < 1;
  };

  const validateWinner = (): boolean => {
    for (const combination of winningCombinations) {
      if (
        combination.every(([row, col]) => board[row][col] === currentPlayer)
      ) {
        setWinner(currentPlayer);
        setWinningCells(combination);
        return true;
      }
    }

    if (isDraw()) {
      setDraw(true);
      return true;
    }

    return false;
  };

  const handleGridItemClick = (row: number, cell: number) => {
    if (winner) {
      return;
    }

    if (board[row][cell] !== null) {
      return;
    }

    const newGrid = board;
    newGrid[row][cell] = currentPlayer;
    setBoard(newGrid);

    if (validateWinner()) {
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

  const printCell = (cell: Player | null) => {
    return cell;
  };

  const markCell = (row: number, col: number): boolean => {
    if (!winningCells) {
      return false;
    }

    return winningCells.some(
      ([winRow, winCol]) => winRow === row && winCol === col
    );
  };

  useLayoutEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="backdrop">
      {winner && (
        <div className="banner winner-banner">
          <span>
            Player {winner} won the Game{" "}
            <span className="link" onClick={resetGame}>
              Play again?
            </span>
          </span>
        </div>
      )}

      {draw && (
        <div className="banner draw-banner">
          <span>
            Draw{" "}
            <span className="link" onClick={resetGame}>
              Play again?
            </span>
          </span>
        </div>
      )}

      <div>
        {!draw && !winner && (
          <div className="current-player">
            <span className="current-player-text">Current Player:</span>{" "}
            <span className="player-orb">{currentPlayer}</span>
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
                  {printCell(cell) !== null && (
                    <span
                      className={`player-orb ${
                        markCell(rowNumber, colNumber) ? "winning-cell" : ""
                      }`}
                    >
                      {printCell(cell)}
                    </span>
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

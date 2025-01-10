import { useLayoutEffect, useState } from "react";

enum CellState {
  EMPTY = "",
  X = "X",
  O = "O",
}

export default function GamePage() {
  const [board, setBoard] = useState<CellState[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<CellState>(CellState.X);
  const [winner, setWinner] = useState<CellState | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  const generateNewBoard = () => {
    const grid: CellState[][] = [[]];
    for (let i = 0; i < 3; i++) {
      grid[i] = [];
      for (let j = 0; j < 3; j++) {
        grid[i][j] = CellState.EMPTY;
      }
    }
    setBoard(grid);
  };

  const toggleCurrentPlayer = () => {
    if (currentPlayer === CellState.X) {
      setCurrentPlayer(CellState.O);
    } else {
      setCurrentPlayer(CellState.X);
    }
  };

  const isDraw = (): boolean => {
    let emptyNum = 0;
    board.forEach((row) => {
      if (row.includes(CellState.EMPTY)) {
        return emptyNum++;
      }
    });

    return emptyNum < 1;
  };

  const validateWinner = (): boolean => {
    if (
      (board[0][0] == currentPlayer &&
        board[0][1] == currentPlayer &&
        board[0][2] == currentPlayer) || // first row
      (board[1][0] == currentPlayer &&
        board[1][1] == currentPlayer &&
        board[1][2] == currentPlayer) || // second row
      (board[2][0] == currentPlayer &&
        board[2][1] == currentPlayer &&
        board[2][2] == currentPlayer) || // third row
      (board[0][0] == currentPlayer &&
        board[1][0] == currentPlayer &&
        board[2][0] == currentPlayer) || // first column
      (board[0][1] == currentPlayer &&
        board[1][1] == currentPlayer &&
        board[2][1] == currentPlayer) || // second column
      (board[0][2] == currentPlayer &&
        board[1][2] == currentPlayer &&
        board[2][2] == currentPlayer) || // third column
      (board[0][0] == currentPlayer &&
        board[1][1] == currentPlayer &&
        board[2][2] == currentPlayer) || // left to right tilt
      (board[0][2] == currentPlayer &&
        board[1][1] == currentPlayer &&
        board[2][0] == currentPlayer) // right to left tilt
    ) {
      setWinner(currentPlayer);
      return true;
    } else if (isDraw()) {
      setDraw(true);
      return true;
    }

    return false;
  };

  const handleGridItemClick = (row: number, cell: number) => {
    if (winner) {
      return;
    }

    if (board[row][cell] !== CellState.EMPTY) {
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
    generateNewBoard();
    setCurrentPlayer(CellState.X);
    setWinner(null);
    setDraw(false);
  };

  const printCell = (cell: CellState) => {
    return cell;
  };

  useLayoutEffect(() => {
    generateNewBoard();
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
              {row.map((cell, cellNumber) => (
                <div
                  onClick={() => {
                    handleGridItemClick(rowNumber, cellNumber);
                  }}
                  className="grid-item"
                  key={cellNumber}
                >
                  {printCell(cell) !== CellState.EMPTY && (
                    <span className="player-orb">{printCell(cell)}</span>
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

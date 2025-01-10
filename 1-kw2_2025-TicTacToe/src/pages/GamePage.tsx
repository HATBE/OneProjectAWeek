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

  const debug = false;

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
        <div className="winner-banner">
          <span>
            Player {winner} won the Game{" "}
            <span className="link" onClick={resetGame}>
              Play again?
            </span>
          </span>
        </div>
      )}

      <div>
        <div className="current-player">
          <span className="current-player-text">Current Player:</span>{" "}
          <span className="player-orb">{currentPlayer}</span>
        </div>

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
                  <span className="player-orb">{printCell(cell)}</span>
                  {debug && (
                    <>
                      {rowNumber}/{cellNumber}{" "}
                    </>
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

// TODO: handle draw
// TODO: style the winning path with red or so
// TODO: if empty dont show player orb

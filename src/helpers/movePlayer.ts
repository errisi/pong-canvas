import { BOARD_SIZE, SQUARE_SIZE } from "../constants";

export const movePlayer = (
  playerX: number,
  playerY: number,
  playerDx: number,
  playerDy: number,
  board: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  isSecondPlayer: boolean
) => {
  let newDx = playerDx;
  let newDy = playerDy;

  if (
    playerX + playerDx < SQUARE_SIZE / 2 ||
    playerX + playerDx > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  ) {
    newDx = -playerDx;
  }

  if (
    playerY + playerDy < SQUARE_SIZE / 2 ||
    playerY + playerDy > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  ) {
    newDy = -playerDy;
  }

  const currX = Math.floor(playerX / SQUARE_SIZE);
  const currY = Math.floor(playerY / SQUARE_SIZE);
  const nextX = Math.floor(
    (playerX + playerDx + (playerDx > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );
  const nextY = Math.floor(
    (playerY + playerDy + (playerDy > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );

  if (
    nextX >= 0 &&
    nextX < BOARD_SIZE &&
    (isSecondPlayer ? !board[nextX][currY] : board[nextX][currY])
  ) {
    const newBoard = [...board];
    newBoard[nextX][currY] = isSecondPlayer;
    setBoard(newBoard);
    newDx = -playerDx;
  }

  if (
    nextY >= 0 &&
    nextY < BOARD_SIZE &&
    (isSecondPlayer ? !board[currX][nextY] : board[currX][nextY])
  ) {
    const newBoard = [...board];
    newBoard[currX][nextY] = isSecondPlayer;
    setBoard(newBoard);
    newDy = -playerDy;
  }

  return {
    playerX: playerX + newDx,
    playerY: playerY + newDy,
    playerDx: newDx,
    playerDy: newDy,
  };
};

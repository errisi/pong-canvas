import { BOARD_SIZE, SQUARE_SIZE } from "../constants";

const checkBoundaryAndCollision = (
  playerX: number,
  playerY: number,
  playerDx: number,
  playerDy: number,
  board: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  isCollision: boolean
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
    (isCollision ? !board[nextX][currY] : board[nextX][currY])
  ) {
    const newBoard = [...board];
    newBoard[nextX][currY] = isCollision;
    setBoard(newBoard);
    newDx = -playerDx;
  }

  if (
    nextY >= 0 &&
    nextY < BOARD_SIZE &&
    (isCollision ? !board[currX][nextY] : board[currX][nextY])
  ) {
    const newBoard = [...board];
    newBoard[currX][nextY] = isCollision;
    setBoard(newBoard);
    newDy = -playerDy;
  }

  return { newDx, newDy };
};

export const moveFirstPlayer = (
  firstPlayerX: number,
  firstPlayerY: number,
  firstPlayerDx: number,
  firstPlayerDy: number,
  board: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>
) => {
  const { newDx, newDy } = checkBoundaryAndCollision(
    firstPlayerX,
    firstPlayerY,
    firstPlayerDx,
    firstPlayerDy,
    board,
    setBoard,
    false
  );

  return {
    firstPlayerX: firstPlayerX + newDx,
    firstPlayerY: firstPlayerY + newDy,
    firstPlayerDx: newDx,
    firstPlayerDy: newDy,
  };
};

export const moveSecondPlayer = (
  secondPlayerX: number,
  secondPlayerY: number,
  secondPlayerDx: number,
  secondPlayerDy: number,
  board: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>
) => {
  const { newDx, newDy } = checkBoundaryAndCollision(
    secondPlayerX,
    secondPlayerY,
    secondPlayerDx,
    secondPlayerDy,
    board,
    setBoard,
    true
  );

  return {
    secondPlayerX: secondPlayerX + newDx,
    secondPlayerY: secondPlayerY + newDy,
    secondPlayerDx: newDx,
    secondPlayerDy: newDy,
  };
};

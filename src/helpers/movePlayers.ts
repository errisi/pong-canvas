import { BOARD_SIZE, SQUARE_SIZE } from "../constants";

export const moveFirstPlayer = (
  firstPlayerX: number,
  firstPlayerY: number,
  firstPlayerDx: number,
  firstPlayerDy: number,
  board: boolean[][],
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>
) => {
  if (
    firstPlayerX + firstPlayerDx < SQUARE_SIZE / 2 ||
    firstPlayerX + firstPlayerDx > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  )
    firstPlayerDx = -firstPlayerDx;
  if (
    firstPlayerY + firstPlayerDy < SQUARE_SIZE / 2 ||
    firstPlayerY + firstPlayerDy > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  )
    firstPlayerDy = -firstPlayerDy;

  const currX = Math.floor(firstPlayerX / SQUARE_SIZE);
  const currY = Math.floor(firstPlayerY / SQUARE_SIZE);
  const nextX = Math.floor(
    (firstPlayerX +
      firstPlayerDx +
      (firstPlayerDx > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );
  const nextY = Math.floor(
    (firstPlayerY +
      firstPlayerDy +
      (firstPlayerDy > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );
  if (nextX >= 0 && nextX < BOARD_SIZE && board[nextX][currY]) {
    const newBoard = [...board];
    newBoard[nextX][currY] = false;
    setBoard(newBoard);
    firstPlayerDx = -firstPlayerDx;
  }

  if (nextY >= 0 && nextY < BOARD_SIZE && board[currX][nextY]) {
    const newBoard = [...board];
    newBoard[currX][nextY] = false;
    setBoard(newBoard);
    firstPlayerDy = -firstPlayerDy;
  }

  return {
    firstPlayerX: firstPlayerX + firstPlayerDx,
    firstPlayerY: firstPlayerY + firstPlayerDy,
    firstPlayerDx,
    firstPlayerDy,
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
  if (
    secondPlayerX + secondPlayerDx < SQUARE_SIZE / 2 ||
    secondPlayerX + secondPlayerDx > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  )
    secondPlayerDx = -secondPlayerDx;
  if (
    secondPlayerY + secondPlayerDy < SQUARE_SIZE / 2 ||
    secondPlayerY + secondPlayerDy > SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
  )
    secondPlayerDy = -secondPlayerDy;

  const currX = Math.floor(secondPlayerX / SQUARE_SIZE);
  const currY = Math.floor(secondPlayerY / SQUARE_SIZE);
  const nextX = Math.floor(
    (secondPlayerX +
      secondPlayerDx +
      (secondPlayerDx > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );
  const nextY = Math.floor(
    (secondPlayerY +
      secondPlayerDy +
      (secondPlayerDy > 0 ? SQUARE_SIZE / 2 : -SQUARE_SIZE / 2)) /
      SQUARE_SIZE
  );
  if (nextX >= 0 && nextX < BOARD_SIZE && !board[nextX][currY]) {
    const newBoard = [...board];
    newBoard[nextX][currY] = true;
    setBoard(newBoard);
    secondPlayerDx = -secondPlayerDx;
  }

  if (nextY >= 0 && nextY < BOARD_SIZE && !board[currX][nextY]) {
    const newBoard = [...board];
    newBoard[currX][nextY] = true;
    setBoard(newBoard);
    secondPlayerDy = -secondPlayerDy;
  }

  return {
    secondPlayerX: secondPlayerX + secondPlayerDx,
    secondPlayerY: secondPlayerY + secondPlayerDy,
    secondPlayerDx,
    secondPlayerDy,
  };
};

import { BOARD_SIZE, SQUARE_SIZE } from "../constants";

export const getPlayersInitialStates = () => {
  const firstPlayerX = SQUARE_SIZE / 2;
  const firstPlayerY = SQUARE_SIZE / 2;
  const secondPlayerX = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2;
  const secondPlayerY = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2;
  const firstPlayerRandom = Math.random();
  const secondPlayerRandom = Math.random();
  const firstPlayerDx = 6 + firstPlayerRandom;
  const firstPlayerDy = 7 - firstPlayerRandom;
  const secondPlayerDx = -7 + secondPlayerRandom;
  const secondPlayerDy = -6 - secondPlayerRandom;

  return {
    firstPlayerX,
    firstPlayerY,
    secondPlayerX,
    secondPlayerY,
    firstPlayerDx,
    firstPlayerDy,
    secondPlayerDx,
    secondPlayerDy,
  };
};

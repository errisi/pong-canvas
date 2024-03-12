import { BOARD_SIZE, PLAYER_SPEED_X, PLAYER_SPEED_Y, SQUARE_SIZE } from "../constants";

export const getPlayersInitialStates = () => {
  const firstPlayerX = SQUARE_SIZE / 2;
  const firstPlayerY = SQUARE_SIZE / 2;
  const secondPlayerX = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2;
  const secondPlayerY = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2;
  const firstPlayerRandom = Math.random();
  const secondPlayerRandom = Math.random();
  const firstPlayerDx = PLAYER_SPEED_X + firstPlayerRandom;
  const firstPlayerDy = PLAYER_SPEED_Y - firstPlayerRandom;
  const secondPlayerDx = -PLAYER_SPEED_X + secondPlayerRandom;
  const secondPlayerDy = -PLAYER_SPEED_Y - secondPlayerRandom;

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

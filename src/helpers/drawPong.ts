import {
  FIRST_PLAYER_RGB,
  SECOND_PLAYER_RGB,
  SQUARE_SIZE,
} from "../constants";
import { moveFirstPlayer, moveSecondPlayer } from "./movePlayers";

export const drawPong = (
  board: boolean[][],
  firstPlayerX: number,
  firstPlayerY: number,
  firstPlayerDx: number,
  firstPlayerDy: number,
  secondPlayerX: number,
  secondPlayerY: number,
  secondPlayerDx: number,
  secondPlayerDy: number,
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  setFirstPlayerCount: React.Dispatch<React.SetStateAction<number>>,
  setSecondPlayerCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const canvas = document.getElementById(
    "pong-canvas"
  ) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let firstPlayerCounter = 0;
  let secondPlayerCounter = 0;

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      ctx.fillStyle = board[x][y]
        ? FIRST_PLAYER_RGB
        : SECOND_PLAYER_RGB;
      ctx.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
      if (board[x][y]) firstPlayerCounter++;
      else secondPlayerCounter++;
    }
  }

  setFirstPlayerCount(firstPlayerCounter);
  setSecondPlayerCount(secondPlayerCounter);

  ctx.fillStyle = FIRST_PLAYER_RGB;
  ctx.fillRect(
    firstPlayerX - SQUARE_SIZE / 2,
    firstPlayerY - SQUARE_SIZE / 2,
    SQUARE_SIZE,
    SQUARE_SIZE
  );

  ctx.fillStyle = SECOND_PLAYER_RGB;
  ctx.fillRect(
    secondPlayerX - SQUARE_SIZE / 2,
    secondPlayerY - SQUARE_SIZE / 2,
    SQUARE_SIZE,
    SQUARE_SIZE
  );

  const newFirstPlayerState = moveFirstPlayer(
    firstPlayerX,
    firstPlayerY,
    firstPlayerDx,
    firstPlayerDy,
    board,
    setBoard
  );
  const newSecondPlayerState = moveSecondPlayer(
    secondPlayerX,
    secondPlayerY,
    secondPlayerDx,
    secondPlayerDy,
    board,
    setBoard
  );

  requestAnimationFrame(() =>
    drawPong(
      board,
      newFirstPlayerState.firstPlayerX,
      newFirstPlayerState.firstPlayerY,
      newFirstPlayerState.firstPlayerDx,
      newFirstPlayerState.firstPlayerDy,
      newSecondPlayerState.secondPlayerX,
      newSecondPlayerState.secondPlayerY,
      newSecondPlayerState.secondPlayerDx,
      newSecondPlayerState.secondPlayerDy,
      setBoard,
      setFirstPlayerCount,
      setSecondPlayerCount
    )
  );
};

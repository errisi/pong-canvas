import { FIRST_PLAYER_RGB, SECOND_PLAYER_RGB, SQUARE_SIZE } from "../constants";
import { movePlayer } from "./movePlayer";

interface DrawPongProps {
  board: boolean[][];
  player1: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  player2: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setFirstPlayerCount: React.Dispatch<React.SetStateAction<number>>;
  setSecondPlayerCount: React.Dispatch<React.SetStateAction<number>>;
}

export const drawPong = ({
  board,
  player1,
  player2,
  setBoard,
  setFirstPlayerCount,
  setSecondPlayerCount,
}: DrawPongProps) => {
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
      ctx.fillStyle = board[x][y] ? FIRST_PLAYER_RGB : SECOND_PLAYER_RGB;
      ctx.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
      if (board[x][y]) firstPlayerCounter++;
      else secondPlayerCounter++;
    }
  }

  setFirstPlayerCount(firstPlayerCounter);
  setSecondPlayerCount(secondPlayerCounter);

  ctx.fillStyle = FIRST_PLAYER_RGB;
  ctx.fillRect(
    player1.x - SQUARE_SIZE / 2,
    player1.y - SQUARE_SIZE / 2,
    SQUARE_SIZE,
    SQUARE_SIZE
  );

  ctx.fillStyle = SECOND_PLAYER_RGB;
  ctx.fillRect(
    player2.x - SQUARE_SIZE / 2,
    player2.y - SQUARE_SIZE / 2,
    SQUARE_SIZE,
    SQUARE_SIZE
  );

  const newFirstPlayerState = movePlayer(
    player1.x,
    player1.y,
    player1.dx,
    player1.dy,
    board,
    setBoard,
    false
  );
  const newSecondPlayerState = movePlayer(
    player2.x,
    player2.y,
    player2.dx,
    player2.dy,
    board,
    setBoard,
    true
  );

  requestAnimationFrame(() =>
    drawPong({
      board,
      player1: {
        x: newFirstPlayerState.playerX,
        y: newFirstPlayerState.playerY,
        dx: newFirstPlayerState.playerDx,
        dy: newFirstPlayerState.playerDy,
      },
      player2: {
        x: newSecondPlayerState.playerX,
        y: newSecondPlayerState.playerY,
        dx: newSecondPlayerState.playerDx,
        dy: newSecondPlayerState.playerDy,
      },
      setBoard,
      setFirstPlayerCount,
      setSecondPlayerCount,
    })
  );
};

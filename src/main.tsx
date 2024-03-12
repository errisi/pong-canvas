import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const SQUARE_SIZE = 32;
const BOARD_SIZE = 16;

const FIRST_PLAYER_COLOR = [250, 170, 43];
const SECOND_PLAYER_COLOR = [77, 66, 139];

const Pong: React.FC = () => {
  const [board, setBoard] = useState<boolean[][]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [firstPlayerCount, setFirstPlayerCount] = useState(0);
  const [secondPlayerCount, setSecondPlayerCount] = useState(0);

  let firstPlayerX = SQUARE_SIZE / 2,
    firstPlayerY = SQUARE_SIZE / 2,
    secondPlayerX = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2,
    secondPlayerY = BOARD_SIZE * SQUARE_SIZE - SQUARE_SIZE / 2;
  const firstPlayerRandom = Math.random();
  const secondPlayerRandom = Math.random();
  let firstPlayerDx = 6 + firstPlayerRandom,
    firstPlayerDy = 7 - firstPlayerRandom,
    secondPlayerDx = -7 + secondPlayerRandom,
    secondPlayerDy = -6 - secondPlayerRandom;

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    const initialBoard = [];
    let firstPlayerCounter = 0;
    let secondPlayerCounter = 0;
    for (let x = 0; x < BOARD_SIZE; x++) {
      const row: boolean[] = [];
      for (let y = 0; y < BOARD_SIZE; y++) {
        const isOnFirstHalf = x >= BOARD_SIZE / 2;
        if (isOnFirstHalf) firstPlayerCounter++;
        else secondPlayerCounter++;
        row.push(isOnFirstHalf);
      }
      initialBoard.push(row);
    }
    setBoard(initialBoard);
    setFirstPlayerCount(firstPlayerCounter);
    setSecondPlayerCount(secondPlayerCounter);
    setIsSetupComplete(true);
  };

  useEffect(() => {
    if (isSetupComplete) {
      requestAnimationFrame(draw);
    }
  }, [isSetupComplete]);

  const draw = () => {
    const canvas: HTMLCanvasElement | null = document.getElementById(
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
          ? `rgb(${FIRST_PLAYER_COLOR.join(",")})`
          : `rgb(${SECOND_PLAYER_COLOR.join(",")})`;
        ctx.fillRect(
          x * SQUARE_SIZE,
          y * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
        if (board[x][y]) firstPlayerCounter++;
        else secondPlayerCounter++;
      }
    }

    setFirstPlayerCount(firstPlayerCounter);
    setSecondPlayerCount(secondPlayerCounter);

    ctx.fillStyle = `rgb(${FIRST_PLAYER_COLOR.join(",")})`;
    ctx.fillRect(
      firstPlayerX - SQUARE_SIZE / 2,
      firstPlayerY - SQUARE_SIZE / 2,
      SQUARE_SIZE,
      SQUARE_SIZE
    );

    ctx.fillStyle = `rgb(${SECOND_PLAYER_COLOR.join(",")})`;
    ctx.fillRect(
      secondPlayerX - SQUARE_SIZE / 2,
      secondPlayerY - SQUARE_SIZE / 2,
      SQUARE_SIZE,
      SQUARE_SIZE
    );

    // FIRST PLAYER MOVEMENT
    {
      if (
        firstPlayerX + firstPlayerDx < SQUARE_SIZE / 2 ||
        firstPlayerX + firstPlayerDx >
          SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
      )
        firstPlayerDx = -firstPlayerDx;
      if (
        firstPlayerY + firstPlayerDy < SQUARE_SIZE / 2 ||
        firstPlayerY + firstPlayerDy >
          SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
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

      firstPlayerX += firstPlayerDx;
      firstPlayerY += firstPlayerDy;
    }

    // SECOND PLAYER MOVEMENT
    {
      if (
        secondPlayerX + secondPlayerDx < SQUARE_SIZE / 2 ||
        secondPlayerX + secondPlayerDx >
          SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
      )
        secondPlayerDx = -secondPlayerDx;
      if (
        secondPlayerY + secondPlayerDy < SQUARE_SIZE / 2 ||
        secondPlayerY + secondPlayerDy >
          SQUARE_SIZE * BOARD_SIZE - SQUARE_SIZE / 2
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

      secondPlayerX += secondPlayerDx;
      secondPlayerY += secondPlayerDy;
    }

    requestAnimationFrame(draw);
  };

  return (
    <div>
      <canvas
        id="pong-canvas"
        width={SQUARE_SIZE * BOARD_SIZE}
        height={SQUARE_SIZE * BOARD_SIZE}
      />
      <p className="counter">
        <span style={{ color: `rgb(${SECOND_PLAYER_COLOR.join(",")})` }}>
          {secondPlayerCount}
        </span>
        X
        <span style={{ color: `rgb(${FIRST_PLAYER_COLOR.join(",")})` }}>
          {firstPlayerCount}
        </span>
      </p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Pong />
  </React.StrictMode>
);

import { useEffect, useState } from "react";
import { getPlayersInitialStates } from "../helpers/getPlayersInitialStates";
import { setupPong } from "../helpers/setupPong";
import { drawPong } from "../helpers/drawPong";
import { CANVAS_SIZE } from "../constants";

const {
  firstPlayerX,
  firstPlayerY,
  secondPlayerX,
  secondPlayerY,
  firstPlayerDx,
  firstPlayerDy,
  secondPlayerDx,
  secondPlayerDy,
} = getPlayersInitialStates();

export const Pong = () => {
  const [board, setBoard] = useState<boolean[][]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [firstPlayerCount, setFirstPlayerCount] = useState(0);
  const [secondPlayerCount, setSecondPlayerCount] = useState(0);

  useEffect(() => {
    setupPong({
      setBoard,
      setFirstPlayerCount,
      setSecondPlayerCount,
      setIsSetupComplete
    });
  }, []);

  useEffect(() => {
    if (isSetupComplete) {
      drawPong({
        board,
        player1: {
          x: firstPlayerX,
          y: firstPlayerY,
          dx: firstPlayerDx,
          dy: firstPlayerDy,
        },
        player2: {
          x: secondPlayerX,
          y: secondPlayerY,
          dx: secondPlayerDx,
          dy: secondPlayerDy,
        },
        setBoard,
        setFirstPlayerCount,
        setSecondPlayerCount,
      });
    }
  }, [isSetupComplete]);

  return (
    <>
      <canvas id="pong-canvas" width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <p className="counter">
        <span>{secondPlayerCount}</span>X<span>{firstPlayerCount}</span>
      </p>
    </>
  );
};

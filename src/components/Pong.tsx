import { useEffect, useState } from "react";
import { getPlayersInitialStates } from "../helpers/getPlayersInitialStates";
import { setupPong } from "../helpers/setupPong";
import { drawPong } from "../helpers/drawPong";
import { CANVAS_SIZE } from "../constants";

export const Pong = () => {
  const [board, setBoard] = useState<boolean[][]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [firstPlayerCount, setFirstPlayerCount] = useState(0);
  const [secondPlayerCount, setSecondPlayerCount] = useState(0);

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

  useEffect(() => {
    setupPong(
      setBoard,
      setFirstPlayerCount,
      setSecondPlayerCount,
      setIsSetupComplete
    );
  }, []);

  useEffect(() => {
    if (isSetupComplete) {
      drawPong(
        board,
        firstPlayerX,
        firstPlayerY,
        firstPlayerDx,
        firstPlayerDy,
        secondPlayerX,
        secondPlayerY,
        secondPlayerDx,
        secondPlayerDy,
        setBoard,
        setFirstPlayerCount,
        setSecondPlayerCount
      );
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

import { BOARD_SIZE } from "../constants";

export const setupPong = (
  setBoard: React.Dispatch<React.SetStateAction<boolean[][]>>,
  setFirstPlayerCount: React.Dispatch<React.SetStateAction<number>>,
  setSecondPlayerCount: React.Dispatch<React.SetStateAction<number>>,
  setIsSetupComplete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const initialBoard = [];
  let firstPlayerCounter = 0;
  let secondPlayerCounter = 0;
  for (let x = 0; x < BOARD_SIZE; x++) {
    const row = [];
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

// custom hook for conrolling the game scene

import { useState } from "react";
import { ScenceType } from "./type";

export function useGameScene() {
  const [scene, setScene] = useState<ScenceType>("start");

  function startGame() {
    setScene("start");
  }

  function endGame() {
    setScene("end");
  }

  function startCountdown() {
    setScene("countdown");
  }

  function startTyping() {
    setScene("typing");
  }

  return {
    scene,
    startGame,
    endGame,
    startCountdown,
    startTyping,
  };
}

import React from "react";
import { Countdown } from "./Scene/Countdown";
import { End } from "./Scene/End";
import { Start } from "./Scene/Start";
import { Typing } from "./Scene/Typing";
import { getColor } from "../utils/colors";
import { useGameScene } from "../features/game/useGameScene";
import { useGameResult } from "../features/game/useGameResult";

export const Game: React.FC = () => {
  const { scene, startCountdown, startGame, endGame, startTyping } =
    useGameScene();
  const { result, updateResult, resetResult } = useGameResult();

  return (
    <div>
      <div
        css={{
          display: "grid",
          height: "100vh",
          placeContent: "center",
          width: "100%",
        }}
      >
        <div
          css={{
            backgroundColor: getColor("gray50"),
            borderRadius: "32px",
            boxShadow: `0 16px 32px ${getColor("shadow")}`,
            height: "480px",
            width: "640px",
          }}
        >
          {scene === "start" && (
            <Start scene={scene} startCountdown={startCountdown} />
          )}
          {scene === "countdown" && <Countdown startTyping={startTyping} />}
          {scene === "typing" && (
            <Typing endGame={endGame} updateResult={updateResult} />
          )}
          {scene === "end" && (
            <End
              result={result}
              resetResult={resetResult}
              startGame={startGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};

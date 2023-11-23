import React, { useState } from "react";
import { Countdown } from "./Scene/Countdown";
import { End } from "./Scene/End";
import { Start } from "./Scene/Start";
import { Typing } from "./Scene/Typing";
import { getColor } from "../utils/colors";
import { ScenceType } from "./Scene/type";

export type Result = {
  numMochi: number;
  numMissType: number;
};

export const Game: React.FC = () => {
  const [scene, setScene] = useState<ScenceType>("start");
  const [result, setResult] = useState<Result>({ numMochi: 0, numMissType: 0 });
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
          {scene === "start" && <Start scene={scene} setScene={setScene} />}
          {scene === "countdown" && <Countdown setScene={setScene} />}
          {scene === "typing" && (
            <Typing setScene={setScene} setResult={setResult} />
          )}
          {scene === "end" && (
            <End result={result} setResult={setResult} setScene={setScene} />
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

export type Result = {
  numMochi: number;
  numMissType: number;
};

export function useGameResult() {
  const [result, setResult] = useState<Result>({ numMochi: 0, numMissType: 0 });

  function updateResult({
    numMochi,
    numMissType,
  }: {
    numMochi: number;
    numMissType: number;
  }) {
    setResult({ numMochi, numMissType });
  }

  function resetResult() {
    setResult({ numMochi: 0, numMissType: 0 });
  }

  return { result, updateResult, resetResult };
}

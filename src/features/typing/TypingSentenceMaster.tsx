import { useCallback, useState } from "react";
import useSound from "use-sound";

import completeSound from "../../assets/complete.mp3";
import failureSound from "../../assets/failure.mp3";
import successSound from "../../assets/success.mp3";
import { shuffle } from "../../utils/shuffle";
import { makeTypeingChecker } from "./makeSentenceParseMap";
import { typingSentenceMasters, TypingSentenceMaster } from "./masters";

export type TypingSentenceMasterChecker = TypingSentenceMaster & {
  checkers: string[][];
  slicedSentences: string[];
};

const joinCheckers = (checkers: string[][]) =>
  checkers.reduce((str, checker) => str + checker[0], "");

let shffuledTypingSentenceMasters = shuffle(typingSentenceMasters).map(
  (master) => {
    const { checkers, slicedSentences } = makeTypeingChecker(
      master.parsableSentence
    );
    return {
      ...master,
      checkers,
      slicedSentences,
    };
  }
);

const inputKeys: string[] = [];
let inputCount = 0;
let slicedSentecesIndex = 0;
let typingSentenceMaster: TypingSentenceMasterChecker | undefined =
  shffuledTypingSentenceMasters.shift();
let numMochi = 0;
let numMissType = 0;
let numCorrectType = 0;

export const resetResult = () => {
  inputCount = 0;
  slicedSentecesIndex = 0;
  numMissType = 0;
  numMochi = 0;
  numCorrectType = 0;
  shffuledTypingSentenceMasters = shuffle(typingSentenceMasters).map(
    (master) => {
      const { checkers, slicedSentences } = makeTypeingChecker(
        master.parsableSentence
      );
      return {
        ...master,
        checkers,
        slicedSentences,
      };
    }
  );
};

export const useTypingSentenceMaster = (
  time: number,
  advanceTime: (timeToadd: number) => void
) => {
  const soundOptions = { volume: 0.1 };
  const [successPlay] = useSound(successSound, soundOptions);
  const [failurePlay] = useSound(failureSound, soundOptions);
  const [completePlay] = useSound(completeSound, soundOptions);

  if (!typingSentenceMaster) {
    throw new Error("エラーが発生しました。");
  }

  const [joinedCheckers, setJoinedCheckers] = useState(
    joinCheckers(typingSentenceMaster.checkers)
  );

  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!typingSentenceMaster) {
        throw new Error("エラーが発生しました。");
      }
      const { key } = event;

      inputKeys.push(key);
      const checkers = typingSentenceMaster.checkers[slicedSentecesIndex];
      const filterdCheckers = checkers.filter(
        (str) => str.slice(0, inputCount + 1) === inputKeys.join("")
      );
      if (filterdCheckers && filterdCheckers.length > 0) {
        numCorrectType++;
        successPlay();
        inputCount++;
        setValue(value + key);
        typingSentenceMaster.checkers[slicedSentecesIndex] = filterdCheckers;
        setJoinedCheckers(joinCheckers(typingSentenceMaster.checkers));
        if (filterdCheckers[0] === inputKeys.join("")) {
          slicedSentecesIndex++;
          inputCount = 0;
          inputKeys.length = 0;
          if (
            slicedSentecesIndex === typingSentenceMaster?.slicedSentences.length
          ) {
            slicedSentecesIndex = 0;
            typingSentenceMaster = shffuledTypingSentenceMasters.shift();
            if (!typingSentenceMaster) {
              throw new Error("エラーが発生しました");
            }
            setValue("");
            numMochi++;
            setJoinedCheckers(joinCheckers(typingSentenceMaster.checkers));
            completePlay();
          }
        }
      } else {
        if (key !== "Shift") {
          numMissType++;
          failurePlay();
          if (time > 5) {
            advanceTime(1);
          }
        }
        inputKeys.pop();
      }
    },
    [value, time, advanceTime]
  );

  return {
    typingSentenceMaster,
    joinedCheckers,
    value,
    numMochi,
    numMissType,
    numCorrectType,
    handleKeyDown,
  };
};

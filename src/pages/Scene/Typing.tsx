import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import useSound from "use-sound";
import { useTimer } from "use-timer";

import endSound from "../../assets/end.mp3";
import { getColor } from "../../utils/colors";
import { useTypingSentenceMaster } from "../../features/typing/TypingSentenceMaster";
import { Text } from "../../components/ui/Text";
import { Result } from "../../features/game/useGameResult";

const INITIAL_TIME = 60;
const END_TIME = 0;

export type Typing = {
  endGame: () => void;
  updateResult: ({
    numMissType,
    numMochi,
  }: Result) => void;
};

export const Typing: React.FC<Typing> = ({ endGame, updateResult }) => {
  const soundOptions = { volume: 0.1 };
  const [endPlay] = useSound(endSound, soundOptions);

  const onTimeOver = async () => {
    endPlay();
    updateResult({
      numMochi: numMochi,
      numMissType: numMissType,
    });

    endGame();
  };

  const { time, advanceTime } = useTimer({
    initialTime: INITIAL_TIME,
    endTime: END_TIME,
    timerType: "DECREMENTAL",
    onTimeOver,
    autostart: true,
  });

  const {
    typingSentenceMaster,
    joinedCheckers,
    value,
    handleKeyDown,
    numMochi,
    numMissType,
    numCorrectType,
  } = useTypingSentenceMaster(time, advanceTime);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyDown, false);
    return () => {
      document.removeEventListener("keypress", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}
      css={{
        padding: "32px",
      }}
    >
      <div>
        <Text>残り時間: {time}</Text>
      </div>
      <div css={{ marginTop: "16px" }}>
        <Text>餅の数: {numMochi}</Text>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {numCorrectType % 4 === 0 && (
          <ReactSVG
            src="rabbit01.svg"
            css={{
              svg: {
                height: "200px",
                width: "200px",
              },
            }}
          />
        )}
        {(numCorrectType % 4 === 1 || numCorrectType % 4 === 3) && (
          <ReactSVG
            src="rabbit02.svg"
            css={{
              svg: {
                height: "200px",
                width: "200px",
              },
            }}
          />
        )}

        {numCorrectType % 4 === 2 && (
          <ReactSVG
            src="rabbit03.svg"
            css={{
              svg: {
                height: "200px",
                width: "200px",
              },
            }}
          />
        )}
        <div css={{ wordBreak: "break-all" }}>
          <Text>{typingSentenceMaster.sentence}</Text>
          <div css={{ marginTop: "8px", fontFamily: "Noto Sans" }}>
            {joinedCheckers.split("").map((c, index) => (
              <span
                key={index}
                css={{
                  fontSize: "24px",
                  color:
                    index < value.length
                      ? getColor("primary")
                      : getColor("shadow100"),
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

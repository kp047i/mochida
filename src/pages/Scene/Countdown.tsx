import { motion } from "framer-motion";
import React from "react";
import { useTimer } from "use-timer";

import { getColor } from "../../utils/colors";
import { resetResult } from "../../features/typing/TypingSentenceMaster";
import { ScenceType } from "./type";

const INITIAL_TIME = 3;
const END_TIME = 0;

export type Countdown = {
  setScene: React.Dispatch<React.SetStateAction<ScenceType>>;
};

export const Countdown: React.FC<Countdown> = ({ setScene }) => {
  const onTimeOver = () => {
    setScene("typing");
    resetResult();
  };

  const { time } = useTimer({
    initialTime: INITIAL_TIME,
    endTime: END_TIME,
    timerType: "DECREMENTAL",
    onTimeOver,
    autostart: true,
  });

  return (
    <div
      css={{
        display: "grid",
        placeContent: "center",
        height: "100%",
      }}
    >
      <motion.span
        css={{
          color: getColor("gray600"),
          fontFamily: `Noto Sans`,
          fontSize: "128px",
        }}
        animate={{
          scale: [0.6, 0.7, 0.8, 0.9, 1],
        }}
        transition={{ ease: "linear", repeat: Infinity, duration: 1 }}
      >
        {time}
      </motion.span>
    </div>
  );
};

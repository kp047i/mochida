import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import { resetResult } from "../../features/typing/TypingSentenceMaster";
import { Text } from "../../components/ui/Text";
import { Result } from "../game";

export type End = {
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  startGame: () => void;
};

export const End: React.FC<End> = ({ result, setResult, startGame }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text size="lg">終了</Text>
      <div
        css={{
          marginTop: "64px",
        }}
      >
        <Text>獲得した餅の数: {result.numMochi}</Text>
        <div>
          <Text>ミスタイプ数: {result.numMissType}</Text>
        </div>
      </div>
      <div
        css={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Link to="/ranking" css={{ fontSize: "24px" }}>
          ランキングへ
        </Link>
        <Link
          to="/game"
          css={{ fontSize: "24px" }}
          onClick={() => {
            startGame();
            resetResult();
            setResult({ numMochi: 0, numMissType: 0 });
          }}
        >
          再チャレンジ
        </Link>
      </div>
    </motion.div>
  );
};

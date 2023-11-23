import { motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { ScenceType } from "./type";
import { getColor } from "../../utils/colors";
import { Text } from "../../components/ui/Text";

export type Start = {
  scene: ScenceType;
  setScene: React.Dispatch<React.SetStateAction<ScenceType>>;
};

export const Start: React.FC<Start> = ({ scene, setScene }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (scene === "start" && event.code === "Space") {
        setScene("countdown");
      }
    },
    [scene, setScene]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <h1
        css={{
          color: getColor("gray600"),
          fontSize: "48px",
        }}
      >
        餅打
      </h1>
      <div
        css={{ marginTop: "16px", display: "flex", flexDirection: "column" }}
      >
        <Text>
          「餅打」は表示される文章を素早く入力することで、餅を付き、獲得した餅の数で競うタイピングゲームです。
        </Text>
        <Text>
          ※複数の入力に対応していますので、表示されているキー以外にもお好みの打ち方でタイピングできます。
        </Text>
      </div>
      <div css={{ marginTop: "16px" }}>
        <Text>Spaceキーを入力するとゲームがスタートします</Text>
      </div>
      <motion.div
        style={{
          width: 250,
          height: 50,
          borderRadius: 4,
          backgroundColor: "#fff",
          marginTop: "32px",
          boxShadow: "0px 4px 0px 8px rgba(0,0,0,0.6)",
        }}
        animate={{
          scale: [1, 0.9, 0.9, 1, 1],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      ></motion.div>
    </div>
  );
};

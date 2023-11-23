import { ReactSVG } from "react-svg";
import { getColor } from "../utils/colors";
import { motion } from "framer-motion";
import { LinkButton } from "../components/ui/LinkButton";
import { Text } from "../components/ui/Text";

export function Home() {
  return (
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
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
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
          <ReactSVG
            src="rabbit.svg"
            css={{
              svg: {
                height: "200px",
                width: "200px",
              },
            }}
          />
          <div
            css={{
              marginTop: "48px",
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <LinkButton to="/mochida/game">ゲームを開始する</LinkButton>
            </motion.div>
          </div>
        </div>
      </div>
      <div css={{ display: "grid", gap: "8px", marginTop: "8px" }}>
        <Text>※音が出ます。</Text>
        <Text>※PCのみの対応です。</Text>
      </div>
    </div>
  );
}

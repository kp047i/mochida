import React, { ReactNode } from "react";

import { getColor } from "../../utils/colors";

const FONT_SIZE_MAP = {
  s: "16px",
  m: "24px",
  lg: "48px",
} as const;

export type Text = {
  size?: keyof typeof FONT_SIZE_MAP;
  children: ReactNode;
};

const getFontSize = (size: keyof typeof FONT_SIZE_MAP) => {
  return FONT_SIZE_MAP[size];
};

export const Text: React.FC<Text> = ({ size = "m", children }) => {
  return (
    <span
      css={{
        color: getColor("gray600"),
        fontSize: getFontSize(size),
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  );
};

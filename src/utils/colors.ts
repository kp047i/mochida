const colors = {
  primary: "#61BFBC",
  yellow: "##E8C572",
  white: "#F4F4F4",
  gray50: "#F7FAFC",
  gray100: "#EDF2F7",
  gray200: "#E2E8F0",
  gray300: "#CBD5E0",
  gray400: "#A0AEC0",
  gray500: "#718096",
  gray600: "#4A5568",
  gray700: "#2D3748",
  gray800: "#1A202C",
  gray900: "#171923",
  shadow: "#4385bb12",
  shadow100: "#4385bb30",
} as const;

export type Color = keyof typeof colors;

export const getColor = (key: Color) => colors[key];

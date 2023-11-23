import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getColor } from "../../utils/colors";

export type LinkButtonProps = {
  to: string;
  children: ReactNode;
};

export function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link
      to={to}
      css={{
        textDecoration: "none",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "16px",

        color: getColor("gray900"),
        backgroundColor: getColor("white"),
        width: "200px",

        padding: "3rem 4rem",
        borderRadius: "100% 80px / 80px 100%",
        ":hover": {
          borderRadius: "60% 80% / 100% 80%",
        },
      }}
    >
      {children}
    </Link>
  );
}

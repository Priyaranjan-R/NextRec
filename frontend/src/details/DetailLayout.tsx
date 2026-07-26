import type { ReactNode } from "react";

type Props = {
  poster: ReactNode;
  children: ReactNode;
};

function DetailLayout({
  poster,
  children,
}: Props) {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "40px auto",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "340px 1fr",
          gap: 50,
          alignItems: "start",
        }}
      >
        {poster}

        <div>{children}</div>
      </div>
    </div>
  );
}

export default DetailLayout;
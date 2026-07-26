import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

function MainLayout({
  children,
}: Props) {
  return (
    <div
      style={{
        background: "#0B0F19",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
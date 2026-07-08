import { useState } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (score: number) => void;
};

function RatingModal({
  open,
  title,
  onClose,
  onSubmit,
}: Props) {
  const [score, setScore] = useState(5);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          background: "#161B22",
          borderRadius: 16,
          padding: 30,
          color: "white",
          boxShadow:
            "0 0 40px rgba(0,0,0,.4)",
        }}
      >
        <h2
          style={{
            marginBottom: 10,
          }}
        >
          ⭐ Rate Anime
        </h2>

        <p
          style={{
            color: "#aaa",
            marginBottom: 25,
          }}
        >
          {title}
        </p>

        <div
          style={{
            textAlign: "center",
            fontSize: 65,
            fontWeight: 700,
            color: "#8B5CF6",
          }}
        >
          {score}
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={score}
          onChange={(e) =>
            setScore(Number(e.target.value))
          }
          style={{
            width: "100%",
            marginTop: 20,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: 35,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "#333",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(score);
              onClose();
            }}
            style={{
              background: "#8B5CF6",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ⭐ Save Rating
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
import { useState } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (review: string) => Promise<void>;
};

function ReviewModal({
  open,
  title,
  onClose,
  onSubmit,
}: Props) {
  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: "#171B2C",
          width: "650px",
          maxWidth: "90vw",
          borderRadius: 18,
          padding: "35px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: 34,
            marginBottom: 10,
          }}
        >
          ✍ Review
        </h2>

        <p
          style={{
            color: "#9CA3AF",
            marginBottom: 25,
            fontSize: 16,
          }}
        >
          {title}
        </p>

        <textarea
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          rows={8}
          placeholder="What did you think about this anime?"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 12,
            background: "#101521",
            color: "white",
            border: "1px solid #2E3446",
            fontSize: "15px",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            lineHeight: 1.6,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginTop: 25,
            gap: 20,
          }}
        >
          <span
            style={{
              color: "#7F8797",
              fontSize: 14,
            }}
          >
            Share your thoughts with the
            NextRec community.
          </span>

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            <button
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "11px 24px",
                borderRadius: 10,
                border:
                  "1px solid #3B4258",
                background: "#22283A",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>

            <button
              disabled={
                loading ||
                !review.trim()
              }
              onClick={async () => {
                setLoading(true);

                await onSubmit(
                  review.trim()
                );

                setLoading(false);

                setReview("");

                onClose();
              }}
              style={{
                padding: "11px 24px",
                borderRadius: 10,
                border: "none",
                background:
                  "#8B5CF6",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
                opacity:
                  loading ||
                  !review.trim()
                    ? 0.6
                    : 1,
              }}
            >
              {loading
                ? "Saving..."
                : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
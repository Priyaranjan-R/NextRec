import { useEffect, useState } from "react";

type ProgressModalProps = {
  open: boolean;
  title: string;

  total?: number;
  progressLabel?: string;

  initialStatus?: string;
  initialProgress?: number;

  onClose: () => void;

  onSubmit: (
    status: string,
    progress: number
  ) => void;
};

const statuses = [
  "PLANNING",
  "WATCHING",
  "COMPLETED",
  "PAUSED",
  "DROPPED",
];

function ProgressModal({
  open,
  title,

  total,
  progressLabel = "Progress",

  initialStatus = "PLANNING",
  initialProgress = 0,

  onClose,
  onSubmit,
}: ProgressModalProps) {
  const [status, setStatus] =
    useState(initialStatus);

  const [progress, setProgress] =
    useState(initialProgress);

  useEffect(() => {
    setStatus(initialStatus);
    setProgress(initialProgress);
  }, [initialStatus, initialProgress]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 430,
          background: "#161B22",
          borderRadius: 18,
          padding: 30,
          color: "white",
          boxShadow:
            "0 20px 50px rgba(0,0,0,.5)",
        }}
      >
        <h2
          style={{
            marginBottom: 8,
          }}
        >
          📚 Track Progress
        </h2>

        <p
          style={{
            color: "#999",
            marginBottom: 30,
          }}
        >
          {title}
        </p>

        {/* STATUS */}

        <div
          style={{
            marginBottom: 25,
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              background: "#0B0F19",
              color: "white",
              border: "1px solid #333",
              fontSize: 15,
            }}
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* PROGRESS */}

        <div
          style={{
            marginBottom: 30,
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            {progressLabel}
          </label>

          <input
            type="number"
            min={0}
            max={total}
            value={progress}
            onChange={(e) => {
              let value = Number(
                e.target.value
              );

              if (value < 0) value = 0;

              if (
                total !== undefined &&
                value > total
              ) {
                value = total;
              }

              setProgress(value);
            }}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              background: "#0B0F19",
              color: "white",
              border: "1px solid #333",
              fontSize: 16,
            }}
          />

          <div
            style={{
              marginTop: 12,
              color: "#BDBDBD",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            <strong
              style={{
                color: "#8B5CF6",
              }}
            >
              {progress}
            </strong>

            {total !== undefined && (
              <>
                {" "}
                /{" "}
                <strong>{total}</strong>
              </>
            )}

            {" "}
            {progressLabel}
          </div>
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: 13,
              background: "#30363D",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(
                status,
                progress
              )
            }
            style={{
              flex: 1,
              padding: 13,
              background: "#8B5CF6",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressModal;
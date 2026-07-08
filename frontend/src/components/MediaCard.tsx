import { Link } from "react-router-dom";
import { useRequireAuth } from "../hooks/useRequireAuth";
import styles from "./MediaCard.module.css";

type MediaCardProps = {
  id: number;
  type: "ANIME" | "MOVIE" | "TV" | "GAME";
  title: string;
  imageUrl: string;
  description?: string;
  rating?: number;
  genres?: string[];
  link: string;
};

function MediaCard({
  title,
  imageUrl,
  description,
  rating,
  genres,
  link,
}: MediaCardProps) {
  const requireAuth = useRequireAuth();

  return (
    <div
      className={styles.card}
      style={{
        width: "260px",
        minWidth: "260px",
        maxWidth: "260px",
        flexShrink: 0,
      }}
    >
      <Link
        to={link}
        className={styles.imageLink}
      >
        <img
          src={imageUrl}
          alt={title}
          className={styles.image}
          style={{
            width: "100%",
            height: "360px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>

      <div className={styles.content}>
        <h3
          style={{
            marginBottom: "8px",
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h3>

        {rating !== undefined && (
          <div
            style={{
              marginBottom: "8px",
              color: "#FFD54F",
              fontWeight: "bold",
            }}
          >
            ⭐ {rating.toFixed(1)}
          </div>
        )}

        {genres && genres.length > 0 && (
          <div
            style={{
              marginBottom: "10px",
              color: "#BDBDBD",
              fontSize: "13px",
            }}
          >
            {genres.join(" • ")}
          </div>
        )}

        {description && (
          <p
            style={{
              color: "#CFCFCF",
              fontSize: "14px",
              lineHeight: "1.5",
              height: "65px",
              overflow: "hidden",
            }}
          >
            {description.length > 120
              ? description.substring(0, 120) + "..."
              : description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px",
            gap: "8px",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              requireAuth(() => {
                console.log("Favorite");
              });
            }}
          >
            ❤️
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              requireAuth(() => {
                console.log("Completed");
              });
            }}
          >
            ✔️
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              requireAuth(() => {
                console.log("Watchlist");
              });
            }}
          >
            ➕
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              requireAuth(() => {
                console.log("Rate");
              });
            }}
          >
            ⭐
          </button>
        </div>

        <Link
          to={link}
          className={styles.detailsButton}
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "18px",
            padding: "10px",
            borderRadius: "8px",
            background: "#8B5CF6",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MediaCard;
type Props = {
  onFavorite: () => void;
  onWatchlist: () => void;
  onRate: () => void;
  onReview: () => void;
};

function ActionBar({
  onFavorite,
  onWatchlist,
  onRate,
  onReview,
}: Props) {
  const buttonStyle = {
    background: "#8B5CF6",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  } as const;

  return (
    <div
      style={{
        display: "flex",
        gap: 15,
        flexWrap: "wrap",
        marginTop: 30,
      }}
    >
      <button style={buttonStyle} onClick={onFavorite}>
        ❤️ Favorite
      </button>

      <button style={buttonStyle} onClick={onWatchlist}>
        📑 Watchlist
      </button>

      <button style={buttonStyle} onClick={onRate}>
        ⭐ Rate
      </button>

      <button style={buttonStyle} onClick={onReview}>
        ✍️ Review
      </button>
    </div>
  );
}

export default ActionBar;
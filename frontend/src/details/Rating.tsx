type Props = {
  rating: number;
  outOf?: 5 | 10;
};

function Rating({
  rating,
  outOf = 10,
}: Props) {
  const score = outOf === 5 ? rating * 2 : rating;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "20px 0",
        color: "white",
      }}
    >
      <span
        style={{
          color: "#FFD43B",
          fontSize: "28px",
        }}
      >
        ★
      </span>

      <span
        style={{
          fontSize: "30px",
          fontWeight: 700,
        }}
      >
        {Number(score).toFixed(1)}
      </span>

      <span
        style={{
          color: "#999",
        }}
      >
        /10
      </span>
    </div>
  );
}

export default Rating;
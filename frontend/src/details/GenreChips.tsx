type Props = {
  genres: string[];
};

function GenreChips({
  genres,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 25,
      }}
    >
      {genres.map((genre) => (
        <div
          key={genre}
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid #555",
            background: "#151925",
            color: "white",
          }}
        >
          {genre}
        </div>
      ))}
    </div>
  );
}

export default GenreChips;
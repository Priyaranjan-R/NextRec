type Props = {
  image: string;
  title: string;
};

function Poster({ image, title }: Props) {
  return (
    <img
      src={image}
      alt={title}
      style={{
        width: 320,
        borderRadius: 18,
        objectFit: "cover",
        boxShadow: "0 15px 40px rgba(0,0,0,.4)",
      }}
    />
  );
}

export default Poster;
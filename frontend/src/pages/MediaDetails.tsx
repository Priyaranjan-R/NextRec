import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function MediaDetails() {
  const { id } = useParams();

  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await api.get(
          `/media/${id}`
        );

        setMedia(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!media) {
    return <h2>Media not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <img
          src={media.imageUrl}
          alt={media.title}
          style={{
            width: "250px",
            borderRadius: "12px",
          }}
        />

        <div>
          <h1>{media.title}</h1>

          <p>
            <strong>Type:</strong>{" "}
            {media.mediaType}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {media.genres?.join(", ")}
          </p>

          <p>{media.description}</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button>
              Add to Watchlist
            </button>

            <button>
              Add to Favorites
            </button>

            <button>
              Rate
            </button>

            <button>
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaDetails;
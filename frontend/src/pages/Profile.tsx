import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import MediaCard from "../components/MediaCard";

function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `/profile/${user.id}`
        );

        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <h2
          style={{
            padding: 40,
            color: "white",
          }}
        >
          Loading...
        </h2>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <h2
          style={{
            padding: 40,
            color: "white",
          }}
        >
          Profile not found
        </h2>
      </MainLayout>
    );
  }

  const renderMediaRow = (
    title: string,
    items: any[]
  ) => (
    <div style={{ marginTop: 40 }}>
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        {title}
      </h2>

      {items.length === 0 ? (
        <p style={{ color: "#888" }}>
          Nothing here yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
          }}
        >
          {items.map((item: any) => (
            <MediaCard
              key={item.id}
              id={item.media.id}
              title={item.media.title}
              imageUrl={item.media.imageUrl}
              description={
                item.media.description || ""
              }
              link={`/${item.media.mediaType.toLowerCase()}/${item.media.externalId}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 1400,
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <h1
          style={{
            fontSize: 46,
            marginBottom: 10,
          }}
        >
          👤 My Profile
        </h1>

        <div
          style={{
            background: "#161B22",
            padding: 25,
            borderRadius: 15,
            marginBottom: 40,
          }}
        >
          <h2>{profile.username}</h2>

          <p>{profile.email}</p>

          <p>
            Joined{" "}
            {new Date(
              profile.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: 20,
          }}
        >
          <div
            style={{
              background: "#161B22",
              padding: 25,
              borderRadius: 15,
            }}
          >
            <h2>❤️ Favorites</h2>
            <h1>
              {profile.favorites.length}
            </h1>
          </div>

          <div
            style={{
              background: "#161B22",
              padding: 25,
              borderRadius: 15,
            }}
          >
            <h2>📚 Watchlist</h2>
            <h1>
              {profile.watchlists.length}
            </h1>
          </div>

          <div
            style={{
              background: "#161B22",
              padding: 25,
              borderRadius: 15,
            }}
          >
            <h2>⭐ Ratings</h2>
            <h1>
              {profile.ratings.length}
            </h1>
          </div>

          <div
            style={{
              background: "#161B22",
              padding: 25,
              borderRadius: 15,
            }}
          >
            <h2>📝 Reviews</h2>
            <h1>
              {profile.reviews.length}
            </h1>
          </div>
        </div>

        {renderMediaRow(
          "❤️ Favorites",
          profile.favorites
        )}

        {renderMediaRow(
          "📚 Watchlist",
          profile.watchlists
        )}

        <div
          style={{
            marginTop: 50,
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: 20,
            }}
          >
            ⭐ My Ratings
          </h2>

          {profile.ratings.length === 0 ? (
            <p style={{ color: "#888" }}>
              No ratings yet.
            </p>
          ) : (
            profile.ratings.map(
              (rating: any) => (
                <div
                  key={rating.id}
                  style={{
                    background:
                      "#161B22",
                    padding: 20,
                    borderRadius: 12,
                    marginBottom: 15,
                  }}
                >
                  <h3>
                    {rating.media.title}
                  </h3>

                  <p>
                    ⭐ {rating.score}/10
                  </p>
                </div>
              )
            )
          )}
        </div>

        <div
          style={{
            marginTop: 50,
            marginBottom: 80,
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: 20,
            }}
          >
            📝 My Reviews
          </h2>

          {profile.reviews.length === 0 ? (
            <p style={{ color: "#888" }}>
              No reviews yet.
            </p>
          ) : (
            profile.reviews.map(
              (review: any) => (
                <div
                  key={review.id}
                  style={{
                    background:
                      "#161B22",
                    padding: 20,
                    borderRadius: 12,
                    marginBottom: 20,
                  }}
                >
                  <h3>
                    {review.media.title}
                  </h3>

                  <p
                    style={{
                      color: "#ccc",
                      marginTop: 10,
                    }}
                  >
                    {review.content}
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
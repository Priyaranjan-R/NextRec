import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Watchlist() {
  const { user } = useAuth();

  const [watchlist, setWatchlist] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadWatchlist = async () => {
    if (!user) return;

    try {
      const response =
        await api.get(
          `/watchlist/${user.id}`
        );

      setWatchlist(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, [user]);

  const clearWatchlist =
    async () => {
      if (!user) return;

      const confirmDelete =
        window.confirm(
          "Clear your entire watchlist?"
        );

      if (!confirmDelete) return;

      try {
        await api.delete(
          `/watchlist/clear/${user.id}`
        );

        setWatchlist([]);

        alert("Watchlist cleared!");
      } catch (error) {
        console.error(error);

        alert(
          "Failed to clear watchlist"
        );
      }
    };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <h1>📚 My Watchlist</h1>

          {watchlist.length > 0 && (
            <button
              onClick={
                clearWatchlist
              }
              style={{
                background:
                  "#DC2626",
                color: "white",
                border: "none",
                padding:
                  "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Clear Watchlist
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : watchlist.length ===
          0 ? (
          <p>
            Your watchlist is
            empty.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {watchlist.map(
              (item) => (
                <div
                  key={item.id}
                  style={{
                    background:
                      "#161B22",
                    borderRadius:
                      "12px",
                    overflow:
                      "hidden",
                  }}
                >
                  <img
                    src={
                      item.media
                        .imageUrl
                    }
                    alt={
                      item.media
                        .title
                    }
                    style={{
                      width: "100%",
                      height:
                        "320px",
                      objectFit:
                        "cover",
                    }}
                  />

                  <div
                    style={{
                      padding:
                        "15px",
                    }}
                  >
                    <h3>
                      {
                        item
                          .media
                          .title
                      }
                    </h3>

                    <p>
                      Status:{" "}
                      {
                        item.status
                      }
                    </p>

                    <p>
                      Progress:{" "}
                      {
                        item.progress
                      }
                    </p>

                    <p>
                      Type:{" "}
                      {
                        item
                          .media
                          .mediaType
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Watchlist;
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

function Navbar() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  const {
    openLogin,
    openRegister,
  } = useModal();

  if (loading) {
    return null;
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        padding: "18px 40px",

        background:
          "rgba(11,15,25,0.95)",

        backdropFilter: "blur(10px)",

        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#8B5CF6",
          fontSize: "30px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        NextRec
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>

        <Link
          to="/anime"
          style={linkStyle}
        >
          Anime
        </Link>

        <Link
          to="/movies"
          style={linkStyle}
        >
          Movies
        </Link>

        <Link
          to="/tv"
          style={linkStyle}
        >
          TV
        </Link>

        <Link
          to="/games"
          style={linkStyle}
        >
          Games
        </Link>

        <Link
          to="/search"
          style={linkStyle}
        >
          Search
        </Link>

        <Link
          to="/recommendations"
          style={linkStyle}
        >
          Recommendations
        </Link>
      </div>

      {/* User */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <Link
              to="/watchlist"
              style={buttonLink}
            >
              Watchlist
            </Link>

            <Link
              to="/profile"
              style={buttonLink}
            >
              {user.username}
            </Link>

            <button
              onClick={logout}
              style={buttonStyle}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLogin}
              style={buttonStyle}
            >
              Login
            </button>

            <button
              onClick={openRegister}
              style={buttonStyle}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "15px",
  fontWeight: 500,
};

const buttonLink = {
  textDecoration: "none",
  color: "white",

  padding: "8px 14px",

  border: "1px solid rgba(255,255,255,0.15)",

  borderRadius: "8px",

  fontSize: "14px",
};

const buttonStyle = {
  background: "#8B5CF6",
  color: "white",

  border: "none",

  padding: "8px 16px",

  borderRadius: "8px",

  fontSize: "14px",

  cursor: "pointer",

  transition: "0.2s",
};

export default Navbar;
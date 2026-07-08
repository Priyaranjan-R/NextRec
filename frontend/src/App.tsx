import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthModal from "./components/AuthModal/AuthModal";

import Home from "./pages/Home";

import Anime from "./pages/Anime";
import AnimeDetails from "./pages/AnimeDetails";

import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

import TV from "./pages/TV";
import TVDetails from "./pages/TVDetails";

import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";

import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";

import Search from "./Search/Search";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Anime */}
        <Route
          path="/anime"
          element={<Anime />}
        />

        <Route
          path="/anime/:id"
          element={<AnimeDetails />}
        />

        {/* Movies */}
        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        {/* TV */}
        <Route
          path="/tv"
          element={<TV />}
        />

        <Route
          path="/tv/:id"
          element={<TVDetails />}
        />

        {/* Games */}
        <Route
          path="/games"
          element={<Games />}
        />

        <Route
          path="/games/:id"
          element={<GameDetails />}
        />

        {/* Search */}
        <Route
          path="/search"
          element={<Search />}
        />

        {/* Recommendations */}
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        {/* User */}
        <Route
          path="/watchlist"
          element={<Watchlist />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>

      <AuthModal />
    </BrowserRouter>
  );
}

export default App;
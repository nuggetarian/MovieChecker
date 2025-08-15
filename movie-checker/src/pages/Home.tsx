import MovieCard from "../components/MovieCard.js";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchRequest, searchDefaults } from "../services/api.js";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [_error, setError] = useState<string | null>(null);
  const defaultMovies: string[] = [
    "tt0477348",
    "tt0133093",
    "tt7984734",
    "tt0468569",
  ];

  const loadDefault = async () => {
    try {
      const searchedMovies = await Promise.all(
        defaultMovies.map((id: string) => searchDefaults(id))
      );
      setMovies(searchedMovies);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    }
  };

  useEffect(() => {
    loadDefault();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      const searchResults = await searchRequest(searchQuery);

      const detailedResults = await Promise.all(
        searchResults.map((movie: Movie) => searchDefaults(movie.imdbID))
      );

      setMovies(detailedResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search");
    }
    setSearchQuery("");
  };

  return (
    <div className="home">
      <h1 className="main-title">Movie Checker</h1>
      <p className="main-slogan">Seen a movie? Log it here!</p>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-div">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button type="submit" className="search-button">
            <ion-icon className="search-icon" name="search-outline"></ion-icon>
          </button>
        </div>
      </form>

      <div className="top-picks-div"></div>
      <div className="movie-grid">
        {movies !== undefined &&
          movies
            .filter(
              (movie, index, self) =>
                index ===
                self.findIndex((m: Movie) => m.imdbID === movie.imdbID)
            )
            .map((movie: Movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
      </div>
    </div>
  );
}

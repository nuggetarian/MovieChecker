import { UseMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Checks.css";

export default function Checks() {
  const { checks } = UseMovieContext();

  if (checks.length > 0) {
    return (
      <div className="checks">
        <h2 className="your-checks">Your Checked Movies</h2>
        <div className="movie-grid">
          {checks.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="checks-empty">
        <h2>No Checked Movies Yet</h2>
        <p>Start checking movies and they will appear here</p>
      </div>
    );
  }
}

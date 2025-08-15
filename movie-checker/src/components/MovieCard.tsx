import "../css/MovieCard.css";
import { UseMovieContext } from "../contexts/MovieContext";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { isChecked, addToChecked, removeFromChecked } = UseMovieContext();
  const checked = isChecked(movie.imdbID);

  function onCheckClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (checked) {
      removeFromChecked(movie.imdbID);
    } else {
      addToChecked(movie);
    }
  }

  return (
    <div className="movie-card">
      <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
      <button
        className={`checked-btn ${checked ? "active" : ""}`}
        onClick={onCheckClick}
      >
        ✔
      </button>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <ul className="movie-attributes">
          <li className="movie-attribute">
            <ion-icon
              className="movie-attribute-icon rating-icon"
              name="star"
            ></ion-icon>
            <span>{movie.imdbRating}</span>
          </li>
          <li className="movie-attribute">
            <ion-icon
              className="movie-attribute-icon"
              name="calendar-clear-outline"
            ></ion-icon>
            <span>{movie.Year}</span>
          </li>
          <li className="movie-attribute">
            <ion-icon
              className="movie-attribute-icon"
              name="time-outline"
            ></ion-icon>
            <span>{movie.Runtime}</span>
          </li>

          <li className="movie-attribute">
            <ion-icon
              className="movie-attribute-icon"
              name="pricetag-outline"
            ></ion-icon>
            <span>{movie.Genre}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

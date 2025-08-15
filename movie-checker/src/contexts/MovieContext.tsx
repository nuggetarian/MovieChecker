import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

type MovieContextType = {
  checks: Movie[];
  addToChecked: (movie: Movie) => void;
  removeFromChecked: (movieId: string) => void;
  isChecked: (movieId: string) => boolean;
};

const MovieContext = createContext<MovieContextType>({
  checks: [],
  addToChecked: () => {},
  removeFromChecked: () => {},
  isChecked: () => false,
});

export const UseMovieContext = () => useContext(MovieContext);

const defaultChecks: Movie[] = [];

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [checks, setChecks] = useState(defaultChecks);

  useEffect(() => {
    const storedChecks = localStorage.getItem("checks");

    if (storedChecks) setChecks(JSON.parse(storedChecks));
  }, []);

  useEffect(() => {
    if (checks !== defaultChecks) {
      localStorage.setItem("checks", JSON.stringify(checks));
    }
  }, [checks]);

  const addToChecked = (movie: Movie) => {
    setChecks((prev) => [...prev, movie]);
  };

  const removeFromChecked = (movieId: string) => {
    setChecks((prev) => prev.filter((movie) => movie.imdbID !== movieId));
  };

  const isChecked = (movieId: string) => {
    return checks.some((movie: Movie) => movie.imdbID === movieId);
  };

  const value = {
    checks,
    addToChecked,
    removeFromChecked,
    isChecked,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

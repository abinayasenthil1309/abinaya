import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./movies.css";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading movies...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <h2>{movie.title}</h2>

            <p>
              <strong>Tagline:</strong>{" "}
              {movie.tagline || "No tagline available"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average
                ? `${movie.vote_average}/10`
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
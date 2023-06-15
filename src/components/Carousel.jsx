import React, { useState } from "react";
import "./Carousel.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  const handleAddMovie = () => {
    const newMovie = {
      name,
      rating
    };

    setMovies([...movies, newMovie]);
    setName("");
    setRating("");
  };

  const handleDeleteMovie = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Nome do filme"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nota do filme"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleAddMovie}>Adicionar</button>
      </div>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie" key={index}>
            <span>{movie.name}</span>
            <span className="rating">Nota: {movie.rating}</span>
            <button onClick={() => handleDeleteMovie(index)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

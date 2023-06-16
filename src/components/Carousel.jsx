import React, { useEffect, useState } from "react";
import { app } from "../services/FirebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Carousel.css";

const App = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchedMovieName, setWatchedMovieName] = useState("");
  const [watchedMovieRating, setWatchedMovieRating] = useState("");
  const [watchlistMovieName, setWatchlistMovieName] = useState("");
  const [streamingPlatform, setStreamingPlatform] = useState("");
  const [filmes, setFilmes] = useState([]);

  const db = getFirestore(app);
  const filmesCollection = collection(db, "filmes");

  useEffect(() => {
    const getFilmes = async () => {
      const data = await getDocs(filmesCollection);
      setFilmes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFilmes();
  }, []);

  const handleAddWatchedMovie = async () => {
    if (watchedMovieName.trim() === "" || watchedMovieRating.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newMovie = {
      name: watchedMovieName,
      rating: watchedMovieRating,
    };

    try {
      const docRef = await addDoc(filmesCollection, { nome: watchedMovieName });
      setWatchedMovies((prevMovies) => [...prevMovies, { ...newMovie, id: docRef.id }]);
      setWatchedMovieName("");
      setWatchedMovieRating("");
      alert("Filme assistido adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar filme assistido: ", error);
    }
  };

  const handleDeleteWatchedMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "filmes", id));
      setWatchedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      alert("Filme assistido excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir filme assistido: ", error);
    }
  };

  const handleAddWatchlistMovie = () => {
    if (watchlistMovieName.trim() === "" || streamingPlatform.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newMovie = {
      name: watchlistMovieName,
      streamingPlatform,
    };

    setWatchlistMovies((prevMovies) => [...prevMovies, newMovie]);
    setWatchlistMovieName("");
    setStreamingPlatform("");
    alert("Filme para assistir adicionado com sucesso!");
  };

  const handleDeleteWatchlistMovie = (index) => {
    const updatedMovies = [...watchlistMovies];
    updatedMovies.splice(index, 1);
    setWatchlistMovies(updatedMovies);
  };

  const streamingPlatforms = [
    "Netflix",
    "Amazon Prime Video",
    "Disney+",
    "HBO Max",
    "Hulu",
    "Apple TV+",
    "YouTube Premium",
  ];

  return (
    <div className="container">
      <div className="inputs-container">
        <h2>Filmes Assistidos</h2>
        <input
          type="text"
          placeholder="Nome do filme"
          value={watchedMovieName}
          onChange={(e) => setWatchedMovieName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nota do filme"
          value={watchedMovieRating}
          onChange={(e) => setWatchedMovieRating(e.target.value)}
        />
        <button onClick={handleAddWatchedMovie}>Adicionar</button>
      </div>
      <div className="movies-container">
        <h2>Filmes Assistidos</h2>
        {watchedMovies.map((movie) => (
          <div className="movie" key={movie.id}>
            <span>{movie.name}</span>
            <span className="rating">Nota: {movie.rating}</span>
            <button onClick={() => handleDeleteWatchedMovie(movie.id)}>
              Excluir
            </button>
          </div>
        ))}
        <div>
          {filmes.map((filme) => (
            <div key={filme.id}>
              <p>{filme.nome}</p>
              <button onClick={() => handleDeleteWatchedMovie(filme.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="inputs-container">
        <h2>Filmes para Assistir</h2>
        <input
          type="text"
          placeholder="Nome do filme"
          value={watchlistMovieName}
          onChange={(e) => setWatchlistMovieName(e.target.value)}
        />
        <select
          value={streamingPlatform}
          onChange={(e) => setStreamingPlatform(e.target.value)}
        >
          <option value="">Selecione a plataforma</option>
          {streamingPlatforms.map((platform, index) => (
            <option key={index} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <button onClick={handleAddWatchlistMovie}>Adicionar</button>
      </div>
      <div className="movies-container">
        <h2>Filmes para Assistir</h2>
        {watchlistMovies.map((movie, index) => (
          <div className="movie" key={index}>
            <span>{movie.name}</span>
            <span className="platforms">Plataforma: {movie.streamingPlatform}</span>
            <button onClick={() => handleDeleteWatchlistMovie(index)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

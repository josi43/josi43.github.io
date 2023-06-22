import React from "react";

const Card = (movie) => {
  let img_path = "https://image.tmdb.org/t/p/w500";
  return (
    <>

      <div className="movie">
        <h4>{movie.info.title}</h4>
        <img src={img_path + movie.info.poster_path} className="poster" alt={movie.info.title} />
      </div>
    </>
  );
};

export default Card;

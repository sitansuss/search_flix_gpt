import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);
  console.log(movies);
  return (
    <div className="bg-black" >
      <div className="-relative pl-4 md:pl-8 mt-0 md:-mt-72">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />

      <MovieList title={"Popular"} movies={movies.PopularMovies} />
      <MovieList title={"Upcomng Movies"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;

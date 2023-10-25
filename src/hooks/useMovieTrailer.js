import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";






const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(store => store.movie.trailerVideo)

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      const filterdata = json.results.filter(
        (video) => video.name === "Official Trailer"
      );

      const id = filterdata.length ? filterdata[0] : json.results[0];

      dispatch(addTrailerVideo(id));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;

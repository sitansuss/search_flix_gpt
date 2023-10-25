import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";
const GptSerachBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);
  const serachText = useRef(null);

  const searchMoviesTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation systema and suggest some movies for the query" +
      serachText.current.value +
      ". only give me names of 5 movies , comma separated like the example result given ahead. Example Result:movie1, movie2, movie3, movie4, movie5";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    const gptMovies = gptResults.choices[0]?.message?.content.split(", ");
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMoviesTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovieResults({movieNames:gptMovies, movieResults : tmdbResults}));
  };
  return (
    <div className=" pt-[45%] md:pt-[10%] flex justify-center ">
      <form
        className="w-full md:w-1/2 mx-2 md:mx-0  bg-gray-950 grid grid-cols-12 rounded-md shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={serachText}
          type="text"
          placeholder={lang[langkey].gptSearchPlaceholder}
          className="py-3 md:px-5 px-2 m-4 md:ml-8 ml-3 text-sm md:text-md col-span-9 rounded-md"
        />
        <button
          className="col-span-3 my-4 md:mr-8 mr-3 py-3 md:px-4  text-sm md:text-md bg-red-700 text-white rounded-md font-semibold"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSerachBar;

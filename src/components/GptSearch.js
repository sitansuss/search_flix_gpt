import React from "react";
import GptSerachBar from "./GptSerachBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-10">
        <img
        className="bg-image bg-cover bg-center min-h-screen object-cover"
          src={BG_URL}
          alt=""
        />
      </div>
    <div className="">
      
      <GptSerachBar />
      <GptMovieSuggestions />
    </div>
    </>
  );
};

export default GptSearch;

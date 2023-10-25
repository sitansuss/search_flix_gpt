import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        //gptMovies:null,
        movieNames:null,
        movieResults:null,
    },
    reducers:{
        toggleGptSerachView:(state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResults:(state,action) => {
            const {movieNames,movieResults} = action.payload;
            //state.gptMovies = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;

        } 
    }

})


export const {toggleGptSerachView, addGptMovieResults} = gptSlice.actions;
export default gptSlice.reducer;
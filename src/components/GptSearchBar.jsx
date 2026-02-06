import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch()
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null);

    // Search Movie in TMDB
    const searchMovieTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS)
        const json = await data.json();
        return json.results;
    }

    const handleGptSearchClick = async () => {
        // console.log(searchText.current.value)
        // Make an API call to GPT API and get Movie Results

        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Sultan"

        const gptResults = await openai.chat.completions.create({
        model: 'gpt-5.2',
        messages: [
        { role: 'user', content: gptQuery },
        ],
        });

        console.log(gptResults.choices?.[0].message?.content)

        // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane bhi do Yaaro, Padosan
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        // [ "Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane bhi do Yaaro", "Padosan"]

        // For each movie I will search TMDB API
        
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise]

        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);

        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }))
    }


  return (
    <div className='pt-[30%] md:pt-[10%] flex justify-center'>
        <form className='w-[85%] md:w-1/2 bg-black grid grid-cols-12 rounded-lg' 
        onSubmit={(e) => e.preventDefault()}>
        <input type="text" 
        ref={searchText}
        className='p-3 m-4 col-span-9 rounded-lg'
        placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='col-span-3 bg-red-700 text-white m-4 py-2 px-2 rounded-lg'
        onClick={handleGptSearchClick}>
            {lang[langKey].search}
        </button>
        </form>
      
    </div>
  )
}

export default GptSearchBar

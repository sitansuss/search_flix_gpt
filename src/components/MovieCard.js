import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if (!posterPath) return null; 
  return (
    <div className='w-36 md:w-44 pr-6 shadow-lg '>
        <img className="rounded-lg" alt='Movie Card'
        src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard
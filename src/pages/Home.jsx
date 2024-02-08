import React from 'react'
import Hero from '../components/Hero.jsx'
import MovieRow from '../components/MovieRow.jsx'
import endpoints from '../services/movieServices.js'
const Home = () => {
  return (
    <>
     <Hero/>
     <MovieRow title='Upcoming' url={endpoints.upcoming}/>
     <MovieRow title='Trending' url={endpoints.trending} />
     <MovieRow title='Popular' url={endpoints.popular}/>
     <MovieRow title='Top Rated' url={endpoints.topRated}/>
     <MovieRow title='Comedy' url={endpoints.comedy}/>
     
    </>
  )
}

export default Home
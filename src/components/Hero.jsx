import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints, { createImage } from '../services/movieServices.js';
const Hero = () => {
  // const category = ['popular','trending','comedy','upcoming','topRated'];
  // const randomc = category[Math.floor(Math.random() * category.length)];
  const [movie,setmovie] = useState({});
  useEffect(()=>{
    axios.get(endpoints.trending).then((res)=>{
      //console.log(res.data);
      const movies = res.data.results;
      const randommovie = movies[Math.floor(Math.random() * movies.length)];
      setmovie(randommovie);
    })
  },[]);
  
  if(!movie){
    return (
      <>
       <p>
         Fetching movie...
       </p>
      </>
    )
  }

  const truncate = (str,len)=>{
    if(!str) return "";

    return str.length > len ? str.slice(0,len) + " ..." : str;
  }

  const {title,backdrop_path,release_date,overview} = movie;
  return (
    <div className='w-full h-[550px] lg:h-[850px]'>
       <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black">
          <img className='w-full h-full object-cover object-top opacity-50' src={createImage(backdrop_path,"original")} alt={title}/>
          <div className='absolute w-full top-[30%] lg:top-[35%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-6xl font-nsans-bold'>{title}</h1>
            <div className='mt-8 mb-4'>
              <button className='border text-black py-2 px-5 capitalize ml-4 bg-gray-200'>Play</button>
              <button className='border border-gray-300 py-2 px-5 capitalize ml-4'>Watch Later</button>
            </div>
            <p className="text-gray-300 text-sm">{release_date}</p>
            <p className='w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200'>{truncate(overview,150)}</p>
          </div>
          
        </div>
       </div>
    </div>
  )
}

export default Hero
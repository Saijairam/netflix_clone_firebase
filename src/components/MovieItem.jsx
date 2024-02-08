import React, { useState } from 'react'
import { createImage } from '../services/movieServices';
import {FaHeart,FaRegHeart} from 'react-icons/fa';
import {UserAuth} from '../context/AuthContext'
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'
import {db} from '../services/Firebase';

const MovieItem = ({movie}) => {
  const [like,setlike] = useState(false); // intially no like : 
  const {title,backdrop_path,poster_path} = movie;
  const {user} = UserAuth();
  const markFavShow = async ()=>{
    const useremail = user?.email;

    if(useremail){
       const userDoc = doc(db, "users", useremail) ;
       setlike(!like);
       await updateDoc(userDoc,{
        savedShows : arrayUnion({...movie}),
       });
    }else{
      alert("Login to save a movie")
    }
  }

  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
      <img className='w-full h-40 block object-cover object-top'
       src={createImage(backdrop_path ?? poster_path,"w500")} alt={title} />

       <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
         <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>

         <p className='cursor-pointer' onClick={markFavShow}>
            {like ? <FaHeart size={20} className='absolute top-2 left-2 text-gray-200'/> : <FaRegHeart size={20} className='absolute top-2 left-2 text-gray-200'/>}
         </p>
       </div>
    </div>
    
  )
}

export default MovieItem
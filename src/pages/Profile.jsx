import React,{useState,useEffect} from 'react'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import {db} from '../services/Firebase'
import {UserAuth} from '../context/AuthContext'
import {createImage} from '../services/movieServices'
import {arrayRemove,doc,onSnapshot,updateDoc} from 'firebase/firestore'

const Profile = () => {

  const [movies,setmovies] = useState([]);
  const {user} = UserAuth();

  useEffect(()=>{
    if(user){
      onSnapshot(doc(db,"users",`${user.email}`),(doc)=>{
          if(doc.data()){
            setmovies(doc.data().savedShows);
          }
      })
    }
  },[user?.email]);
//  console.log(movies);
 if(!user){
  return (
    <p>Please Login to see your saved shows</p>
  )
 }

 const slide = (offset) => {
  const slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft + offset;
 }

const unlike = async (movie)=>{
  const userdoc = doc(db,"users",user.email);

  await updateDoc(userdoc,{
    savedShows : arrayRemove(movie),
  })
}

  return (
    <>
      <div>
        <div>
          <img className='block w-full h-[500px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt=".." />

          <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]'></div>

          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>My Shows</h1>
            <p className='text-gray-400 font-nsans-light text-lg'>{user.email}</p>
          </div>
        </div>

        {/* MovieRow */}
        <h2 className='capitalize font-nsans-bold md:text-xl p-4'>My Shows</h2>

        <div className='relative flex items-center group'>
        <MdChevronLeft onClick={()=>slide(-500)} size={40} className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'/>
        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {movies.map((movie)=>(
            // <MovieItem key={movie.id} movie={movie}/>
          <div key={movie.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
            <img className='w-full h-40 block object-cover object-top'
            src={createImage(movie.backdrop_path ?? movie.poster_path,"w500")} alt={movie.title} />

            <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
              <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>
              <p>
                <AiOutlineClose size={30} 
                onClick={()=>unlike(movie)}
                className='absolute top-2 right-2'/>
              </p>
            </div>
          </div>
            ))}
        </div>
        <MdChevronRight onClick={()=>slide(500)} size={40} className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'/>
      </div>
      </div>
    </>
  )
}

export default Profile
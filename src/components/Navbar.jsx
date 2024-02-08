import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const {user,logOut} = UserAuth();
  const navigate = useNavigate(); 
  
  const handleLogout = async () =>{
      try {
        await logOut();
        navigate('/');
      } catch (error) {
         console.log(error.message);
      }
  }
  
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
          SJR
        </h1>
      </Link>
      {user?.email ? 
      <div className='for-exist-users'>
          <Link to='/profile'>
            <button className='text-white pr-4'>Profile</button>
          </Link>
          
           <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
              Log Out
            </button>
          
       </div>
      :
      <div className='for-new-users'>
        <Link to='/login'>
          <button className='text-white pr-4'>Login</button>
        </Link>
        <Link to='/signup'>
          <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
            Sign Up
          </button>
        </Link>
    </div>
      }
        
      
    </div>
  );
};

export default Navbar;
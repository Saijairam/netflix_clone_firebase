import React from 'react'
import { Navigate } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext'
const ProtectedRoute = ({children}) => {
  const {user} = UserAuth();

  if(!user){
    //if no user is sign up return to main page : 
    return <Navigate to='/'/>
  }

  return children;
  
}

export default ProtectedRoute
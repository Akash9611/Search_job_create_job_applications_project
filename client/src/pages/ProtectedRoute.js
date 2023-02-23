import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Loading from '../components/Loading'
const ProtectedRoute = ({ children }) => {
  //We are using this concept for Unauthorized users will not able to access those pages by just using URL
  const { user, userLoading } = useAppContext()

  if (userLoading){
    return <Loading />   //when we are using COOKIES to store user, location and token values we have to initialize it before checking user...if we haven't return it, when we will reload the page -then every time we get redirected to landing page
  }
    

  if (!user) {  //if user not logged-in //unauthorized user ...it will always navigate landing page
    return <Navigate to='/landing' />
  }
  return children

}

export default ProtectedRoute
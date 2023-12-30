import React from 'react';
import { Navigate } from 'react-router-dom'; // You might use a different routing library
import Header from '../Header';
import Footer from '../Footer';
import { useDispatch } from 'react-redux';
import { userAdded } from '../../redux/features/signup/signupSlice';

const AuthWrapper = ({children }) => {
  const dispatch = useDispatch();
  const isAuth = JSON.parse(localStorage.getItem('user')).logged;
  
  // const isAuth = true;


  if (isAuth === true) {
    // dispatch(userAdded(isAuth))
    dispatch(userAdded(JSON.parse(localStorage.getItem('user'))))
    return (
      <>
        {
          isAuth && <Header />
        }
        {children}  {/* Render the children if authenticated */}
        {
          isAuth && <Footer />
        }
      </> 
    )
  } else {
    // Redirect to login or any other appropriate page
    return <Navigate to="/signin" />;
  }
};

export default AuthWrapper;
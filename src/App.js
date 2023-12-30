import React from 'react';
import '../src/App.css'
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/Login/SignIn';
import AuthWrapper from './Components/Layout/AuthWrapper';
import LogVideo from './Components/Layout/Logvideo';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import OtpVerify from './Components/ForgotPassword/OtpVerify';
import ResetPassword from './Components/ForgotPassword/ResetPassword';
import CardBox from './Components/Pages/CardBox';
import NotFound from './Components/Pages/NotFound';
import AddNewList from './Components/Pages/AddNewList';
import Shop from './Components/Pages/Shop';
import WishList from './Components/Pages/WishList';
import Cart from './Components/Pages/Cart';
import SingleProduct from './Components/Pages/SingleProduct';
import Checkout from './Components/Pages/Checkouts/Checkout';
import OrderList from './Components/Pages/Checkouts/OrderList';
import Profile from './Components/Pages/Profile';


const App = () => {
  const isAuth = JSON.parse(localStorage.getItem('user'));
  if(isAuth === null){
    localStorage.setItem('user', JSON.stringify({'logged':false}))
  }

  return (
    <>

      <Routes>
        <Route path='/signup' element={<LogVideo><SignUp /></LogVideo>}></Route>
        <Route path='/signin' element={<LogVideo><SignIn /></LogVideo>}></Route>
        <Route path='/forgotpassword' element={<LogVideo><ForgotPassword /></LogVideo>}></Route>
        <Route path='/otpverify' element={<LogVideo><OtpVerify /></LogVideo>}></Route>
        <Route path='/resetpassword' element={<LogVideo><ResetPassword /></LogVideo>}></Route>
        <Route path='/shop-page' element={<AuthWrapper><AddNewList/></AuthWrapper>} />
        <Route path='/' element={<AuthWrapper><Shop/></AuthWrapper>} />
        <Route path='/Comments' element={<AuthWrapper><CardBox /></AuthWrapper>}></Route>
        <Route path='/lists' element={<AuthWrapper><WishList /></AuthWrapper>}></Route>
        <Route path='/cart' element={<AuthWrapper><Cart /></AuthWrapper>}></Route>
        <Route path='/product/:id' element={<AuthWrapper><SingleProduct /></AuthWrapper>}></Route>
        <Route path='/checkout' element={<AuthWrapper><Checkout /></AuthWrapper>}></Route>
        <Route path='/order-list' element={<AuthWrapper><OrderList /></AuthWrapper>}></Route>
        <Route path='/profile' element={<AuthWrapper><Profile /></AuthWrapper>}></Route>
        <Route path='*' element={<AuthWrapper><NotFound/></AuthWrapper>} />
      </Routes>

    </>
  );
};

export default App;
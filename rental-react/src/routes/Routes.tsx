import React from 'react';
import { Route,Routes } from 'react-router-dom';
import HeadersPage from "../pages/headersPage/HeadersPage";
import AuthForm from '../pages/authPage/components/AuthForm';
const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/headers' element={<HeadersPage/>}/>
        <Route path='/' element={<AuthForm/>}/>
      </Routes>
    </>
  )
}

export default AppRoutes
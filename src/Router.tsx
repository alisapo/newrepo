import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import UserPage from './features/userPage/userPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path={'user/:login'} element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;

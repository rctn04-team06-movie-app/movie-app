import React from 'react';
import Navigation from './components/navigation';
import HomePage from './pages';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './pages/detail';
import SplashPage from './pages/splash';
import NotFoundPage from './pages/not-found';
import LoadingBar from 'react-redux-loading-bar';
import './input.css';

function App() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline dark:bg-black dark:text-white'>
        Hello world!
      </h1>
      <LoadingBar />
      <Navigation />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/:id' element={<DetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

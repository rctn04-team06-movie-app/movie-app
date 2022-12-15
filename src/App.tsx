import React from 'react';
import Navigation from './components/navigation';
import HomePage from './pages';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './pages/detail';
import SplashPage from './pages/splash';
import NotFoundPage from './pages/not-found';
import LoadingBar from 'react-redux-loading-bar';
import './input.css';
import useTextInput from './hooks/use-text-input';

function App() {
  const [page, setPage] = React.useState(1);
  const [title, setTitle] = useTextInput('');
  return (
    <div className='dark:bg-slate-800 dark:text-white'>
      <LoadingBar />
      <Navigation title={title} setTitle={setTitle} setPage={setPage} />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route
          path='/home'
          element={<HomePage title={title} page={page} setPage={setPage} />}
        />
        <Route path='/:id' element={<DetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

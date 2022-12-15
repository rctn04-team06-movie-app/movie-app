import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import movie from '../assets/lotties/movie.json';

export default function SplashPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => navigate('/home'), 5000);
  }, [navigate]);

  return (
    <div className='w-fit mx-auto h-[100vh]'>
      <Player src={movie} autoplay loop />
      <p className='text-center text-3xl font-bold text-slate-500 dark:text-slate-200'>
        Movie App
      </p>
    </div>
  );
}

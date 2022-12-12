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
    <>
      <Player src={movie} autoplay loop />
    </>
  );
}

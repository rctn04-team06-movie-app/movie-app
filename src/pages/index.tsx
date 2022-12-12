import { useAppDispatch, useAppSelector } from '../app/hooks';
import { movieListAsync, selectMovie } from '../features/movie/movie-slice';
import * as React from 'react';
import MovieCard from '../components/movie-card';

export default function HomePage() {
  const { movies } = useAppSelector(selectMovie);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(movieListAsync({ s: 'man' }));
  }, [dispatch]);

  return (
    <>
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </>
  );
}

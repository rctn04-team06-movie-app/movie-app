import { useAppDispatch, useAppSelector } from '../app/hooks';
import { movieListAsync, selectMovie } from '../features/movie/movie-slice';
import * as React from 'react';
import MovieCard from '../components/movie-card';
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react';
import { Player } from '@lottiefiles/react-lottie-player';
import movie from '../assets/lotties/movie.json';
import notfound from '../assets/lotties/lonely.json';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

export default function HomePage(props: Props) {
  const { movies, status } = useAppSelector(selectMovie);
  const dispatch = useAppDispatch();

  const { page, setPage, title = 'man' } = props;

  const onIncrease = React.useCallback(
    () => setPage((page) => page + 1),
    [setPage],
  );
  const onDecrease = React.useCallback(
    () => setPage((page) => page - 1),
    [setPage],
  );

  React.useEffect(() => {
    dispatch(movieListAsync({ s: title ? title : 'man', page }));
  }, [dispatch, page, title]);

  if (status === 'loading') {
    return (
      <div className='w-fit mx-auto h-[100vh]'>
        <Player src={movie} autoplay loop />
        <p className='text-center text-3xl font-bold text-slate-500 dark:text-slate-200'>
          Loading ...
        </p>
      </div>
    );
  } else if (status === 'failed') {
    return (
      <>
        <div className='w-fit mx-auto h-[100vh]'>
          <Player src={notfound} autoplay loop />
          <p className='text-center text-3xl font-bold text-slate-500 dark:text-slate-200'>
            Data Not Found
          </p>
        </div>
      </>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-row flex-wrap gap-4 m-auto justify-center '>
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </div>
      <div className='flex flex-row items-center gap-8'>
        {page > 1 && (
          <button onClick={onDecrease}>
            <CaretCircleLeft size={36} />
          </button>
        )}
        <span>{page} Page</span>
        <button onClick={onIncrease}>
          <CaretCircleRight size={36} />
        </button>
      </div>
    </div>
  );
}

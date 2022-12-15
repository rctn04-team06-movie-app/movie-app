import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as React from 'react';
import { movieAsync, selectMovie } from '../features/movie/movie-slice';
import { Player } from '@lottiefiles/react-lottie-player';
import movies from '../assets/lotties/movie.json';
import notfound from '../assets/lotties/lonely.json';

function LabelAndContent({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <div>
      <span className='text-slate-900 text-1xl underline underline-offset-1 font-bold dark:text-white'>
        {label}
      </span>
      <p className='text-slate-900 text-justify font-medium dark:text-slate-400 '>
        {content}
      </p>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const { movie, status } = useAppSelector(selectMovie);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(movieAsync({ i: id!, plot: 'full' }));
  }, [dispatch, id]);

  if (status === 'idle') {
    if (movie) {
      return (
        <div className='h-[95vh] p-8 m-auto'>
          <h2 className='text-5xl mb-8 underline underline-offset-8 font-semibold text-center'>
            {movie.Title}
          </h2>
          <div className='flex items-start gap-8 px-10 w-full justify-center mb-11'>
            <img
              width={210}
              height={300}
              src={movie.Poster ? movie.Poster : process.env.REACT_APP_URL_404}
              loading='lazy'
              className='object-containt h-[300px] w-[211px]'
            />
            <div className='gap-4'>
              <LabelAndContent label='Genre' content={movie.Genre} />
              <LabelAndContent label='Director' content={movie.Director} />
              <LabelAndContent
                label='Actors'
                content={movie.Actor ? movie.Actor : '-'}
              />
              <LabelAndContent label='Language' content={movie.Language} />
              <LabelAndContent label='Type' content={movie.Type} />
              <LabelAndContent label='Rating' content={movie.imdbRating} />
            </div>
          </div>
          <LabelAndContent label='Plot' content={movie.Plot} />
        </div>
      );
    }
    return <></>;
  } else if (status === 'loading') {
    return (
      <>
        <div className='w-fit mx-auto h-[100vh]'>
          <Player src={movies} autoplay loop />
          <p className='text-center text-3xl font-bold text-slate-500 dark:text-slate-200'>
            Loading ...
          </p>
        </div>
      </>
    );
  } else {
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
}

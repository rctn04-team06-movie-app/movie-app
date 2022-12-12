import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as React from 'react';
import { movieAsync, selectMovie } from '../features/movie/movie-slice';

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
        <>
          <img
            src={movie.Poster ? movie.Poster : process.env.REACT_APP_URL_404}
            loading='lazy'
          />
          <h2>Title : {movie.Title}</h2>
          <p>Plot : {movie.Plot}</p>
          <p>Actor:{movie.Actor}</p>
          <p>Awards: {movie.Awards}</p>
          <p>Rated: {movie.Rated}</p>
          <p>Language:{movie.Language}</p>
          <p>Genre : {movie.Genre}</p>
          <p>Country: {movie.Country}</p>
          <p>Writter: {movie.Writter}</p>
          <p>Production: {movie.Production}</p>
        </>
      );
    }
    return <></>;
  } else if (status === 'loading') {
    return <>Loading</>;
  } else {
    return <>Failed</>;
  }
}

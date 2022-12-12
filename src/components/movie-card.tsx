import { MovieLiteModel } from '../utils/model';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
interface Props {
  movie: MovieLiteModel;
}

export default function MovieCard(props: Props) {
  const {
    movie: {
      Poster = process.env.REACT_APP_URL_404,
      Title,
      Type,
      Year,
      imdbID,
    },
  } = props;

  const navigate = useNavigate();

  const onClick = React.useCallback(() => {
    navigate(`/${imdbID}`);
  }, [imdbID, navigate]);

  return (
    <a onClick={onClick}>
      <div>
        <h2>{Title}</h2>
        <img src={Poster} loading='lazy' alt={Title} />
        <p>
          {Year}, {Type}
        </p>
      </div>
    </a>
  );
}

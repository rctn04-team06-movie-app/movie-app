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
    <a
      onClick={onClick}
      className='shadow-lg hover:shadow-sm cursor-pointer w-[205px] gap-2 flex flex-col border-black rounded-3xl border-2 dark:border-slate-600 '
    >
      <img
        src={Poster}
        className='h-[300px] object-cover rounded-tl-3xl rounded-tr-3xl '
        loading='lazy'
        alt={Title}
      />
      <p className='text-center whitespace-nowrap overflow-hidden text-ellipsis px-3'>
        {Title}
      </p>
      <p className='text-center dark:text-slate-400 '>
        {Year}, {Type}
      </p>
    </a>
  );
}

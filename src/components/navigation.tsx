import { useAppDispatch } from '../app/hooks';
import * as React from 'react';
import { movieListAsync } from '../features/movie/movie-slice';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/use-theme';
import { Sun, Moon } from 'phosphor-react';

interface Props {
  title: string;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Navigation(props: Props) {
  const { title, setTitle, setPage } = props;
  const { onToggle, theme } = useTheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch(movieListAsync({ s: title, page: 1 }));
      setPage(1);
    },
    [dispatch, setPage, title],
  );

  return (
    <header className='flex flex-row items-center px-8 py-4 '>
      <Link to='/home' className='flex-1 text-2xl font-extrabold'>
        Movie App
      </Link>
      <nav className='flex flex-row'>
        <button onClick={onToggle} className='mr-2'>
          {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <form onSubmit={onSubmit}>
          <input
            placeholder='search title...'
            value={title}
            className='p-2 rounded-md border-2 border-black placeholder:text-black  dark:bg-slate-600  dark:placeholder:text-white dark:border-slate-600 '
            onChange={setTitle}
          />
        </form>
      </nav>
    </header>
  );
}

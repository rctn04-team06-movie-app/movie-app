import { useAppDispatch } from '../app/hooks';
import useTextInput from '../hooks/use-text-input';
import * as React from 'react';
import { movieListAsync } from '../features/movie/movie-slice';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/use-theme';

export default function Navigation() {
  const [title, setTitle] = useTextInput('');
  const { onToggle, theme } = useTheme();
  const dispatch = useAppDispatch();

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch(movieListAsync({ s: title }));
    },
    [dispatch, title],
  );

  return (
    <header>
      <Link to='/home'>Movie-App</Link>
      <nav>
        <button onClick={onToggle}>{theme}</button>
        <form onSubmit={onSubmit}>
          <input
            placeholder='search title...'
            value={title}
            onChange={setTitle}
          />
        </form>
      </nav>
    </header>
  );
}

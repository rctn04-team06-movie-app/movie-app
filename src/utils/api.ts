import qs from 'query-string';
import { MovieLiteModel, MovieModel } from './model';

export async function fetchMovieSearch(input: { s: string }) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}&${qs.stringify(input!)}`,
  );

  const result = await response.json();
  return result as {
    Search: MovieLiteModel[];
  };
}

export async function fetchMovieDetail(input: { i: string; plot: string }) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}&${qs.stringify(input)}`,
  );

  const result = await response.json();
  return result as MovieModel;
}

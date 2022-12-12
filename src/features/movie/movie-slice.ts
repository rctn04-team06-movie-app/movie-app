import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { RootState } from '../../app/store';
import { fetchMovieDetail, fetchMovieSearch } from '../../utils/api';
import { MovieLiteModel, MovieModel } from '../../utils/model';

export interface MovieState {
  movies: MovieLiteModel[];
  movie: MovieModel | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieState = {
  movies: [],
  movie: null,
  status: 'idle',
};

export const movieListAsync = createAsyncThunk(
  'movies/fetchMovieList',
  async (input: { s: string }, { dispatch }) => {
    dispatch(showLoading());
    const result = await fetchMovieSearch(input);
    dispatch(hideLoading());
    return result;
  },
);

export const movieAsync = createAsyncThunk(
  'movie/fetchMovieDetail',
  async (input: { i: string; plot: string }, { dispatch }) => {
    dispatch(showLoading());
    const result = await fetchMovieDetail(input);
    dispatch(hideLoading());

    return result;
  },
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(movieListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload!.Search;
      })
      .addCase(movieListAsync.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(movieAsync.pending, (state) => {
        // dispatch(showLoading());
        state.status = 'loading';
        state.movie = null;
      })
      .addCase(movieAsync.fulfilled, (state, action) => {
        // dispatch(hideLoading());
        state.status = 'idle';
        state.movie = action.payload;
      })
      .addCase(movieAsync.rejected, (state) => {
        // dispatch(hideLoading());
        state.status = 'failed';
        state.movie = null;
      });
  },
});

export const selectMovie = (state: RootState) => state.movie;

export default movieSlice.reducer;

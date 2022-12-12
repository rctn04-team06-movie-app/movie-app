import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movie-slice';
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from 'react-redux-loading-bar';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

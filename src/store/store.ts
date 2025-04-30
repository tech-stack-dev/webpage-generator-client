import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import { generatedPageReducer } from './slices/generatePageSlice';

// NOTE: useful default middleware with niceties like polling, recommended to be added by default
const middlewares = [baseApi.middleware];

// NOTE: combining reducers for API calls and app-state
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  generatedPageSlice: generatedPageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import { generatedPageReducer } from './slices/generatePageSlice';

const middlewares = [baseApi.middleware];

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

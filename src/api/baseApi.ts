import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

console.log('URL', import.meta.env.VITE_PUBLIC_API_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
  prepareHeaders: () => {},
});

// NOTE: tag used for caching and its invalidation of API-requests
export const PAGES_TAG = 'Pages';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [PAGES_TAG],
});

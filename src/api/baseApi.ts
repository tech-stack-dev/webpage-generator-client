import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: () => {},
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

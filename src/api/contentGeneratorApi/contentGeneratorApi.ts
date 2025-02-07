import { baseApi } from '../baseApi';

const contentGeneratorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generateContent: build.mutation({
      query: (body) => ({
        url: 'generated-page',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGenerateContentMutation } = contentGeneratorApi;

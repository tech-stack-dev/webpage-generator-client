import { baseApi } from '../baseApi';
import { PageGenerationRequest, PageGenerationResponse } from './types';

const contentGeneratorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generatePage: build.mutation<PageGenerationResponse, PageGenerationRequest>({
      query: (body) => ({
        url: 'generated-page/generate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGeneratePageMutation } = contentGeneratorApi;

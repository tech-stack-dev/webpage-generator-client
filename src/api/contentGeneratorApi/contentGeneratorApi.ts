import { baseApi } from '../baseApi';
import {
  PageGenerationRequest,
  PageGenerationResponse,
  WebpageRecord,
} from './types';
import { PAGES_TAG } from '../baseApi';

const contentGeneratorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generatePage: build.mutation<PageGenerationResponse, PageGenerationRequest>(
      {
        query: (body) => ({
          url: 'generated-page/generate',
          method: 'POST',
          body,
        }),
      }
    ),
    getPages: build.query<WebpageRecord[], void>({
      query: () => ({
        url: 'generated-page/records',
      }),
      providesTags: [PAGES_TAG],
    }),
    saveToWebflow: build.mutation({
      query: (body) => ({
        url: 'generated-page/save-to-webflow',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useGeneratePageMutation,
  useGetPagesQuery,
  useSaveToWebflowMutation,
} = contentGeneratorApi;

import { baseApi } from '../baseApi';
import {
  PageGenerationRequest,
  PageGenerationResponse,
  SaveToAirtableRequest,
} from './types';

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
    saveToAirtable: build.mutation<string, SaveToAirtableRequest>({
      query: (body) => ({
        url: 'generated-page/save-to-airtable',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGeneratePageMutation, useSaveToAirtableMutation } =
  contentGeneratorApi;

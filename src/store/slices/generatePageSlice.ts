import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGeneratedPage {
  name: string;
  mainContent: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  breadcrumb: string;
  heroTitle: string;
  heroContent: string;
}

const generatedPageInitialState: IGeneratedPage = {
  name: '',
  mainContent: '',
  metaTitle: '',
  metaDescription: '',
  slug: '',
  breadcrumb: '',
  heroTitle: '',
  heroContent: '',
};

export const generatedPageSlice = createSlice({
  name: 'generatedPage',
  initialState: generatedPageInitialState,
  reducers: {
    saveGeneratedPage(state, { payload }: PayloadAction<IGeneratedPage>) {
      state.name = 'test';
      state.mainContent = payload.mainContent;
      state.metaTitle = payload.metaTitle;
      state.metaDescription = payload.metaDescription;
      state.slug = payload.slug;
      state.breadcrumb = payload.breadcrumb;
      state.heroTitle = payload.heroTitle;
      state.heroContent = payload.heroContent;
    },
  },
});

export const { saveGeneratedPage } = generatedPageSlice.actions;
export const generatedPageReducer = generatedPageSlice.reducer;

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
  wasPageGenerated?: boolean;
  geo: string;
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
  wasPageGenerated: false,
  geo: '',
};

export const generatedPageSlice = createSlice({
  name: 'generatedPage',
  initialState: generatedPageInitialState,
  reducers: {
    saveGeneratedPage(state, { payload }: PayloadAction<IGeneratedPage>) {
      state.name = payload.name;
      state.mainContent = payload.mainContent;
      state.metaTitle = payload.metaTitle;
      state.metaDescription = payload.metaDescription;
      state.slug = payload.slug;
      state.breadcrumb = payload.breadcrumb;
      state.heroTitle = payload.heroTitle;
      state.heroContent = payload.heroContent;
      state.wasPageGenerated = true;
      state.geo = payload.geo;
    },
    togglePageGeneratedFlag(
      state,
      { payload }: PayloadAction<{ wasPageGenerated: boolean }>
    ) {
      state.wasPageGenerated = payload.wasPageGenerated;
    },
  },
});

export const { saveGeneratedPage, togglePageGeneratedFlag } =
  generatedPageSlice.actions;
export const generatedPageReducer = generatedPageSlice.reducer;

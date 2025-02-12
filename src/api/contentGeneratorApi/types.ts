export interface PageGenerationRequest {
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: number;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  geo: string;
  breadcrumb: string;
  slug: string;
  mainContentPrompts: string[];
  heroSectionTitle: string;
  heroContentPrompts: string[];
}

export interface PageGenerationResponse {
  generatedMainContent: string;
  generatedHeroContent: string;
}

export interface SaveToAirtableRequest {
  name: string;

  mainContent: string;

  metaTitle: string;

  metaDescription: string;

  slug: string;

  breadcrumb: string;

  heroTitle: string;

  heroContent: string;
}

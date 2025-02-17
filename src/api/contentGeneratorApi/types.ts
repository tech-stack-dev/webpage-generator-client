export interface PageGenerationRequest {
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: string;
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

export interface WebpageRecord {
  breadcrumb: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  mainContent: string;
  slug: string;
  Name: string;
  heroContent: string;
  Status?: string;
  Test?: string;
}

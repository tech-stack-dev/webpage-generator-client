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
  name: string;
}

export interface PageGenerationResponse {
  generatedMainContent: string;
  generatedHeroContent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slug: string;
  heroSectionTitle: string;
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

export interface SaveToWebflowRequest {
  name: string;
}

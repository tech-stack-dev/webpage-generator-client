export interface CreateGeneratedPageDto {
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: string;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  geo: string;
  slug: string;
  prompts?: string[];
}

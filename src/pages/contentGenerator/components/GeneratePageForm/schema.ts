import * as yup from 'yup';

export const schema = yup.object({
  serviceType: yup.string().required('Service type is required'),
  basePage: yup.string().required('Base page is required'),
  structurePage: yup.string().required('Structure page is required'),
  minTextSize: yup
    .number()
    .typeError('Minimum text size must be a number')
    .required('Minimum text size is required'),
  keywords: yup.string().required('Keywords are required'),
  metaTitle: yup.string().required('Meta title is required'),
  metaDescription: yup.string().required('Meta description is required'),
  geo: yup.string().required('Geo is required'),
  slug: yup.string().required('Slug is required'),
  breadcrumb: yup.string().required('Breadcrumb is required'),
  heroSectionTitle: yup.string().required('Hero section title is required'),
  contentPrompts: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required('Each content prompt is required'),
      })
    )
    .min(1, 'At least one content prompt is required')
    .required('This is a required field'),
  heroContentPrompts: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required('Each hero prompt is required'),
      })
    )
    .min(1, 'At least one hero content prompt is required')
    .required('This is a required field'),
});

import site from '../../data/site.json';
import type { SEOProps } from './Layout.types';

export const defaultSeoProps: SEOProps = {
  title: site.metaTitle,
  description: site.description,
  keywords: [...site.keywords],
};

export const faviconSizes = [32, 57, 76, 96, 128, 192, 228] as const;

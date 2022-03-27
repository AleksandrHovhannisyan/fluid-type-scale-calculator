import { JsonLd } from 'jsonld/jsonld-spec';
import { SEOProps } from './Layout.types';

export const defaultSeoProps: SEOProps = {
  title: `Fluid Type Scale - Generate responsive font-size variables`,
  description: `Generate font size variables for a fluid type scale with CSS clamp. Grab the output CSS and drop it into any existing design system.`,
  keywords: ['fluid type scale', 'type scale', 'CSS clamp'],
};

export const faviconSizes = [32, 57, 76, 96, 128, 192, 228] as const;

export const structuredData: JsonLd = {
  '@context': 'http://schema.org',
  '@type': 'WebApplication',
  // TODO: create constant for these
  name: '{{ site.title }}',
  url: '{{ site.url }}',
  description: '{{ site.description }}',
  applicationCategory: 'DeveloperApplication',
  genre: 'design',
  browserRequirements: 'Requires JavaScript.',
  softwareVersion: '1.0.0',
  operatingSystem: 'All',
};

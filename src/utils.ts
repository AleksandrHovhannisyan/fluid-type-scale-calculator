import { site } from './data';

/** Prefixes the given relative url string with the base site URL. */
export const toAbsoluteUrl = (url: string) => {
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');
  return `${siteUrl}/${relativeUrl}`;
};

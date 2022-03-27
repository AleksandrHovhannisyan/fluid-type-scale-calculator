import path from 'path';
import { site } from './data';

/** Prefixes the given relative url string with the base site URL. */
export const toAbsoluteUrl = (url: string) => {
  return path.join(site.url, url);
};

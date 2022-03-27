export type SEOProps = {
  /** The page title. Defaults to the site title. */
  title?: string;
  /** The page description. Defaults to the site description. */
  description?: string;
  /** An array of meta keywords. Defaults to the site keywords. */
  keywords?: string[];
};

export type LayoutProps = {
  /** SEO-specific props to change meta tags in the head. */
  seoProps?: SEOProps;
};

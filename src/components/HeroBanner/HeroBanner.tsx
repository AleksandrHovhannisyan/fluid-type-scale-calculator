import styles from './HeroBanner.module.scss';

export type HeroBannerProps = {
  /** The title to render in the hero banner. */
  title: string;
  /** The subtitle to render below the title. */
  subtitle?: string;
};

const HeroBanner = (props: HeroBannerProps) => {
  const { title, subtitle } = props;
  return (
    <header className={styles['hero-banner']}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default HeroBanner;

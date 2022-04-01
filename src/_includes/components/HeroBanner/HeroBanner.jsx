import styles from './HeroBanner.module.scss';

/**
 * @typedef HeroBannerProps
 * @property {string} title The title of the hero banner
 * @property {string} subtitle The subtitle of the hero banner, to be displayed below the title
 */

/**
 * @param {HeroBannerProps} props
 */
const HeroBanner = (props) => {
  const { title, subtitle } = props;
  return (
    <header className={styles['hero-banner']}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
};

export default HeroBanner;

import styles from './styles.module.scss';

const HeroBanner = ({ title, subtitle }) => {
  return (
    <header className={styles['hero-banner']}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
};

export default HeroBanner;

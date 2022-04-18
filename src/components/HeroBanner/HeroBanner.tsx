import { HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './HeroBanner.module.scss';

export type HeroBannerProps = Pick<HTMLProps<HTMLDivElement>, 'className'> & {
  /** The title to render in the hero banner. */
  title: string;
  /** The subtitle to render below the title. */
  subtitle?: string;
};

const HeroBanner = (props: HeroBannerProps) => {
  const { title, subtitle } = props;
  return (
    <header className={clsx(styles['hero-banner'], props.className)}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default HeroBanner;

import { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => (
  <div className={styles.loader}>
    <div className={styles.loader__item}></div>
    <div className={styles.loader__item}></div>
    <div className={styles.loader__item}></div>
  </div>
);

export default Loader;

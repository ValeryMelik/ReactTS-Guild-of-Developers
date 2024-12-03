import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  isHighlighted?: boolean;
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: React.CSSProperties; //
}

const Card: FC<CardProps> = ({
  isHighlighted,
  header,
  body,
  footer,
  className,
  style,
}) => {
  const cardClassNames = classNames(
    styles.card,
    {
      [styles.card_highlighted]: isHighlighted,
    },
    className
  );

  return (
    <div className={cardClassNames} style={style}>
      <h2 className={styles.card__header}>{header}</h2>
      <div className={styles.card__block}>
        <p className={styles.card__body}>{body}</p>
        {footer && <div className={styles.card__footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Card;

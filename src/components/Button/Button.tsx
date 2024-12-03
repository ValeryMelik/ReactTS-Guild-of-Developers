import { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Loader from '../Loader';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: 'primary' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
  loader?: 'points' | 'spinner';
}
const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  kind = 'primary',
  type = 'button',
  loader,
  ...props
}) => {
  const buttonClassNames = classNames(styles.btn, className);

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={buttonClassNames}
      data-kind={kind}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;

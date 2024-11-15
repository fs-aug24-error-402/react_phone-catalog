import styles from './ToggleThemeButton.module.scss';
import { useTheme } from '../../app/hooks';

export const ToggleThemeButton = () => {
  const { isDark, onToggleTheme } = useTheme();

  return (
    <label
      className={styles.toggle}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        type="checkbox"
        checked={isDark ? false : true}
        onChange={onToggleTheme}
        className={styles.toggle__input}
      />
      <div className={styles.toggle__icon} />
    </label>
  );
};

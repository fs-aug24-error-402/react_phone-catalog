import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../components/Button';
import { useTheme } from '../app/hooks';

export const NotFoundPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="absolute bottom-1/2 translate-y-1/2 right-1/2
    translate-x-1/2 flex flex-col justify-center items-center"
    >
      <img
        src="img/page-not-found.png"
        alt="Product not found image"
        className={cn('w-2/3 mb-32', {
          'drop-shadow-[0_0_100px_var(--color-accent-light)]': isDark,
        })}
      />

      <h1 className="mb-16 text-balance text-center text-primary">
        Page not found
      </h1>

      <p className="mb-24 text-pretty text-center text-secondary">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Button onClick={() => navigate(-1)} className="px-48">
        Go Back
      </Button>
    </div>
  );
};

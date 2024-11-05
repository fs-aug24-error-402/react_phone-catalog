import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <p className="text-accent">404</p>

        <h1 className="mt-8 text-balance text-primary">Page not found</h1>

        <p className="mt-16 text-pretty text-secondary">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-32 flex items-center justify-center gap-x-32">
          <Button onClick={() => navigate(-1)} className="px-32">
            Go Back
          </Button>

          <Button onClick={() => navigate('/')} className="px-32">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

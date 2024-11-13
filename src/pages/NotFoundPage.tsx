import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="grid place-items-start justify-center bg-not-found-img
        bg-center bg-no-repeat w-screen h-screen bg-contain bg-yellow-500"
    >
      <div className="text-cente">
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

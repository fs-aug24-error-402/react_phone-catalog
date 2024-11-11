import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 flex flex-col justify-center items-center">
      <img
        src="img/product-not-found.png"
        alt="Product not found image"
        className="w-2/3 mb-32"
      />
      <h1 className="mb-16 text-balance text-center text-primary">
        Product not found
      </h1>

      <p className="mb-24 text-pretty text-center text-secondary">
        Sorry, we couldn’t find the product you’re looking for.
      </p>

      <Button onClick={() => navigate(-1)} className="px-48">
        Go Back
      </Button>
    </div>
  );
};

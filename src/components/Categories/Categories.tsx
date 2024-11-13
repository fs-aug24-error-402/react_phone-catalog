import { useProcessedData } from '../../hooks/useProcessedData';
import { Link } from 'react-router-dom';

import './Categories.scss';

export default function Categories() {
  const { phonesAmount, tabletsAmount, accessoriesAmount } = useProcessedData();

  return (
    <div className="categories-container mobile:flex mobile:flex-col ">
      <div className="categories-title">Shop by category</div>

      <div className="categories-variants">
        <Link className="mobile-link" to={'phones'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="public\img\categories\Phones.png"
              alt="Phones"
            />

            <div className="categories-info">
              <div className="title">Mobile phones</div>

              <div className="subtitle">{phonesAmount} models</div>
            </div>
          </div>
        </Link>

        <Link className="tablets-link" to={'tablets'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="public\img\categories\Tablets.png"
              alt="Tablets"
            />

            <div className="categories-info">
              <div className="title">Tablets</div>

              <div className="subtitle">{tabletsAmount} models</div>
            </div>
          </div>
        </Link>

        <Link className="accessories-link" to={'accessories'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="public\img\categories\Accessories.png"
              alt="Accessories"
            />
            <div className="categories-info">
              <div className="title">Accessories</div>

              <div className="subtitle">{accessoriesAmount} models</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

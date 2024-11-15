import { useProcessedData } from '../../hooks/useProcessedData';
import { Link } from 'react-router-dom';

import './Categories.scss';

export const Categories = () => {
  const { phonesAmount, tabletsAmount, accessoriesAmount } = useProcessedData();

  return (
    <div className="categories-container mobile:flex mobile:flex-col ">
      <h2 className="categories-title">Shop by category</h2>

      <div className="categories-variants">
        <Link className="mobile-link" to={'phones'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="img/categories/Phones.png"
              alt="Phones"
            />

            <div className="categories-info">
              <h4 className="title">Mobile phones</h4>

              <div className="subtitle">{phonesAmount} models</div>
            </div>
          </div>
        </Link>

        <Link className="tablets-link" to={'tablets'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="img/categories/Tablets.png"
              alt="Tablets"
            />

            <div className="categories-info">
              <h4 className="title">Tablets</h4>

              <div className="subtitle">{tabletsAmount} models</div>
            </div>
          </div>
        </Link>

        <Link className="accessories-link" to={'accessories'}>
          <div className="categories-type">
            <img
              className="categories-img"
              src="img/categories/Accessories.png"
              alt="Accessories"
            />
            <div className="categories-info">
              <h4 className="title">Accessories</h4>

              <div className="subtitle">{accessoriesAmount} models</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

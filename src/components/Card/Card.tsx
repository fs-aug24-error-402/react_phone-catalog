import { Product } from '../../types/Product';
import './Card.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
  return (
    <article className="card">
      <a href="#product" className="card__img-link">
        <img
          src={`public/${product.image}`}
          alt={product.name}
          className="card__img"
        />
      </a>

      <h3 className="card__model font-main-font">{product.name}</h3>

      <div className="card__price-container">
        <span className="card__price-current">${product.price}</span>
      </div>

      <div className="card__info-container">
        <div className="card__info-title-container">
          <span className="card__info-title">Screen</span>
          <span className="card__info-title">Capacity</span>
          <span className="card__info-title">RAM</span>
        </div>

        <div className="card__info-param-container">
          <span className="card__info-param">{product.screen}</span>
          <span className="card__info-param">{product.capacity}</span>
          <span className="card__info-param">{product.ram}</span>
        </div>
      </div>

      <div className="card__buttons-container">
        <button className="card__buttons-add">Add to cart</button>
        <button className="card__buttons-favorite">
          <img
            src="public/img/icons/svg/Favourites (Heart Like).svg"
            className="card__buttons-heart-img"
            alt="Add to favorite"
          />
        </button>
      </div>
    </article>
  );
};

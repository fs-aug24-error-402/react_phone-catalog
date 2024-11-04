export const Card: React.FC = () => {
  return (
    <article className="card">
      <a href="#product" className="card__img-link">
        <img
          src="public/img/phones/apple-iphone-14-pro/gold/00.webp"
          alt="Apple iPhone 14 Pro"
          className="card__img"
        />
      </a>

      <h3 className="card__model">Apple iPhone 14 Pro 128GB Gold (MQ083)</h3>

      <div className="card__price-container">
        <span className="card__price-current">$999</span>
        {/* <span className="card__price-old">$999</span> */}
      </div>

      <div className="card__info-container">
        <div className="card__info-title-container">
          <span className="card__info-title">Screen</span>
          <span className="card__info-title">Capacity</span>
          <span className="card__info-title">RAM</span>
        </div>

        <div className="card__info-param-container">
          <span className="card__info-param">6.1” OLED</span>
          <span className="card__info-param">128 GB</span>
          <span className="card__info-param">6 GB</span>
        </div>
      </div>

      <div className="card__buttons-container">
        <button className="card__buttons-add">Add to cart</button>
        <button className="card__buttons-favorite">
          <img
            src="src\images\icons\svg\Favourites (Heart Like).svg"
            className="card__buttons-heart-img"
          />
        </button>
      </div>
    </article>
  );
};

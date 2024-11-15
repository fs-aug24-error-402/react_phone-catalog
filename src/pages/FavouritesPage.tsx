import { useAppSelector } from '../hooks/useAppSelector';
import { Catalog } from '../components/Catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';
import style from '../styles/helpers/container.module.scss';

export const FavouritesPage = () => {
  const { favorites } = useAppSelector(
    state => state.addedProducts.addedProducts,
  );

  return (
    <div className={style.container}>
      <Breadcrumbs className="tablet:mb-40 mobile:mb-24" />

      <h1 className="mb-8">Favorites</h1>

      {favorites.length ? (
        <>
          <div className="mb-40">
            <span className="text-secondary">{favorites.length} models</span>
          </div>

          <Catalog items={favorites} />
        </>
      ) : (
        <img
          src="img/product-not-found.png"
          alt="Cart is empty"
          className="mx-auto h-[40vh]"
        />
      )}
    </div>
  );
};

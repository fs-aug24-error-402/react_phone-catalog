import { Banner } from '../../components/Banner';
import { PhonesSlider } from '../../components/PhonesSlider';
import { Categories } from '../../components/Categories';
import { useProcessedData } from '../../hooks/useProcessedData';

import './HomePage.scss';

export const HomePage = () => {
  const { newModels, hotPricesModels } = useProcessedData();

  const hotPricesTitle = 'Hot Prices';
  const newModelsTitle = 'Brand new models';

  return (
    <div className="home">
      <div className="home__title-container">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      </div>
      <div className="home__content-container ">
        <div className="home__banner-container">
          <Banner />
        </div>

        <div className="home__slider-container">
          <PhonesSlider title={newModelsTitle} data={newModels} />
        </div>

        <div className="home__categories-container">
          <Categories />
        </div>

        <div className="home__slider-container home__last-item">
          <PhonesSlider title={hotPricesTitle} data={hotPricesModels} />
        </div>
      </div>
    </div>
  );
};

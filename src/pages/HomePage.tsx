import Banner from '../components/Banner/Banner';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import Categories from '../components/Categories/Categories';
import { useProcessedData } from '../hooks/useProcessedData';

import './styles/HomePage.scss';

export const HomePage = () => {
  const { newModels, hotPricesModels } = useProcessedData();

  return (
    <div className="home">
      <div className="home__content-container ">
        <div className="home__title-container">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        </div>

        <div className="home__banner-container flex items-center justify-center">
          <Banner />
        </div>

        <div className="home__slider-container">
          <PhonesSlider title={'Brand new models'} data={newModels} />
        </div>

        <div className="home__categories-container">
          <Categories />
        </div>

        <div className="home__slider-container home__last-item">
          <PhonesSlider title={'Hot Prices'} data={hotPricesModels} />
        </div>
      </div>
    </div>
  );
};

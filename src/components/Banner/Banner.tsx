import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.scss';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../app/hooks';

export default function Banner() {
  const { isMobile } = useWindowWidth();

  return (
    <div className="wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={100}
        updateOnWindowResize={true}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper-banner"
      >
        <SwiperSlide>
          <Link
            to="phones/apple-iphone-14-pro-1tb-spaceblack"
            className="slider-container"
          >
            <img
              src={
                isMobile
                  ? 'img/banner/phone/iphone14pro-mobile.png'
                  : 'img/banner/desktop/banner.png'
              }
              className="slide"
              alt="iPhone 14 Pro"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            to="phones/apple-iphone-14-pro-1tb-spaceblack"
            className="slider-container"
          >
            <img
              src={
                isMobile
                  ? 'img/banner/phone/iphone12-mobile.png'
                  : 'img/banner/desktop/iphone15banner-desktop.png'
              }
              className="slide"
              alt="iPhone 15 Pro"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            to="accessories/apple-watch-series-6-40mm-silver"
            className="slider-container"
          >
            <img
              src={
                isMobile
                  ? 'img/banner/phone/watch-6-mobile.png'
                  : 'img/banner/desktop/watch-6-desktop.png'
              }
              className="slide"
              alt="iPhone 12"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

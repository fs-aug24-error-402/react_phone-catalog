import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/pagination';
import './Banner.scss';

import { Autoplay, Pagination } from 'swiper/modules';
import { useWindowWidth } from '../../app/hooks';

export const Banner = () => {
  const { isMobile } = useWindowWidth();
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={1}
      spaceBetween={100}
      updateOnWindowResize={true}
      loop={true}
      speed={1500}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
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

      <div
        className="swiper-button-prev"
        onClick={() => {
          swiperRef.current?.swiper.slidePrev();
        }}
      >
        <FiChevronLeft className="!h-16 !w-16" />
      </div>

      <div
        className="swiper-button-next"
        onClick={() => {
          swiperRef.current?.swiper.slideNext();
        }}
      >
        <FiChevronRight className="!h-16 !w-16" />
      </div>
    </Swiper>
  );
};

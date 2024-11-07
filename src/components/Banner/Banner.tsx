import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.scss';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={100}
      updateOnWindowResize={true}
      simulateTouch={true}
      loop={true}
      speed={800}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <a href="#">
          <img
            src="public/img/iphone14banner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="#">
          <img
            src="public/img/iphone14banner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="#">
          <img
            src="public\img\mobilebanner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </a>
      </SwiperSlide>
    </Swiper>
  );
}

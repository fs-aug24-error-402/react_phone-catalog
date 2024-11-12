import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.scss';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <Swiper
      eventsPrefix="test"
      slidesPerView={1}
      spaceBetween={100}
      updateOnWindowResize={true}
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
      className="swiper-banner"
    >
      <SwiperSlide>
        <Link to="#">
          <img
            src="public\img\banner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="#">
          <img
            src="public\img\banner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="#">
          <img
            src="public\img\banner.png"
            className="slide"
            alt="iPhone 14 Pro"
          />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}

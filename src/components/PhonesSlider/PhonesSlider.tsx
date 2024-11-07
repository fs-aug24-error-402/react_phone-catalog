import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Card } from '../Card';
import { Product } from '../../types/Product';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './PhonesSlider.scss';

const product: Product = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

interface Props {
  title: string;
}

export const PhonesSlider: React.FC<Props> = ({ title }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <div className="container">
        <div className="top-container">
          <div className="title">{title}</div>
          <div className="buttons-container">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="button-prev"
            ></button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="button-next"
            ></button>
          </div>
        </div>
        <Swiper
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <Card product={product} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

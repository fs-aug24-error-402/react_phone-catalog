import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Card } from '../Card';
import { Product } from '../../types/Product';

import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './PhonesSlider.scss';

interface Props {
  title: string;
  data: Product[];
}

export const PhonesSlider: React.FC<Props> = ({ title, data }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="container">
        <div className="top-container">
          <div className="title">{title}</div>
          <div className="buttons-container">
            <button
              onClick={() => {
                swiperRef.current?.slidePrev();
                setCurrentIndex(current => current - 1);
              }}
              className={cn('button-prev', {
                'disabled-left': currentIndex === 0,
                'is-active-left': currentIndex > 0,
              })}
              disabled={currentIndex === 0}
            ></button>
            <button
              onClick={() => {
                swiperRef.current?.slideNext();
                setCurrentIndex(current => current + 1);
              }}
              className={cn('button-next ', {
                'disabled-right': currentIndex === data.length - 3,
                'is-active-right': currentIndex < data.length - 3,
              })}
              disabled={currentIndex === data.length - 3}
            ></button>
          </div>
        </div>
        <Swiper
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView={'auto'}
          spaceBetween={16}
          className="mySwiper"
        >
          {data.map(device => (
            <SwiperSlide key={device.id}>
              <Card product={device} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

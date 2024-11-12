import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Card } from '../Card';
import { Product } from '../../types/Product';

import cn from 'classnames';
import './PhonesSlider.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode } from 'swiper/modules';

interface Props {
  title: string;
  data: Product[];
}

export const PhonesSlider: React.FC<Props> = ({ title, data }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [reachFirst, setReachFirst] = useState(true);
  const [reachLast, setReachLast] = useState(false);

  return (
    <>
      <div className="container">
        <div className="top-container">
          <h2 className="title">{title}</h2>

          <div className="buttons-container">
            <button
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
              className={cn('button-prev', {
                'disabled-left': reachFirst,
                'is-active-left': !reachFirst,
              })}
              disabled={reachFirst}
            ></button>
            <button
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
              className={cn('button-next', {
                'disabled-right': reachLast,
                'is-active-right': !reachLast,
              })}
              disabled={reachLast}
            ></button>
          </div>
        </div>
        <Swiper
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView={'auto'}
          spaceBetween={16}
          freeMode={false}
          onReachBeginning={() => setReachFirst(true)}
          onReachEnd={() => setReachLast(true)}
          onFromEdge={() => {
            setReachLast(false);
            setReachFirst(false);
          }}
          modules={[FreeMode]}
          className="swiper-phones-slider"
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

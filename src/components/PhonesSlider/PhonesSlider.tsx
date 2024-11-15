import React, { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PhonesSlider.scss';

import { Product } from '../../types';
import { ButtonSmall } from '../ButtonSmall';
import { Card } from '../Card';

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
          <h2 className="slider-title">{title}</h2>

          <div className="buttons-container">
            <ButtonSmall
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
              className={cn('button-prev', {
                'text-icons': reachFirst,
                'text-primary': !reachFirst,
              })}
              disabled={reachFirst}
            >
              <FiChevronLeft className="h-16 w-16" />
            </ButtonSmall>

            <ButtonSmall
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
              className={cn('button-next', {
                'text-icons': reachLast,
                'text-primary': !reachLast,
              })}
              disabled={reachLast}
            >
              <FiChevronRight className="h-16 w-16" />
            </ButtonSmall>
          </div>
        </div>

        <Swiper
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView={'auto'}
          spaceBetween={16}
          speed={1100}
          freeMode={false}
          onInit={() => {
            setReachFirst(true);
            setReachLast(false);
          }}
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

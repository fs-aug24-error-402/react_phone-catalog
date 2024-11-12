import { FC, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/thumbs';
import './ProductImageSlider.scss';

interface Props {
  images: string[];
}

export const ProductImageSlider: FC<Props> = ({ images }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Thumbs],
        speed: 500,
        thumbs: {
          swiper: thumbsRef.current
            ? new Swiper(thumbsRef.current, {
                slidesPerView: images.length,
                freeMode: true,
                watchSlidesProgress: true,
                spaceBetween: 8,
                direction: 'horizontal',
                breakpoints: {
                  640: {
                    direction: 'vertical',
                    spaceBetween: 8,
                  },
                  1200: {
                    direction: 'vertical',
                    spaceBetween: 16,
                  },
                },
              })
            : null,
        },
      });

      return () => {
        swiper.destroy();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gallery">
      <div className="swiper main" ref={swiperRef}>
        <div className="swiper-wrapper">
          {images.map((img, index) => (
            <div key={index} className="swiper-slide">
              <img src={img} alt={`Slide ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="swiper thumbs" ref={thumbsRef}>
        <div className="swiper-wrapper">
          {images.map((img, index) => (
            <div key={index} className="swiper-slide">
              <img src={img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

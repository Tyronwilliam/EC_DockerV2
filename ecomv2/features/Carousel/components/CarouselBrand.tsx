import React, { useEffect } from "react";
import { register } from "swiper/element/bundle";
type Props = {
  title: string;
  content: React.ReactElement[];
};
register();

function CarouselBrand({ title, content }: Props) {
  useEffect(() => {
    const swiperEl = document.querySelectorAll("swiper-container")! as any;
    const swiperParams = {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl[0], swiperParams);
    Object.assign(swiperEl[1], swiperParams);

    // and now initialize it
    swiperEl[0].initialize();
    swiperEl[1].initialize();
  }, [content]);

  return (
    <div className="container_carousel_brand">
      <h2>{title}</h2>
      <swiper-container speed="500" loop="true" autoplay init="false">
        {content?.map((item, index) => {
          return (
            <swiper-slide
              key={index}
              className="SwiperSlide"
              data-swiper-autoplay="2000"
            >
              {item}
            </swiper-slide>
          );
        })}
      </swiper-container>
    </div>
  );
}

export default CarouselBrand;

/*import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllSteakes } from "../../api/steakrequest";
import 'swiper/swiper.min.css';

const Slider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllSteakes().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        style={{
          height: '90vh',
        }}
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item._id}>
              <img
                style={{
                  width: "100%",
                  height: " 100%",
                  objectFit: "cover",
                  position:"relative"
                }}
                src={item.url}
                alt={item.title}
              />
              <div className="title" style={{position:"absolute",marginLeft:"40%",fontSize:"60px",color:"white",top:"40%"}}>{item.title}</div>
            </SwiperSlide>
          ))}
      </Swiper>

      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            position: absolute;
            top: 50%;
            width: 27px;
            height: 44px;
            margin-top: -22px;
            z-index: 10;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            font-weight: 300;
            border-radius: 0;
            background: transparent;
            transition: all 0.3s ease;
          }

          .swiper-button-next.swiper-button-disabled,
          .swiper-button-prev.swiper-button-disabled {
            opacity: 0.35;
            cursor: auto;
            pointer-events: none;
          }

          .swiper-button-next:focus,
          .swiper-button-prev:focus {
            outline: none;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-family: swiper-icons;
            font-size: 44px;
            text-transform: none !important;
            letter-spacing: 0;
            text-align: center;
            text-rendering: auto;
            line-height: 1;
          }

          .swiper-button-next:after {
            content: '\\e079';
          }

          .swiper-button-prev:after {
            content: '\\e078';
          }

          .swiper-button-next.swiper-button-white,
          .swiper-button-prev.swiper-button-white {
            color: black;
          }

          .swiper-button-next.swiper-button-black,
          .swiper-button-prev.swiper-button-black {
            color: #000;
          }

          .swiper-button-next.swiper-button-black .swiper-button-disabled,
          .swiper-button-prev.swiper-button-black .swiper-button-disabled {
            color: rgba(0, 0, 0, 0.35);
          }

          .swiper-button-next.swiper-button-white .swiper-button-disabled,
          .swiper-button-prev.swiper-button-white .swiper-button-disabled {
            color: rgba(255, 255, 255, 0.35);
          }

          .swiper-pagination {
            position: absolute;
            text-align: center;
            transition: 300ms opacity;
            transform: translate3d(0, 0, 0);
            z-index: 10;
          }

          .swiper-container-horizontal > .swiper-pagination-bullets,
          .swiper-pagination-custom,
          .swiper-pagination-fraction {
            bottom: 10px;
            left: 0;
            width: 100%;
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            display: inline-block;
            border-radius: 100%;
            background: #000;
            opacity: 0.2;
            margin: 0 3px;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #007aff;
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
*/
import React from 'react'

const index = () => {
  return (
    <div>
      
    </div>
  )
}

export default index


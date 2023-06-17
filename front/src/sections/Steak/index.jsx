import React, { useEffect, useState } from "react";
import "../../../src/index.css";
import {  getAllSteakes} from "../../api/steakrequest";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
const Index = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllSteakes().then((res) => {
      setData(res);
    });
  }, []);
  return (
   <>
         <Swiper
            className="mySwiper"
            autoplay={{
              delay: 1000,
            }}
            navigation={true}
            modules={[Autoplay]}
          >
            {data &&
              data.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <div className="slide-content">
                <img
                  className="slide-image"
                  src={item.url}
                  alt={item.title}
                />
                <div className="slide-title">{item.title}</div>
              </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
   </>
  )
}

export default Index


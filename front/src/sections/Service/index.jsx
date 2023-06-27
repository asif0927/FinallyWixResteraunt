import React, { useEffect, useState } from "react";
import "../../../src/index.css";
import style from "./index.module.css";
import { getAllService } from "../../api/servicerequest";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Grid, Typography } from "@mui/material";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllService().then((res) => {
      setData(res);
    });
  }, []);

  const generateSlides = (items) => {
    const slides = [];
    let tempItems = [...items];

    while (tempItems.length > 0) {
      const chunk = tempItems.splice(0, 3);
      slides.push(chunk);
    }

    return slides;
  };

  const formatServiceNumber = (number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number.toString();
    }
  };

  const slidesData = generateSlides(data);

  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 1000,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className={style.swiper}>
            <div className={style.content}>
              <div className="slide-image-container">
                <img
                  className="slide-image"
                  src="https://static.wixstatic.com/media/9fdacc_dfbd0f51a10d4928b740debaa4b790ad.jpg/v1/fill/w_1461,h_701,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9fdacc_dfbd0f51a10d4928b740debaa4b790ad.jpg"
                  alt={slide[0].title}
                />
                <div className={style.texts}>
                  <h2 className={style.header}>THE RESTAURANT</h2>
                  <Grid container spacing={2}>
                    {slide.map((item, itemIndex) => (
                      <Grid item sm={12} md={12} lg={4} key={item._id}>
                        <Typography variant="h2"  style={{marginBottom:"15px"}}> {formatServiceNumber(index * 3 + itemIndex + 1)}{" "}</Typography>
                        <Typography variant="body"  style={{marginBottom:"15px"}}>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" style={{marginTop:"15px"}}>{item.desc}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Index;  
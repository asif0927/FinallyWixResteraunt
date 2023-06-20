import React, { useEffect, useState } from 'react';
import style from './index.module.css';
import { Grid, Typography } from '@mui/material';
import { getAllGallerys } from '../../api/galleryrequest';

const Index = () => {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    fetchGallerys();
  }, []);

  const fetchGallerys = async () => {
    try {
      const gallerysData = await getAllGallerys();
      setGallerys(gallerysData);
    } catch (error) {
      console.error('Failed to retrieve gallerys:', error);
    }
  };

  return (
    <>
      <section className={style.section}>
        <Typography variant="h2" component="h2" gutterBottom className={style.head}>
          Gallery
        </Typography>
        <Grid container spacing={2}>
          {gallerys.map((gallery) => (
            <Grid item xs={6} sm={6} md={3} lg={3} key={gallery.id} className={style.grid}>
              <div className={style.imageContainer}>
              <img src={gallery.img} alt="Gallery Image" className={style.image} />
                <Typography
                  variant="body1"
                  component="div"
                  align="center"
                  className={`${style.hashtags} ${style.hideHashtags}`}
                >
                  {gallery.hastags}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
};

export default Index;

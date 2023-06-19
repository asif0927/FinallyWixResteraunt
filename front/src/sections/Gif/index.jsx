import React, { useEffect, useState } from 'react';
import style from "./index.module.css";
import { getAllGifs } from "../../api/gifrequest";
const Index = () => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const gifsData = await getAllGifs();
        setGifs(gifsData);
      } catch (error) {
        console.error('Failed to retrieve addresses:', error);
      }
    };

    fetchGifs();
  }, []);
  return (
    <>
     <section className={style.section} style={{
    backgroundImage: `url(${gifs.length > 0 ? gifs[0].giffile : ''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  }}>
    <div className={style.flex}>
        <p className={style.paragraph}>JOIN OUR MAILING LIST</p>
        <form >
        <input type="email" name="email"  placeholder="Enter your email here*" required className={style.input}></input>
        <button type='submit' className={style.button}>Subscribe Now</button>
        </form>
    </div>
  </section>
    </>
  )
}

export default Index

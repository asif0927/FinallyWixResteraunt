import React, { useEffect, useState } from 'react';
import style from './index.module.css';
import { getAllGifs } from '../../api/gifrequest';
import { subscribeEmail } from '../../api/subscriberrequest';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [gifs, setGifs] = useState([]);
  const [email, setEmail] = useState('');

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

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      await subscribeEmail(email);
      toast.success('Subscription successful');
      setEmail('');
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast.error('Failed to subscribe');
    }
  };

  return (
    <>
      <section
        className={style.section}
        style={{
          backgroundImage: `url(${gifs.length > 0 ? gifs[0].giffile : ''})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className={style.flex}>
          <p className={style.paragraph}>JOIN OUR MAILING LIST</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email here*"
              required
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className={style.button}>Subscribe Now</button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Index;

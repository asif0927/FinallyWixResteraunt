import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Button } from '@mui/material';
import { createReservation } from '../../../api/reservationrequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './index.module.css';

const Index = () => {
  const [partySize, setPartySize] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      partySize,
      date: reservationDate,
      time: reservationTime,
      email,
    };

    try {
      await createReservation(reservationData);
      toast.success('Reservation request sent.');
      setPartySize('');
      setReservationDate('');
      setReservationTime('');
      setEmail('');
    } catch (error) {
      console.error('Failed to send reservation request:', error.message);
      toast.error('Failed to send reservation request.');
    }
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Reservations</title>
        </Helmet>
      </div>
      <div style={{ marginTop: '50px' }}>
        <section className={style.section}>
          <div className={style.container}>
            <h2 className={style.title1}>Make a reservation</h2>
            <h6 className={style.title2}>
              To help us find the best table for you, select the preferred party size, date, and time of your reservation.
            </h6>
            <Grid container justifyContent="center" style={{ marginTop: '50px' }} className={style.grid}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className={style.formGroup}>
                        <label htmlFor="party-size-select" className={style.label}>
                          Party Size
                        </label>
                        <select
                          id="party-size-select"
                          value={partySize}
                          onChange={(e) => setPartySize(e.target.value)}
                          className={style.select}
                        >
                          {[...Array(10)].map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className={style.formGroup}>
                        <label htmlFor="reservation-date" className={style.label}>
                          Date
                        </label>
                        <input
                          id="reservation-date"
                          type="date"
                          value={reservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                          className={style.input}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className={style.formGroup}>
                        <label htmlFor="reservation-time-select" className={style.label}>
                          Time
                        </label>
                        <select
                          id="reservation-time-select"
                          value={reservationTime}
                          onChange={(e) => setReservationTime(e.target.value)}
                          className={style.select}
                        >
                          {[...Array(26)].map((_, index) => {
                            const minutes = index * 15 + 375;
                            const hours = Math.floor(minutes / 60);
                            const formattedTime = `${hours.toString().padStart(2)}:${(minutes % 60)
                              .toString()
                              .padStart(2, '0')}`;
                            return (
                              <option key={index} value={formattedTime}>
                                {formattedTime} PM
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className={style.formGroup}>
                        <label htmlFor="email" className={style.label}>
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={style.input}
                          placeholder="email"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className={style.formGroup}>
                        <Button variant="contained" color="primary" fullWidth type="submit" className={style.button}>
                          Reserve Now
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <hr className={style.hr} />
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;  
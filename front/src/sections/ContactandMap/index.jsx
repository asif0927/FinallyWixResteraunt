import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllAddresses } from '../../api/adressrequest';
import { getAllWorkTimes } from '../../api/worktimerequest';
import style from './index.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';




const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [worktimes, setWorkTimes] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressesData = await getAllAddresses();
        setAddresses(addressesData);
      } catch (error) {
        console.error('Failed to retrieve addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchWorkTimes = async () => {
      try {
        const timesData = await getAllWorkTimes();
        setWorkTimes(timesData);
      } catch (error) {
        console.error('Failed to retrieve work times:', error);
      }
    };

    fetchWorkTimes();
  }, []);


  const sendEmail = async (name, email, phone, message) => {
    try {
      const response = await axios.post('http://localhost:5454/api/send-email', {
        name: name,
        email: email,
        phone: phone,
        message: message
      });
  
      if (response.status === 200) {
        toast.success('email sent');
        console.log('E-posta gönderildi!');

      } else {
        console.error('E-posta gönderilemedi.');
        toast.error('email not sent');
      }
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      toast.error('email not sent');
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail(name, email, phone, message);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    console.log(sendEmail);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section className={style.section}>
        <h2 className={style.title}>
          CONTACT &amp;
          <br />
          LOCATION
        </h2>
        <p className={style.paragraph}>TELL US WHAT YOU THINK AND HOW WE'RE DOING</p>
        <div className={style.container}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                      className={style.input}
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Name"
                      required
                      onChange={handleNameChange}
                    />
                    <input
                      className={style.input}
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      required
                      onChange={handleEmailChange}
                    />
                    <input
                      className={style.input}
                      type="text"
                      name="phone"
                      value={phone}
                      placeholder="Phone"
                      required
                      onChange={handlePhoneChange}
                    />
                  </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <textarea
                      placeholder="Type your message here..."
                      className={style.textarea}
                      value={message}
                      required
                      onChange={handleMessageChange}
                    ></textarea>
                    <button className={style.button} type="submit">
                      <span className={style.span}>Submit</span>
                    </button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </form>
          {addresses.map((address) => (
            <h4
              key={address.id}
              style={{ textAlign: 'center', fontSize: '14px', color: 'rgb(174, 154, 100)', padding: '30px 0' }}
            >
              {address.street}
              {address.city}, {address.state} {address.zipCode}. Tel &nbsp;{address.telephone}
            </h4>
          ))}
          {worktimes.map((time) => (
            <h4
              key={time._id}
              style={{ textAlign: 'center', fontSize: '14px', color: 'rgb(174, 154, 100)' }}
            >
              MONDAY TO FRIDAY {time.starttime}-{time.finishtime}/Saturday to Sunday {time.weekendstarttime}-{time.weekendfinishtime}
            </h4>
          ))}
          <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '30px' }}>
            {addresses.map((address) => (
              <iframe key={address.id} src={address.iframeSrc}></iframe>
            ))}
          </div>
          <div className={style.goToTop} onClick={handleGoToTop}>
            <div className={style.icon}><i className="fa-solid fa-chevron-up"></i></div>
            <p className={style.icontitle}>Go to Top</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;  
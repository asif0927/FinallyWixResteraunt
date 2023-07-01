import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';
import emailjs from 'emailjs-com';
import { API_BASE_URL } from '../../../api/baseurl';
import { editReservation } from '../../../api/reservationrequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservation`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Reservation error', error.message);
    }
  };

  const sendEmail = async (email, status) => {
    try {
      await emailjs.send(
        'service_bdjzy8g',
        'template_sslxobc',
        {
          from: 'haqverdizadeasif177@gmail.com',
          to: email,
          from_name: 'Admin',
          from_email: 'haqverdizadeasif177@gmail.com',
          reply_to: 'haqverdizadeasif177@gmail.com',
          subject: status === 'accepted' ? 'Reservation Accepted' : 'Reservation Rejected',
        },
        '8ORQPdyfOfVQRCtC6'
      );
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending error:', error);
    }
  };

  const handleAccept = async (reservationId) => {
    try {
      const updatedReservations = reservations.map((res) => {
        if (res._id === reservationId) {
          const email = res.email;
          sendEmail(email, 'accepted');
          toast.success('Reservation accepted');
          editReservation(reservationId, { status: 'accepted' });
          return { ...res, status: 'accepted' };
        }
        return res;
      });
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Reservation accept error', error.message);
    }
  };
  
  const handleReject = async (reservationId) => {
    try {
      const updatedReservations = reservations.map((res) => {
        if (res._id === reservationId) {
          const email = res.email;
          sendEmail(email, 'rejected');
          toast.error('Reservation rejected');
          editReservation(reservationId, { status: 'rejected' });
          return { ...res, status: 'rejected' };
        }
        return res;
      });
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Reservation reject error', error.message);
    }
  };
  

  const columns = [
    {
      title: 'Party Size',
      dataIndex: 'partySize',
      key: 'partySize',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('ll'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleAccept(record._id)}
            disabled={record.status === 'accepted' || record.status === 'rejected'}
          >
            Accept
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: '20px' }}
            onClick={() => handleReject(record._id)}
            disabled={record.status === 'accepted' || record.status === 'rejected'}
          >
            Reject
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={reservations} style={{ marginLeft: '35%', width: '50%' }} />
      <ToastContainer />
    </>
  );
};

export default Index;

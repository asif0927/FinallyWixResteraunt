import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { API_BASE_URL } from '../../../api/baseurl';

const Index = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reservation`);
      setReservations(response.data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error.message);
    }
  };

  const handleAccept = async (reservationId) => {
    try {
      await axios.put(`${API_BASE_URL}/reservation/${reservationId}/accept`);
      fetchReservations(); 
    } catch (error) {
      console.error('Failed to accept reservation:', error.message);
    }
  };

  const handleReject = async (reservationId) => {
    try {
      await axios.put(`${API_BASE_URL}/reservation/${reservationId}/reject`);
      fetchReservations(); 
    } catch (error) {
      console.error('Failed to reject reservation:', error.message);
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleAccept(record._id)}>
            Accept
          </Button>
          <Button type="primary" danger style={{marginLeft:"20px"}} onClick={() => handleReject(record._id)}>
            Reject
          </Button>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={reservations} style={{ marginLeft: '35%', width: '50%' }} />;
};

export default Index;

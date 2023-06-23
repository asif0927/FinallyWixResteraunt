import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { getAllSubscribers } from '../../../api/subscriberrequest';

const Index = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const subscribersData = await getAllSubscribers();
      setSubscribers(subscribersData);
    };

    fetchSubscribers();
  }, []);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subscribed At',
      dataIndex: 'subscribedAt',
      key: 'subscribedAt',
      render: (subscribedAt) => moment(subscribedAt).format('LLL'),
    },
  ];

  return <Table dataSource={subscribers} columns={columns} style={{ marginLeft: '30%', width: '40%' }} />;
};

export default Index;

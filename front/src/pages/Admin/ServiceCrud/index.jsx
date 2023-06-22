import React, { useEffect, useState } from 'react';
import { getAllService, editServiceByID, deleteServices, postService } from '../../../api/servicerequest';
import { Table, Button, Modal, Form, Input, Space, Spin } from 'antd';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const { TextArea } = Input;


const ServiceCRUD = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [services]);

  const fetchServices = async () => {
    try {
      const servicesData = await getAllService();
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to retrieve services:', error);
    }
  };

  const handleOpenModal = (service) => {
    setEditingService(service);
    setModalOpen(true);
  
    const initialValues = {
      title: service?.title || '', 
      desc: service?.desc || '', 
    };
  
    form.setFieldsValue(initialValues);
  };
  

  const handleCloseModal = () => {
    setEditingService(null);
    setModalOpen(false);
    form.resetFields();
  };
  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      if (editingService) {
        const updatedData = {
          title: values.title,
          desc: values.desc,
        };
  
        await editServiceByID(editingService._id, updatedData);
  
        const updatedServices = services.map((service) => {
          if (service._id === editingService._id) {
            return {
              ...service,
              ...updatedData,
            };
          }
          return service;
        });
  
        setServices(updatedServices);
      } else {
        const newService = {
          title: values.title,
          desc: values.desc,
        };
  
        setLoading(true);
  
        const createdService = await postService(newService);
        setServices((prevServices) => [...prevServices, createdService]);
  
        setLoading(false);
      }
  
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };
  

  const handleDeleteService = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (isConfirmed) {
        await deleteServices(id);
        setServices((prevServices) => prevServices.filter((service) => service?._id !== id));
        Swal.fire('Deleted!', 'The service has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };
  
  

  
  
  

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOpenModal(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Button
        type="primary"
        danger
        onClick={() => handleDeleteService(record?._id)}
      >
        Delete
      </Button>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: '220px' }}>
      <div style={{ marginBottom: '16px' }}>
      <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginLeft: "50%", marginTop: "5%" }} >
      Add
    </Button>
      </div>
      <div style={{ width: '60%', margin: '30px auto' }}>
        <Table columns={columns} dataSource={services} />

        <Modal
          visible={modalOpen}
          title={editingService ? 'Edit Service' : 'Add New Service'}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="desc"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
        
        {loading && <Spin size="large" />}
      </div>
    </div>
  );
};

export default ServiceCRUD;

import React, { useEffect, useState } from 'react';
import { getAllSocials, editSocialsByID, deleteSocials, postSocials } from '../../../api/socialrequest';
import { Table, Button, Modal, Form, Input } from 'antd';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const { TextArea } = Input;

const SocialSchema = Yup.object().shape({
  iconurl: Yup.string().required('Icon URL is required'),
  socialmediaurl: Yup.string().required('Social Media URL is required'),
});

const SocialCRUD = () => {
  const [socials, setSocials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSocials();
  }, [socials]);

  const fetchSocials = async () => {
    try {
      const socialsData = await getAllSocials();
      setSocials(socialsData);
    } catch (error) {
      console.error('Failed to retrieve social media entries:', error);
    }
  };

  const handleOpenModal = (social) => {
    setEditingSocial(social);
    setModalOpen(true);
    form.setFieldsValue({
      iconurl: social?.iconurl || '',
      socialmediaurl: social?.socialmediaurl || '',
    });
  };

  const handleCloseModal = () => {
    setEditingSocial(null);
    setModalOpen(false);
    form.resetFields();
  };

const handleDeleteSocial = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this social media entry!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    dangerMode: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteSocials(id);
        setSocials(socials.filter((social) => social._id !== id));
        Swal.fire('Deleted!', 'The social media entry has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete social media entry:', error);
      }
    }
  });
};


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      if (editingSocial) {
        const updatedData = {
          iconurl: values.iconurl,
          socialmediaurl: values.socialmediaurl,
        };

        await editSocialsByID(editingSocial._id, updatedData);

        const updatedSocials = socials.map((social) => {
          if (social._id === editingSocial._id) {
            return {
              ...social,
              ...updatedData,
            };
          }
          return social;
        });

        setSocials(updatedSocials);
      } else {
      
        const newSocial = {
          iconurl: values.iconurl,
          socialmediaurl: values.socialmediaurl,
        };
  
        await postSocials(newSocial); 
  

  
        handleCloseModal();
      }
      await fetchSocials(); 
    } catch (error) {
      console.error('Failed to save social media entry:', error);
    }
  };
  

  const columns = [
    {
      title: 'Icon URL',
      dataIndex: 'iconurl',
      key: 'iconurl',
    },
    {
      title: 'Social Media URL',
      dataIndex: 'socialmediaurl',
      key: 'socialmediaurl',
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
        <Button type="primary" danger onClick={() => handleDeleteSocial(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: '220px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginLeft: '50%', marginTop: '5%' }}>
          Add
        </Button>
      </div>
      <div style={{ width: '60%', margin: '30px auto' }}>
        <Table columns={columns} dataSource={socials} />

        <Modal
          open={modalOpen}
          title={editingSocial ? 'Edit Social Media Entry' : 'Add New Social Media Entry'}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Icon URL"
              name="iconurl"
              rules={[{ required: true, message: 'Please enter the icon URL' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Social Media URL"
              name="socialmediaurl"
              rules={[{ required: true, message: 'Please enter the social media URL' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SocialCRUD;

import React, { useEffect, useState } from 'react';
import { getAllGallerys, editGalleryByID, deleteGallery, postGalerrys } from '../../../api/galleryrequest';
import { Table, Button, Modal, Form, Input, Space, Spin, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';

const { TextArea } = Input;

const GalleryCRUD = () => {
  const [gallerys, setGallerys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hastags, setHastags] = useState("");

  useEffect(() => {
    fetchGallerys();
  }, [gallerys]);

  const fetchGallerys = async () => {
    try {
      const gallerysData = await getAllGallerys();
      setGallerys(gallerysData);
    } catch (error) {
      console.error('Failed to retrieve gallerys:', error);
    }
  };

  const handleOpenModal = (gallery) => {
    setEditingGallery(gallery);
    setModalOpen(true);
  
    const initialValues = {
      img: gallery?.img || '',
      hastags: gallery?.hastags || '',
    };
  
    form.setFieldsValue(initialValues);
  };
  

  const handleCloseModal = () => {
    setEditingGallery(null);
    setModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingGallery) {
        const updatedData = {
          img: values.img,
          hastags: values.hastags,
        };

        await editGalleryByID(editingGallery._id, updatedData);

        const updatedGallerys = gallerys.map((gallery) => {
          if (gallery._id === editingGallery._id) {
            return {
              ...gallery,
              ...updatedData,
            };
          }
          return gallery;
        });

        setGallerys(updatedGallerys);
      } else {
        const newGallery = {
          img: values.img,
          hastags: values.hastags,
        };

        setLoading(true);

        const createdGallery = await postGalerrys(newGallery);
        setGallerys((prevGallerys) => [...prevGallerys, createdGallery]);

        setLoading(false);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Failed to save gallery:', error);
    }
  };

  const handleDeleteGallery = async (id) => {
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
        await deleteGallery(id);
        setGallerys((prevGallerys) => prevGallerys.filter((gallery) => gallery?._id !== id));
        Swal.fire('Deleted!', 'The gallery has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete gallery:', error);
    }
  };

  const handleFormSubmit = () => {
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("hastags", form.getFieldValue("hastags"));
    formData.append("upload_preset", "siar9lxz");
  
    axios
      .post("https://api.cloudinary.com/v1_1/du9areque/image/upload", formData)
      .then((response) => {
        const newImage = {
          hastags: form.getFieldValue("hastags"),
          img: response.data.secure_url,
        };
  
        if (editingGallery) {
          const updatedData = {
            img: response.data.secure_url,
            hastags: form.getFieldValue("hastags"),
          };
  
          editGalleryByID(editingGallery._id, updatedData);
  
          const updatedGallerys = gallerys.map((gallery) => {
            if (gallery._id === editingGallery._id) {
              return {
                ...gallery,
                ...updatedData,
              };
            }
            return gallery;
          });
  
          setGallerys(updatedGallerys);
        } else {
          postGalerrys(newImage)
            .then((createdGallery) => {
              setGallerys((prevGallerys) => [...prevGallerys, createdGallery]);
              message.success("Image sent successfully");
            })
            .catch((error) => {
              console.error('Failed to create gallery:', error);
            });
        }
  
        setHastags("");
        setSelectedImage(null);
        setLoading(false);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Failed to upload image:', error);
        setLoading(false);
      });
  };
  

  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img) => <img src={img} alt="Gallery Image" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: 'Hashtags',
      dataIndex: 'hastags',
      key: 'hastags',
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
          onClick={() => handleDeleteGallery(record?._id)}
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
        <Table columns={columns} dataSource={gallerys} />

        <Modal
          open={modalOpen}
          title={editingGallery ? 'Edit Gallery' : 'Add New Gallery'}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
        >

          {modalOpen && (
            <Form form={form} onFinish={handleFormSubmit}>
              <Form.Item name="hastags" initialValue={hastags} rules={[{ required: true, message: 'Please enter hashtags' }]}>
                <Input placeholder="Hashtags write" style={{ marginBottom: "16px" }} />
              </Form.Item>
              <Form.Item>
                <Upload beforeUpload={(file) => {
                  setSelectedImage(file);
                  return false;
                }}>
                  <Button icon={<UploadOutlined />}>Image Download</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>

        {loading && <Spin size="large" />}
      </div>
    </div>
  );
};

export default GalleryCRUD;

import React, { useEffect, useState } from 'react';
import { getAllSteakes, editSteakesByID, deleteSteakes, postSteakes } from '../../../api/steakrequest';
import { Table, Button, Modal, Form, Input, Space, Spin, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';

const { TextArea } = Input;

const SliderCRUD = () => {
  const [sliders, setSliders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchSliders();
  }, [sliders]);

  const fetchSliders = async () => {
    try {
      const slidersData = await getAllSteakes();
      setSliders(slidersData);
    } catch (error) {
      console.error('Failed to retrieve sliders:', error);
    }
  };

  const handleOpenModal = (slider) => {
    setEditingSlider(slider);
    setModalOpen(true);
  
    const initialValues = {
      url: slider?.url || '',
      title: slider?.title || '',
    };
  
    form.setFieldsValue(initialValues);
  };
  

  const handleCloseModal = () => {
    setEditingSlider(null);
    setModalOpen(false);
    form.resetFields();
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      if (editingSlider) {
        const updatedData = {
          url: values.url,
          title: values.title,
        };
  
        await editSteakesByID(editingSlider._id, updatedData);
  
        const updatedSliders = sliders.map((slider) => {
          if (slider._id === editingSlider._id) {
            return {
              ...slider,
              ...updatedData,
            };
          }
          return slider;
        });
  
        setSliders(updatedSliders);
      } else {
        const newSlider = {
          url: values.url,
          title: values.title,
        };
  
        setLoading(true);
  
        const createdSlider = await postSteakes(newSlider);
        setSliders((prevSliders) => [...prevSliders, createdSlider]);
  
        setLoading(false);
      }
  
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save slider:', error);
    }
  };
  
  
  

  const handleDeleteSlider = async (id) => {
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
        await deleteSteakes(id);
        setSliders((prevSliders) => prevSliders.filter((slider) => slider?._id !== id));
        Swal.fire('Deleted!', 'The slider has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete slider:', error);
    }
  };

  const handleFormSubmit = () => {
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("title", form.getFieldValue("title"));
    formData.append("upload_preset", "siar9lxz");
  
    axios
      .post("https://api.cloudinary.com/v1_1/du9areque/image/upload", formData)
      .then((response) => {
        const newImage = {
          title: form.getFieldValue("title"),
          url: response.data.secure_url,
        };
  
        if (editingSlider) {
          const updatedData = {
           url: response.data.secure_url,
            title: form.getFieldValue("title"),
          };
  
          editSteakesByID(editingSlider._id, updatedData);
  
          const updatedSliders = sliders.map((slider) => {
            if (slider._id === editingSlider._id) {
              return {
                ...slider,
                ...updatedData,
              };
            }
            return slider;
          });
  
          setSliders(updatedSliders);
        } else {
          postSteakes(newImage)
            .then((createdSlider) => {
              setSliders((prevSliders) => [...prevSliders, createdSlider]);
              message.success("Slider added successfully");
            })
            .catch((error) => {
              console.error('Failed to create slider:', error);
            });
        }
  
        setTitle("");
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
      dataIndex: 'url',
      key: 'url',
      render: (url) => <img src={url} alt="Slider Image" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
          onClick={() => handleDeleteSlider(record?._id)}
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
        <Table columns={columns} dataSource={sliders} />

        <Modal
          open={modalOpen}
          title={editingSlider ? 'Edit Slider' : 'Add New Slider'}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
        >

          {modalOpen && (
            <Form form={form} onFinish={handleFormSubmit}>
              <Form.Item name="title" initialValue={title} rules={[{ required: true, message: 'Please enter title' }]}>
                <Input placeholder="Title" style={{ marginBottom: "16px" }} />
              </Form.Item>
              <Form.Item>
                <Upload beforeUpload={(file) => {
                  setSelectedImage(file);
                  return false;
                }}>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Slider"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!selectedImage}
                  style={{ marginTop: "16px" }}
                  loading={loading}
                >
                  {editingSlider ? 'Save Changes' : 'Add Slider'}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default SliderCRUD;

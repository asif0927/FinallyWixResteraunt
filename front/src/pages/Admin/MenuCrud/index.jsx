import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { Table, Button, Modal, Form, Input, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getFoods, addFood, updateFood, deleteFood } from '../../../api/foodrequest';
import { getCategories } from "../../../api/categoryrequest"
import axios from 'axios';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

const MenuCRUD = () => {
  const [foods, setFoods] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
    } catch (error) {
      console.error('Failed to retrieve foods:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to retrieve categories:', error);
    }
  };

  const handleOpenModal = (food) => {
    setEditingFood(food);
    setModalVisible(true);

    const initialValues = {
      name: food?.name || '',
      description: food?.description || '',
      price: food?.price || '',
      img: food?.img || '',
      category: food?.category || '',
    };

    form.setFieldsValue(initialValues);
  };

  const handleCloseModal = () => {
    setEditingFood(null);
    setModalVisible(false);
    form.resetFields();
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'siar9lxz');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/du9areque/image/upload', formData);
      const imageUrl = response.data.secure_url;
      setSelectedImage(imageUrl);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const foodData = {
        name: values.name,
        description: values.description,
        price: values.price,
        img: selectedImage,
        category: values.category,
      };

      if (editingFood) {
        await updateFood(editingFood._id, foodData);
        const updatedFoods = foods.map((food) => {
          if (food._id === editingFood._id) {
            return {
              ...food,
              ...foodData,
            };
          }
          return food;
        });
        setFoods(updatedFoods);
      } else {
        setLoading(true);
        const response = await addFood(foodData);
        const createdFood = response.data;
        setFoods((prevFoods) => [...prevFoods, createdFood]);
        setLoading(false);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Failed to save food:', error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this food item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        await deleteFood(id);
        const updatedFoods = foods.filter((food) => food._id !== id);
        setFoods(updatedFoods);
        message.success('Food deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete food:', error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img) => <img src={img} alt="Food Image" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleOpenModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteFood(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => handleOpenModal(null)} style={{marginTop:"10%"}}>
        Add Food
      </Button>
      <div style={{ marginLeft: '220px' }}>
        <div style={{ width: '60%', margin: '30px auto' }}>
          <Table columns={columns} dataSource={foods} rowKey="_id" />
        </div>
      </div>

      <Modal
        title={editingFood ? 'Edit Food' : 'Add Food'}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the food name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the food description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the food price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Image"
            rules={[{ required: true, message: 'Please upload the food image' }]}
          >
            <Upload
              name="img"
              accept=".jpg,.png"
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select the food category' }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category._id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuCRUD;  
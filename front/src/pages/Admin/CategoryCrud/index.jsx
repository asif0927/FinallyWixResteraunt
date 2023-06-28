import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, addCategory, updateCategory } from '../../../api/categoryrequest';
import { Table, Button, Modal, Form, Input } from 'antd';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const { TextArea } = Input;

const CategorySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData.data); 
    } catch (error) {
      console.error('Failed to retrieve category entries:', error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  

  const handleOpenModal = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
    form.setFieldsValue({
      name: category?.name || '',
    });
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setModalOpen(false);
    form.resetFields();
  };
  const handleCancelModal = () => {
    handleCloseModal();
  };  

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this category entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id);
          setCategories(categories.filter((category) => category._id !== id));
          Swal.fire('Deleted!', 'The category entry has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete category entry:', error);
        }
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingCategory) {
        const updatedData = {
          name: values.name,
        };

        await updateCategory(editingCategory._id, updatedData);

        const updatedCategories = categories.map((category) => {
          if (category._id === editingCategory._id) {
            return {
              ...category,
              ...updatedData,
            };
          }
          return category;
        });

        setCategories(updatedCategories);
      } else {
        const newCategory = {
          name: values.name,
        };

        await addCategory(newCategory);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Failed to save category entry:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
        <Button type="primary" danger onClick={() => handleDeleteCategory(record._id)}>
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
        <Table columns={columns} dataSource={categories} />

        <Modal
          open={modalOpen}
          title={editingCategory ? 'Edit Category Entry' : 'Add New Category'}
          onCancel={handleCancelModal} 
          onOk={handleSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the category name' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Index;  



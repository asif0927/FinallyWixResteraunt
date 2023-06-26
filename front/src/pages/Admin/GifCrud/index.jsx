import React, { useEffect, useState } from 'react';
import { getAllGifs, postGifs, editGifByID } from '../../../api/gifrequest';
import { Table, Button, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Index = () => {
  const [gifs, setGifs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGif, setEditingGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGifs();
  }, []);

  const fetchGifs = async () => {
    try {
      const gifsData = await getAllGifs();
      setGifs(gifsData);
    } catch (error) {
      console.error('Failed to retrieve gifs:', error);
    }
  };

  const handleOpenModal = (gif) => {
    setEditingGif(gif);
    setModalOpen(true);
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setEditingGif(null);
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', 'siar9lxz');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/du9areque/image/upload',
        formData
      );

      const newGif = {
        giffile: response.data.secure_url,
      };

      if (editingGif) {
        const updatedData = {
          giffile: response.data.secure_url,
        };

        await editGifByID(editingGif._id, updatedData);

        const updatedGif = gifs.map((gif) => {
          if (gif._id === editingGif._id) {
            return {
              ...gif,
              ...updatedData,
            };
          }
          return gif;
        });

        setGifs(updatedGif);
      } else {
        const createdGif = await postGifs(newGif);
        setGifs((prevGifs) => [...prevGifs, createdGif]);
        message.success('Gif added successfully');
      }

      setSelectedImage(null);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save gif:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'giffile',
      key: 'giffile',
      render: (giffile) => (
        <img
          src={giffile}
          alt="Gif Image"
          style={{ width: '100px', height: '100px' }}
        />
      ),
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
  ];

  return (
    <div style={{ marginLeft: '220px' }}>
      <div style={{ width: '60%', margin: '30px auto' }}>
        <Table columns={columns} dataSource={gifs} />

        <Modal
          visible={modalOpen}
          title={editingGif ? 'Edit Gif' : 'Add New Gif'}
          onCancel={handleCloseModal}
          onOk={handleSubmit}
          confirmLoading={loading}
        >
          {modalOpen && (
            <Upload
              beforeUpload={(file) => {
                setSelectedImage(file);
                return false;
              }}
              fileList={selectedImage ? [selectedImage] : []}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Index;


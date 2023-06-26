import React, { useEffect, useState } from 'react';
import { getAllLogos, editLogosByID, postLogos } from '../../../api/logorequest';
import { Table, Button, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Index = () => {
  const [logos, setLogos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchLogos();
  }, [logos]);

  const fetchLogos = async () => {
    try {
      const logosData = await getAllLogos();
      setLogos(logosData);
    } catch (error) {
      console.error('Failed to retrieve logos:', error);
    }
  };

  const handleOpenModal = (logo) => {
    setEditingLogo(logo);
    setModalOpen(true);
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setEditingLogo(null);
    setModalOpen(false);
  };


  
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "siar9lxz");
    axios
      .post("https://api.cloudinary.com/v1_1/du9areque/image/upload", formData)
      .then((response) => {
        const newLogo = {
         image: response.data.secure_url,
        };
  
        if (editingLogo) {
          const updatedData = {
            image: response.data.secure_url,
          };
  
          editLogosByID(editingLogo._id, updatedData);
  
          const updatedLogos = logos.map((logo) => {
            if (logo._id === editingLogo._id) {
              return {
                ...logo,
                ...updatedData,
              };
            }
            return logo;
          });
  
          setLogos(updatedLogos);
        } else {
          postLogos(newLogo)
            .then((createdLogo) => {
              setLogos((prevLogos) => [...prevLogos, createdLogo]);
              message.success("Logo added successfully");
            })
            .catch((error) => {
              console.error('Failed to create logo:', error);
            });
        }
  
        setSelectedImage(null);
        setLoading(false);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Failed to uploadlogo:', error);
        setLoading(false);
      });
  };
  
  
  
  
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="Logo Image"
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
        <Table columns={columns} dataSource={logos} />

        <Modal
          visible={modalOpen}
          title={editingLogo ? 'Edit Logo' : 'Add New Logo'}
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

import React, { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import ChatBot from 'react-simple-chatbot';

const ChatComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          width: '50px',
          height: '50px',
          background: 'lightblue',
          display: 'flex',
          backgroundColor:'rgb(174,154,100)',
          color:'white',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 9999,
        }}
        onClick={handleOpenModal}
      >
        <MessageOutlined style={{ fontSize: '24px' }} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Chat Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            '@media(max-width: 600px)': {
                width: '200px',
            },
          },
        }}
      >
        <ChatBot
          steps={[
            { id: '1', message: 'Hello, how can I help you?', trigger: '2' },
            { id: '2', user: true, trigger: '3' },
            { id: '3', message: 'Thank you, your problem will be solved as soon as possible.', trigger: '2' },
          ]}
        />
      </Modal>
    </>
  );
};

export default ChatComponent;

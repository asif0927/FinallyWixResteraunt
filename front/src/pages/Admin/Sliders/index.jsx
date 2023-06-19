import React, { useState } from "react";
import { Upload, Input, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { postSteakes } from "../../../api/steakrequest";

function Index() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "siar9lxz"); 

    axios
      .post("https://api.cloudinary.com/v1_1/du9areque/image/upload", formData)
      .then((response) => {
        const newSteak = {
          title: title,
          url: response.data.secure_url,
        };

        postSteakes(newSteak); 

        message.success("Image sent successfully");
        setTitle("");
        setSelectedImage(null);
        setLoading(false);
      })
      .catch((error) => {
        message.error("An error occurred while loading the image");
        setLoading(false);
      });
  }

  return (
    <div style={{ marginTop: "30%", marginLeft: "30%" }}>
      <form onSubmit={handleFormSubmit}>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Steak name"
          style={{ marginBottom: "16px" }}
        />
        <Upload
          beforeUpload={(file) => {
            setSelectedImage(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Image Download</Button>
        </Upload>
        <Button type="primary" htmlType="submit" loading={loading}>
         Send
        </Button>
      </form>
    </div>
  );
}

export default Index;  
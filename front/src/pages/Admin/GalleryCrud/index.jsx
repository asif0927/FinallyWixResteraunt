import React, { useState } from "react";
import { Upload, Input, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { postGalerrys } from "../../../api/galleryrequest";
const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hastags, setHastags] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("hastaghs",hastags);
    formData.append("upload_preset", "siar9lxz"); 

    axios
      .post("https://api.cloudinary.com/v1_1/du9areque/image/upload", formData)
      .then((response) => {
        const newImage = {
        hastags: hastags,
        img: response.data.secure_url,
        };

        postGalerrys(newImage); 

        message.success("Image sent successfully");
        setHastags("");
        setSelectedImage(null);
        setLoading(false);
      })
      .catch((error) => {
        message.error("An error occurred while loading the image");
        setLoading(false);
      });
  }
  return (
    <>
    <div style={{ marginTop: "30%", marginLeft: "30%" }}>
      <form onSubmit={handleFormSubmit}>
        <Input
          value={hastags}
          onChange={(event) => setHastags(event.target.value)}
          placeholder="Hastaghs write"
          style={{ marginBottom: "16px" }}
          required
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
    </>
  )
}

export default Index;

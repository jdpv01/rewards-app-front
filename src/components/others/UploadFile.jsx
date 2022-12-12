import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadFile = ({ onUpload }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileUrl, setFileUrl] = useState();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async ({ file }) => {
    if (file.status === 'done') {
      const url = await getBase64(file.originFileObj);
      setFileUrl(url);
      onUpload(url);
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8, }} >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/7c753183-e717-4a68-9f79-9ed977a546d2"
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(_) => setFileUrl(undefined)}
        method="GET"
        accept='image/png, image/jpeg, image/gif'
      >
        {fileUrl ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadFile;
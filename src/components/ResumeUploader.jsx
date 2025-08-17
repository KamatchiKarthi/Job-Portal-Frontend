import { Upload, Button, message } from 'antd';
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { uploadResume } from '../api/userApi';

const ResumeUploader = ({ resume, onUpdate }) => {
  const beforeUpload = file => {
    // console.log('before file type', file.type);

    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
    }
    return isPDF;
  };

  const handleUpload = async file => {
    console.log('Uploading file:', file);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      await uploadResume(formData);
      message.success('Resume uploaded successfully');
      onUpdate();
    } catch (error) {
      message.error('Upload failed', error);
    }
  };

  return (
    <div className="space-y-4">
      {resume && (
        <div className="flex items-center space-x-4">
          <FilePdfOutlined className="text-red-500 text-2xl" />
          <a
            href={`${import.meta.env.VITE_APP_TOKEN_KEY}${resume.trim()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Current Resume
          </a>
        </div>
      )}
      <Upload
        beforeUpload={beforeUpload}
        customRequest={({ file }) => handleUpload(file)}
        showUploadList={false}
        accept=".pdf"
      >
        <Button icon={<UploadOutlined />}>
          {resume ? 'Update Resume' : 'Upload Resume'}
        </Button>
      </Upload>
    </div>
  );
};

export default ResumeUploader;

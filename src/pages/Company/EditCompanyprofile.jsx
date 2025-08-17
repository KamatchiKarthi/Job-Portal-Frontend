import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message } from 'antd';
import { updateCompanyProfile, getCompanyProfile } from '../../api/companyApi';

const { Option } = Select;
const { TextArea } = Input;

const EditCompanyProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await getCompanyProfile();
        form.setFieldsValue(response.company);
      } catch (error) {
        message.error('Failed to load company profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [form]);

  const onFinish = async values => {
    try {
      setLoading(true);
      await updateCompanyProfile(values);
      message.success('Company profile updated successfully!');
      navigate('/employer/company/profile');
    } catch (error) {
      message.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Company Profile</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Company Name"
          rules={[{ required: true, message: 'Please input company name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
        >
          <Input placeholder="https://" />
        </Form.Item>

        <Form.Item name="industry" label="Industry">
          <Input />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="employees" label="Company Size">
         <Input placeholder="e.g. 50-100 employees" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Company Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCompanyProfile;

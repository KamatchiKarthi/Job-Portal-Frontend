import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, message, Spin ,Row ,Col } from 'antd';
import { createJob, updateJob, getJobById } from '../../api/jobsApi';

const { Option } = Select;
const { TextArea } = Input;

const CreateJob = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          setLoading(true);
          const response = await getJobById(id);
          form.setFieldsValue(response.data);
          setIsEditing(true);
        } catch (error) {
          message.warning('Failed to load job details' ,error);
          navigate('/employer');
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (isEditing) {
        await updateJob(id, values);
        message.success('Job updated successfully!');
      } else {
        await createJob(values);
        message.success('Job created successfully!');
      }
      navigate('/employer/dashboard');
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Job' : 'Create New Job'}
      </h1>
      
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please input job title!' }]}
          >
            <Input placeholder="e.g. Senior React Developer" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Job Description"
            rules={[{ required: true, message: 'Please input job description!' }]}
          >
            <TextArea rows={6} placeholder="Detailed job description..." />
          </Form.Item>

          <Form.Item
            name="requirements"
            label="Requirements"
            rules={[{ required: true, message: 'Please input job requirements!' }]}
          >
            <TextArea rows={4} placeholder="Required skills and qualifications..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jobtype"
                label="Job Type"
                rules={[{ required: true, message: 'Please select job type!' }]}
              >
                <Select placeholder="Select job type">
                  <Option value="Full-time">Full-time</Option>
                  <Option value="Part-time">Part-time</Option>
                  <Option value="Contract">Contract</Option>
                  <Option value="Internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please input job location!' }]}
              >
                <Input placeholder="e.g. New York, Remote" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: 'Please input salary!' }]}
              >
                <Input placeholder="e.g. $80,000 - $100,000" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="skills"
                label="Required Skills"
                rules={[{ required: true, message: 'Please input required skills!' }]}
              >
                <Select
                  mode="tags"
                  placeholder="Add skills (e.g. React, Node.js)"
                  tokenSeparators={[',']}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEditing ? 'Update Job' : 'Create Job'}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateJob;
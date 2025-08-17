import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Spin, message } from 'antd';
import { getJobById, updateJob } from '../../api/jobsApi';
import LoadingSpinner from '../../components/LoadSpinner';

const { Option } = Select;

const EditJob = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getJobById(id);
        if (res?.data) {
          form.setFieldsValue({
            title: res.data.title,
            location: res.data.location,
            description: res.data.description,
            jobtype: res.data.jobtype,
            salary: res.data.salary,
            requirements: res.data.requirements,
          });
        }
      } catch (err) {
        console.error(err);
        message.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, form]);

  const handleUpdate = async values => {
    try {
      setSubmitting(true);
      await updateJob(id, values);
      message.success('Job updated successfully!');
      navigate('/employer/dashboard');
    } catch (err) {
      console.error(err);
      message.error('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Edit Job</h2>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        {/* Job Title */}
        <Form.Item
          label="Job Title"
          name="title"
          rules={[{ required: true, message: 'Please enter job title' }]}
        >
          <Input placeholder="Enter job title" />
        </Form.Item>

        {/* Location */}
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please enter location' }]}
        >
          <Input placeholder="Enter job location (e.g. Chennai, Remote, New York)" />
        </Form.Item>

        {/* Job Type */}
        <Form.Item
          label="Job Type"
          name="jobtype"
          rules={[{ required: true, message: 'Please select job type' }]}
        >
          <Select placeholder="Select job type">
            <Option value="Full-time">Full Time</Option>
            <Option value="Part-time">Part Time</Option>
            <Option value="Contract">Contract</Option>
            <Option value="Internship">Internship</Option>
          </Select>
        </Form.Item>

        {/* Salary */}
        <Form.Item
          label="Salary"
          name="salary"
          rules={[{ required: true, message: 'Please enter salary' }]}
        >
          <Input placeholder="Enter salary (e.g. $60,000)" />
        </Form.Item>

        {/* Requirements */}
        <Form.Item
          label="Requirements"
          name="requirements"
          rules={[{ required: true, message: 'Please enter requirements' }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter job requirements (e.g. skills, experience)"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={5} placeholder="Enter job description" />
        </Form.Item>

        {/* Actions */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Update Job
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => navigate('/employer/dashboard')}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditJob;

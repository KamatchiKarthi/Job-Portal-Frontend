import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Card, Spin } from 'antd';
import { getJobById } from '../../api/jobsApi';
import { applyForJob } from '../../api/applicationApi';
import { useAuth } from '../../Context/Authcontext';
import LoadSpinner from '../../components/LoadSpinner'

const { TextArea } = Input;

const ApplyJob = () => {
  const [form] = Form.useForm();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        alert('Failed to load job details', error);
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const onFinish = async (values) => {
  try {
    setApplying(true);
    await applyForJob({ jobId: id, values });

    message.success('Application submitted successfully!');
    navigate(`/jobs`, { state: { applied: true } });

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Application failed';
    
    if (errorMessage.toLowerCase().includes('already apply')) {
      message.warning(errorMessage);
      // Navigate back with applied=true so JobDetails updates UI
      navigate(`/jobs/${id}`, { state: { applied: true } });
    } else {
      alert(errorMessage);
    }
  } finally {
    setApplying(false);
  }
};


  if (loading || !job) {
    return <LoadSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card title={`Applying for: ${job.title}`} className="mb-6">
        <p className="font-medium">{job.company.name}</p>
        <p className="text-gray-600">{job.location}</p>
      </Card>

      <Card title="Application Form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: user?.email,
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[
              { required: true, message: 'Please write a cover letter!' },
            ]}
          >
            <TextArea
              rows={8}
              placeholder="Explain why you're a good fit for this position..."
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={applying}>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ApplyJob;

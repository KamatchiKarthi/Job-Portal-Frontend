import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Card, Button, Typography, Tag, Spin, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetJobApplications } from '../../api/applicationApi';
import LoadingSpinner from '../../components/LoadSpinner';

const { Title, Text } = Typography;

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await GetJobApplications(jobId);
        console.log('fetchapplications', res.applications);
        setApplications(res.applications || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      title: 'Applicant',
      key: 'applicant',
      render: (_, app) => (
        <div
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate(`/employer/applications/${app._id}`)}
        >
          <Text strong>{app.applicant?.name}</Text>
          <Text type="secondary" className="block">
            {app.applicant?.email}
          </Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>,
    },

    {
      title: 'Resume',
      key: 'resume',
      render: (_, app) => (
        <a
          href={`${import.meta.env.VITE_APP_TOKEN_KEY}${app.resume}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          View Resume
        </a>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/employer/dashboard')}
        className="mb-4"
      >
        Back to Dashboard
      </Button>

      <Card title="Job Applicants">
        {loading ? (
          <Spin />
        ) : applications.length > 0 ? (
          <Table
            columns={columns}
            dataSource={applications}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Empty description="No applicants found for this job" />
        )}
      </Card>
    </div>
  );
};

const statusColors = {
  applied: 'blue',
  reviewed: 'purple',
  interviewed: 'orange',
  hired: 'green',
  rejected: 'red',
};

export default JobApplicants;

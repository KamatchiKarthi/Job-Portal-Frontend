import { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Empty,
  Space,
  Typography,
  message,
  Table,
  Spin,
  Tag,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { GetCompanyJob, deleteJob } from '../../api/jobsApi';
import { GetrecentApplications } from '../../api/applicationApi';
import LoadingSpinner from '../../components/LoadSpinner';

const { Title, Text } = Typography;

const EmployerDashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const navigate = useNavigate();
  const [totalApplications, setTotalApplications] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [applicantdetail, SetapplicantDetail] = useState();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch jobs
        const jobsRes = await GetCompanyJob();
        const jobsData = jobsRes.data || [];
        console.log(jobsData);
        setJobs(jobsData);
        setTotalJobs(jobsData.length);

        // Fetch recent applications
        const applicationsRes = await GetrecentApplications();
        console.log(applicationsRes);

        setRecentApplications(applicationsRes.applications || []);
        setTotalApplications(applicationsRes.applications?.length || 0);

        applicationsRes.applications.forEach(app => {
          app.applicant._id;
        });
      } catch (err) {
        console.error(err);
        message.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const handleDelete = async id => {
    try {
      await deleteJob(id);
      alert('Job deleted successfully!');
      setJobs(prev => prev.filter(job => job._id !== id));
      setTotalJobs(prev => prev - 1);
    } catch (err) {
      console.error(err);
      message.error('Failed to delete job');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  const jobColumns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/employer/jobs/${record._id}/applicants`)}
        >
          {text}
        </Button>
      ),
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Posted On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => (date ? new Date(date).toLocaleDateString() : '—'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/employer/jobs/edit/${record._id}`)}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Space direction="vertical" size="large" className="w-full">
        {/* Stats Cards */}
        <Space size="middle" className="w-full">
          <Card className="flex-1">
            <Space direction="vertical" align="center">
              <Text type="secondary">Total Jobs</Text>
              <Title level={3}>{totalJobs}</Title>
            </Space>
          </Card>

          <Card className="flex-1">
            <Space direction="vertical" align="center">
              <Text type="secondary">Total Applications</Text>
              <Title level={3}>{totalApplications}</Title>
            </Space>
          </Card>
        </Space>

        {/* Jobs Section */}
        <Card title="Your Job Postings">
          {loading ? (
            <Spin />
          ) : jobs.length > 0 ? (
            <Table
              dataSource={jobs}
              columns={jobColumns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <Empty
              description={
                <Space direction="vertical">
                  <Text>You haven't posted any jobs yet</Text>
                  <Link to="jobs/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                      Create Your First Job Posting
                    </Button>
                  </Link>
                </Space>
              }
            />
          )}
        </Card>

        {/* Recent Applications Section */}
        <Card title="Recent Applications" className="border-none">
          {loading ? (
            <Spin />
          ) : recentApplications.length > 0 ? (
            <div className="space-y-2">
              {recentApplications.map((app, index) => (
                <div
                  key={index}
                  className="p-3 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/applications/${app._id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong>{app.applicant?.name}</Text> applied for{' '}
                      <Text strong>{app.job?.title}</Text>
                    </div>
                    <div className="flex items-center gap-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty description={<Text>No recent applications found</Text>} />
          )}
        </Card>
      </Space>
    </div>
  );
};

export default EmployerDashboard;

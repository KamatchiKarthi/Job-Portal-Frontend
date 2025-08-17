import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Tag, Button, Space, message, Skeleton, Empty } from 'antd';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';
import { getMyApplication } from '../../api/applicationApi';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await getMyApplication();
        setApplications(response.data || []);
      } catch (error) {
        message.error('Failed to load applications', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'jobseeker') {
      fetchApplications();
    }
  }, [user]);

  const getStatusTag = status => {
    const statusMap = {
      pending: { color: 'orange', text: 'Pending Review' },
      accepted: { color: 'green', text: 'Accepted' },
      rejected: { color: 'red', text: 'Rejected' },
      interviewing: { color: 'blue', text: 'Interviewing' },
    };

    return (
      <Tag color={statusMap[status]?.color || 'default'}>
        {statusMap[status]?.text || status}
      </Tag>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card
        title={
          <Space>
            <FileTextOutlined />
            <span>My Job Applications ({applications.length})</span>
          </Space>
        }
      >
        {applications.length === 0 ? (
          <Empty
            description={
              <span className="text-gray-500">
                You haven't applied to any jobs yet
              </span>
            }
          >
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs
            </Button>
          </Empty>
        ) : (
          <List
            itemLayout="vertical"
            dataSource={applications}
            renderItem={application => (
              <List.Item
                key={application._id}
                actions={[
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/jobs/${application.job._id}`)}
                  >
                    View Job
                  </Button>,
                  getStatusTag(application.status),
                ]}
              >
                <List.Item.Meta
                  title={
                    <a onClick={() => navigate(`/jobs/${application.job._id}`)}>
                      {application.job.title}
                    </a>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <span>{application.job.company.name}</span>
                      <span>
                        <ClockCircleOutlined className="mr-1" />
                        Applied on{' '}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                    </Space>
                  }
                />
                {application.coverLetter && (
                  <div className="mt-2">
                    <p className="font-medium">Cover Letter:</p>
                    <p className="text-gray-600 line-clamp-2">
                      {application.coverLetter}
                    </p>
                  </div>
                )}
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default MyApplications;

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  Tag,
  Button,
  Descriptions,
  Divider,
  Space,
  Skeleton,
  Avatar,
  message,
} from 'antd';
import {
  DollarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
  BookOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';
import { getJobById } from '../../api/jobsApi';
import { applicantStatusCheck } from '../../api/applicationApi';

const { Item } = Descriptions;

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await getJobById(id);
        setJob(response.data);

        if (user?.role === 'jobseeker') {
          const status = await applicantStatusCheck(id);
          setAlreadyApplied(status?.applied || false);
        }

        if (location.state?.applied) {
          setAlreadyApplied(true);
        }
      } catch (error) {
        message.warning('Failed to load job details', error);
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate, user, location.state]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading || !job) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        className="mb-4"
      >
        Back to Jobs
      </Button>

      <Card
        title={job.title}
        extra={
          <Space>
            <Tag color={job.jobtype === 'Full-time' ? 'green' : 'blue'}>
              {job.jobtype.toUpperCase()}
            </Tag>
            {job.status === 'closed' && <Tag color="red">CLOSED</Tag>}
          </Space>
        }
      >
        {/* Company Header */}
        <div className="flex items-center mb-6">
          <Avatar
            src={job.company.logo}
            size={64}
            icon={<UserOutlined />}
            className="mr-4"
          />
          <div className="ml-3">
            <h2 className="text-xl font-semibold">{job.company.name}</h2>
            <div className="text-gray-600">
              <Space>
                <span>
                  <EnvironmentOutlined /> {job.location}
                </span>
                <span>
                  <ClockCircleOutlined /> Posted{' '}
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </Space>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <Descriptions bordered column={1} className="mb-6">
          <Item label="Salary">
            <DollarOutlined className="mr-2" />
            {job.salary}
          </Item>
          <Item label="Experience Level">
            {job.experienceLevel || 'Not specified'}
          </Item>
          <Item label="Application Deadline">
            {job.deadline
              ? new Date(job.deadline).toLocaleDateString()
              : 'None'}
          </Item>
        </Descriptions>

        {/* Job Description */}
        <Divider orientation="left">
          <BookOutlined className="mr-2" />
          Job Description
        </Divider>
        <div className="mb-6 whitespace-pre-line">{job.description}</div>

        {/* Requirements */}
        <Divider orientation="left">
          <SafetyCertificateOutlined className="mr-2" />
          Requirements
        </Divider>
        <div className="whitespace-pre-line">{job.requirements}</div>

        {/* Skills */}
        <div className="mb-6 mt-4">
          <h4 className="font-medium mb-2">Must have:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>

        {/* Company Details */}
        <Divider orientation="left">
          <UserOutlined className="mr-2" />
          Company Details
        </Divider>
        <Descriptions bordered column={1} className="mb-6">
          <Item label="Company Name">{job.company.name}</Item>
          <Item label="Website">
            {job.company.website ? (
              <a
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {job.company.website}
              </a>
            ) : (
              'Not provided'
            )}
          </Item>
          <Item label="Location">
            {job.company.location || 'Not specified'}
          </Item>
          <Item label="About Company">
            {job.company.description || 'No company description available.'}
          </Item>
        </Descriptions>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          {user?.role === 'jobseeker' &&
            (alreadyApplied ? (
              <Tag color="green">You've already applied for this position</Tag>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(`/jobs/apply/${job._id}`)}
                disabled={job.status === 'closed'}
              >
                Apply Now
              </Button>
            ))}
          {user?.role === 'employer' && user?._id === job.company.owner && (
            <Button
              type="primary"
              onClick={() => navigate(`/jobs/${job._id}/edit`)}
            >
              Edit Job
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default JobDetails;

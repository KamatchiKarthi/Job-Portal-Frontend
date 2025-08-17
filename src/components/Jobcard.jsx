import { Card, Tag, Space, Button } from 'antd';
import { Col, Row } from 'antd';
import {
  DollarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  if (!job) return null;
  return (
    <Card
      className="mb-4  hover:shadow-lg transition-shadow duration-300"
      title={
        <Link
          to={`/jobs/${job._id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {job.title}
        </Link>
      }
      extra={
        <Tag color={job.type === 'full-time' ? 'green' : 'blue'}>
          {job.type}
        </Tag>
      }
    >
      <div className="mb-3 text-gray-700 hover:text-gray-900">
        {job.company.name}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map(skill => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>

      <Space size="large" className="text-gray-600">
        <span>
          <DollarOutlined className="mr-1" />
          {job.salary}
        </span>
        <span>
          <EnvironmentOutlined className="mr-1" />
          {job.location}
        </span>
        <span>
          <ClockCircleOutlined className="mr-1" />
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </Space>

      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          onClick={() => navigate(`/jobs/${job._id}`)} // use the hook function
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;

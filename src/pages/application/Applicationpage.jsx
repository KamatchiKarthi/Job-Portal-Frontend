import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Tag } from 'antd';
import { GetCompanyApplications } from '../../api/applicationApi';
import LoadingSpinner from '../../components/LoadSpinner';

const { Title, Text } = Typography;

const Applications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await GetCompanyApplications();
        console.log(res.data);
        const flatData = res.data.flatMap(job =>
          job.applicants.map(app => ({
            key: app.application_id,
            jobTitle: job.title,
            jobId: job._id,
            applicationId: app.application_id,
            applicantId: app._id,
            name: app.name,
            email: app.email,
            resume: app.resume,
            coverletter: app.coverletter,
            status: app.status,
            appliedOn: app.createdAt,
          }))
        );
        setApplications(flatData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleApplicantClick = applicationId => {
    navigate(`/employer/applications/${applicationId}`);
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: text => <Text strong>{text}</Text>,
    },
    {
      title: 'Applicant',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div
          className="cursor-pointer hover:text-blue-500"
          onClick={() => handleApplicantClick(record.applicationId)}
        >
          <Text strong>{record.name}</Text>
          <Text type="secondary" className="block">
            {record.email}
          </Text>
        </div>
      ),
    },
    {
      title: 'Resume',
      dataIndex: 'resume',
      key: 'resume',
      render: resume =>
        resume ? (
          <a
            href={`${import.meta.env.VITE_APP_TOKEN_KEY}${resume.trim()}`}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        ) : (
          <Text type="secondary">No resume</Text>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color="blue">{status}</Tag>,
    },
    {
      title: 'Applied On',
      dataIndex: 'appliedOn',
      key: 'appliedOn',
      render: date => (date ? new Date(date).toLocaleDateString() : '-'),
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="applications-container">
      <Title level={3}>Applications</Title>
      <Table
        columns={columns}
        dataSource={applications}
        pagination={{ pageSize: 8 }}
        rowClassName="application-row"
      />
    </div>
  );
};

export default Applications;

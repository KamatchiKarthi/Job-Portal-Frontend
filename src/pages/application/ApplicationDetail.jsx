import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Descriptions,
  Tag,
  Select,
  Spin,
  Typography,
  message,
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  GetApplicationDetails,
  applicantStatusChange,
} from '../../api/applicationApi';
import LoadingSpinner from '../../components/LoadSpinner';

const { Title, Text } = Typography;
const { Option } = Select;

const ApplicantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await GetApplicationDetails(id);
        console.log(res);
        setApplication(res.data);
      } catch (error) {
        console.error(error);
        message.error('Failed to load application details');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleStatusChange = async newStatus => {
    try {
      setUpdating(true);
      await applicantStatusChange(id, newStatus);
      setApplication({ ...application, status: newStatus });
      message.success('Status updated successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back to Applicants
      </Button>

      <Card
        title="Applicant Details"
        extra={
          <Select
            value={application?.status}
            onChange={handleStatusChange}
            loading={updating}
            style={{ width: 150 }}
          >
            <Option value="applied">Applied</Option>
            <Option value="reviewed">Reviewed</Option>
            <Option value="interviwed">Interviewed</Option>
            <Option value="hired">Hired</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        }
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Full Name">
            {application?.applicant?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {application?.applicant?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {application?.applicant?.phone || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Applied On">
            {new Date(application?.createdAt).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Job Title">
            {application?.job?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Job Location">
            {application?.job?.location}
          </Descriptions.Item>
        </Descriptions>

        <Card title="Resume" className="mt-6">
          {application?.resume ? (
            <>
              {application.resume.endsWith('.pdf') && (
                <iframe
                  src={`${
                    import.meta.env.VITE_APP_TOKEN_KEY
                  }/${application.resume.trim()}`}
                  className="w-full h-[500px] border rounded mb-4"
                  title="Resume"
                />
              )}
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </Button>
            </>
          ) : (
            <Text type="warning">No resume uploaded</Text>
          )}
        </Card>

        {application?.coverletter && (
          <Card title="Cover Letter" className="mt-6">
            <div className="whitespace-pre-line p-4 bg-gray-50 rounded">
              {application.coverletter}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default ApplicantDetails;

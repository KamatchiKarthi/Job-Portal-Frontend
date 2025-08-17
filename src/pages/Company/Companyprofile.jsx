import { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Spin, Empty } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';
import { getCompanyProfile } from '../../api/companyApi';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loadings, setLoading] = useState(true);

  useEffect(() => {

    const fetchCompany = async () => {
      try {
        const response = await getCompanyProfile();
        console.log('📢 API Response from getCompanyProfile:', response);

        // Some APIs return null/empty if no company
        if (response.company) {
          console.log('Company data:', response.company);
          setCompany(response.company);
        } else {
          setCompany(null);
          console.log('No company profile found');
        }
      } catch (error) {
        setCompany(null);
        console.log(error); // no company or error
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [loading]);

  if (loadings) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // If company is not created yet
  if (!company) {
    return (
      <div className="max-w-3xl">
        <Button
          className="flex justify-start"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/employer/company/create')}
        >
          Create Company Profile
        </Button>
        <Empty
          description="No company profile found"
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }

  // If company exists
  return (
    <div className="max-w-4xl mx-auto">
      <Card
        title="Company Profile"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate('/employer/company/profile/edit')}
          >
            Edit Profile
          </Button>
        }
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Company Name">
            {company.name}
          </Descriptions.Item>
          <Descriptions.Item label="Industry">
            {company.industry}
          </Descriptions.Item>
          <Descriptions.Item label="Website">
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            ) : (
              'Not specified'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {company.location}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {company.description || 'Not specified'}
          </Descriptions.Item>
      
          <Descriptions.Item label="Company Size">
            {company.employees || 'Not specified'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default CompanyProfile;

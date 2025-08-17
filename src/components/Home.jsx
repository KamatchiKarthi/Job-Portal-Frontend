import { Button, Card, List, Typography, Divider } from 'antd';
import { CheckOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const { user } = useAuth();

  const features = [
    'Find jobs matching your skills',
    'Connect with top employers',
    'Easy application process',
    'Get job alerts',
    'Free to use',
  ];

  return (
    <div
      className="home-page"
      style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}
    >
      {/* Welcome Section */}
      <section style={{ textAlign: 'center', margin: '48px 0' }}>
        <Title level={2}>Welcome to Our Job Portal</Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
          Your gateway to finding the perfect job or the ideal candidate
        </Paragraph>

        {user && (
          <Link
            to={
              user
                ? user.role === 'jobseeker'
                  ? '/dashboard'
                  : '/employer/dashboard'
                : '/jobs'
            }
          >
            <Button type="primary" size="large" style={{ marginTop: 24 }}>
              Go to Dashboard
            </Button>
          </Link>
        )}
      </section>

      <Divider />

      {/* Key Features */}
      <section
        style={{ margin: '48px 0' }}
        className="w-full flex flex-col items-center"
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          Why Choose Our Platform
        </Title>

        <Card className="w-150" style={{ marginTop: 24 }}>
          <List
            size="large"
            dataSource={features}
            renderItem={item => (
              <List.Item>
                <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </Card>
      </section>

      <Divider />

      {/* Quick Stats */}
      <section style={{ margin: '48px 0', textAlign: 'center' }}>
        <Title level={3}>Our Impact</Title>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            marginTop: 24,
          }}
        >
          <div>
            <RocketOutlined style={{ fontSize: 32, color: '#1890ff' }} />
            <Title level={4} style={{ marginTop: 8 }}>
              10,000+ Jobs
            </Title>
          </div>
          <div>
            <TeamOutlined style={{ fontSize: 32, color: '#1890ff' }} />
            <Title level={4} style={{ marginTop: 8 }}>
              500+ Companies
            </Title>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          backgroundColor: '#f0f5ff',
          padding: 48,
          borderRadius: 8,
          textAlign: 'center',
          margin: '48px 0',
        }}
      >
        <Title level={3}>Ready to get started?</Title>
        <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
          Join thousands of professionals and companies finding success on our
          platform
        </Paragraph>
        <Link to={user ? '/jobs' : '/jobs'}>
          <Button type="primary" size="large">
            {user ? 'Browse Jobs' : 'Browse Jobs'}
          </Button>
        </Link>
      </section>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  ProfileOutlined, 
  FileTextOutlined,
  UserOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <Layout className="min-h-screen">
      <Sider width={250} theme="light" className="shadow">
        <div className="p-4 h-16 flex items-center">
          <h2 className="text-xl font-bold">Job Seeker Dashboard</h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/dashboard'),
            },
            {
              key: '2',
              icon: <FileTextOutlined />,
              label: 'Applications',
              onClick: () => navigate('/applications'),
            },
            {
              key: '3',
              icon: <ProfileOutlined />,
              label: 'Recommended Jobs',
              onClick: () => navigate('/jobs/recommended'),
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: 'Profile',
              onClick: () => navigate('/profile'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
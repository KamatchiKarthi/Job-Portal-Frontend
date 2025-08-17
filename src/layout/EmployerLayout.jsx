import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  PlusOutlined,
  TeamOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const EmployerLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen">
      <Sider width={250} theme="light" className="shadow ">
        <div className="p-4 h-16 flex items-center">
          <h2 className="text-xl font-bold">Employer Dashboard</h2>
        </div>
        <Menu
          mode="inline"
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/employer/dashboard'),
            },
            {
              key: '2',
              icon: <PlusOutlined />,
              label: 'Post a Job',
              onClick: () => navigate('jobs/create'),
            },
            {
              key: '3',
              icon: <TeamOutlined />,
              label: 'Applications',
              onClick: () => navigate('applications'),
            },
            {
              key: '4',
              icon: <BankOutlined />,
              label: 'Company Profile',
              onClick: () => navigate('company/profile'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="p-6 bg-gray-150 ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployerLayout;

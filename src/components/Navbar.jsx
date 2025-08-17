import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { useAuth } from '../Context/Authcontext';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    ...(user?.role === 'jobseeker'
      ? [
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
          },
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
          },
          {
            key: 'jobs',
            icon: <DashboardOutlined />,
            label: <Link to="/jobs">Jobs</Link>,
          },
        ]
      : []),
    ...(user?.role === 'employer'
      ? [
          // {
          //   key: 'employer-dashboard',
          //   icon: <DashboardOutlined />,
          //   label: <Link to="/employer">Dashboard</Link>,
          // },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobPortal
        </Link>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button type="text">Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </>
          ) : (
            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
              {/* Use a single element as the trigger */}
              <span className="flex items-center cursor-pointer">
                <span className="mr-2 font-medium">{user.name}</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserOutlined className="text-blue-600" />
                </span>
              </span>
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

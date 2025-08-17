import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User doesn't have required role, redirect to home with message
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
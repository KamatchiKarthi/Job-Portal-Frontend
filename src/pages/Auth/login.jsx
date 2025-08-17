import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async values => {
    try {
      setLoading(true);
      const data = await login(values);
      if (!data?.user) {
        console.error("API did not return 'user' field!");
      }
      message.success('Login successful!');
      console.log('User data:', data.user);
      if (data?.user?.role === 'jobseeker') {
        navigate('/dashboard', { replace: true });
      } else if (data?.user?.role === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      } else {
        navigate('/');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Login to JobPortal
      </h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            autoComplete="email"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            autoComplete="current-password"
            placeholder="Password"
          />
        </Form.Item>

        {/* Forgot password link */}
        <div className="text-right mb-4">
          <Link to="/forget" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/register" className="text-blue-600 hover:underline">
          Register now
        </Link>
      </div>
    </div>
  );
};

export default Login;

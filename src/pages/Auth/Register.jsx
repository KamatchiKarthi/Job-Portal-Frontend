import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, Card, Divider, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../Context/Authcontext';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async values => {
    // e.preventDefault();
    try {
      setLoading(true);
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };
      console.log(values);

      await register(userData);
      message.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      message.warning(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-gray-600">Join us to start your journey</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          onFinishFailed={() => console.log('Validation failed')}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { min: 3, message: 'Name must be at least 3 characters' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<SafetyOutlined />} placeholder="••••••" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Registering as"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Select placeholder="Select a role">
              <Option value="jobseeker">Job Seeker</Option>
              <Option value="employer">Employer</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <Divider>Already have an account?</Divider>
        <div className="text-center">
          <Link to="/login">
            <Button type="link">Login here</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;

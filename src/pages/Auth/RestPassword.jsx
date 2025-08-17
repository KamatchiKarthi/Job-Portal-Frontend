import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResetPassword } from '../../api/passwordApi';

const ResetPasswords = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = async values => {
    try {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      const res = await ResetPassword(token, values.password);
      message.success(res.data.message || 'Password reset successful!');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter new password!' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswords;

import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { ForgetPassword } from '../../api/passwordApi';
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      const res = await ForgetPassword(values.email);
      message.success(res.data.message || 'Reset link sent to your email!');
    } catch (error) {
      message.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
        >
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;

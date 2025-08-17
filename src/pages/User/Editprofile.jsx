import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { updateUserProfile } from '../../api/authApi';
import { useAuth } from '../../Context/Authcontext';

const { TextArea } = Input;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        profile: {
          skills: user.profile?.skills || [],
          experience: user.profile?.experience || [],
          education: user.profile?.education || [],
        },
      });
    }
  }, [user, form]);

  const onFinish = async values => {
    try {
      setLoading(true);
      const payload = {
        name: values.name,
        profile: values.profile,
      };
      const response = await updateUserProfile(payload);
      const oldUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = {
        ...response.user,
        token: oldUser.token, // keep existing token
      };
      setUser(updatedUser); // update context

      localStorage.setItem('user', JSON.stringify(updatedUser)); // update storage
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      message.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input disabled={user?.provider !== 'local'} />
        </Form.Item>

        {/* Jobseeker fields */}
        {user?.role === 'jobseeker' && (
          <>
            {/* Skills */}
            <Form.Item name={['profile', 'skills']} label="Skills">
              <Select
                mode="tags"
                placeholder="Add your skills"
                tokenSeparators={[',']}
              />
            </Form.Item>

            <Divider>Experience</Divider>
            <Form.List name={['profile', 'experience']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space
                      key={field.key} // key directly here
                      align="baseline"
                      style={{ display: 'flex', marginBottom: 8 }}
                    >
                      <Form.Item
                        {...field} // spread field only once
                        name={[field.name, 'title']}
                        rules={[
                          { required: true, message: 'Job title required' },
                        ]}
                      >
                        <Input placeholder="Job title" />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, 'company']}
                        rules={[
                          { required: true, message: 'Company required' },
                        ]}
                      >
                        <Input placeholder="Company" />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, 'duration']}
                        rules={[
                          { required: true, message: 'Duration required' },
                        ]}
                      >
                        <Input placeholder="Duration" />
                      </Form.Item>

                      <Form.Item name={[field.name, 'description']}>
                        <TextArea placeholder="Description" rows={1} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Experience
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Divider>Education</Divider>
            <Form.List name={['profile', 'education']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space
                      key={field.key} // key directly here
                      align="baseline"
                      style={{ display: 'flex', marginBottom: 8 }}
                    >
                      <Form.Item
                        {...field} // spread field only once
                        name={[field.name, 'degree']}
                        rules={[{ required: true, message: 'Degree required' }]}
                      >
                        <Input placeholder="Degree" />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, 'institution']}
                        rules={[
                          { required: true, message: 'Institution required' },
                        ]}
                      >
                        <Input placeholder="Institution" />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, 'year']}
                        rules={[{ required: true, message: 'Year required' }]}
                      >
                        <Input placeholder="Year" />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Education
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;

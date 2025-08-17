// import { useState } from 'react';
// import { Modal, Form, Input } from 'antd';
// import { MailOutlined } from '@ant-design/icons';

// const { TextArea } = Input;

// const ApplyModal = ({ visible, onCancel, onApply, job, user }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       setLoading(true);
//       await onApply(values);
//       form.resetFields();
//     } catch (error) {
//       console.error('Validation failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title={`Apply for ${job?.title}`}
//       visible={visible}
//       onOk={handleSubmit}
//       onCancel={onCancel}
//       confirmLoading={loading}
//       width={700}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         initialValues={{
//           email: user?.email,
//         }}
//       >
//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[
//             { required: true, message: 'Please input your email!' },
//             { type: 'email', message: 'Please enter a valid email!' }
//           ]}
//         >
//           <Input prefix={<MailOutlined />} />
//         </Form.Item>

//         <Form.Item
//           name="coverLetter"
//           label="Cover Letter"
//           rules={[{ required: true, message: 'Please write a cover letter!' }]}
//         >
//           <TextArea 
//             rows={8} 
//             placeholder={`Why are you a good fit for the ${job?.title} position at ${job?.company.name}?`}
//           />
//         </Form.Item>
//       </Form>
      
//     </Modal>
//   );
// };

// export default ApplyModal;
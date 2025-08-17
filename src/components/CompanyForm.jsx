import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { CreateCompany } from "../api/companyApi";

export default function CreateCompanyForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await CreateCompany(values);
      if (response.data) {
        alert("Company profile created successfully!");
        onSuccess?.(); 
      } else {
        message.error(response.message || "Failed to create company profile");
      }
    } catch {
      message.error("Error creating company profile");
    }
    setLoading(false);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500, marginTop: 20 }}
    >
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "Please enter company name" }]}
      >
        <Input placeholder="e.g. ABC Pvt Ltd" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter company description" }]}
      >
        <Input.TextArea placeholder="Describe your company" rows={4} />
      </Form.Item>

      <Form.Item label="Website" name="website">
        <Input placeholder="https://example.com" />
      </Form.Item>

      <Form.Item label="Location" name="location">
        <Input placeholder="City, Country" />
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input placeholder="e.g. Software, Finance" />
      </Form.Item>

      <Form.Item label="Company Size" name="employees">
        <Input placeholder="e.g. 50-100 employees" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Company
        </Button>
      </Form.Item>
    </Form>
  );
}

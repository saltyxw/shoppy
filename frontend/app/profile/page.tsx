"use client";

import {
  Layout,
  Card,
  Avatar,
  Tabs,
  Form,
  Input,
  Button,
  Divider,
  Typography,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  SaveOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ProfilePage() {
  const onUpdateProfile = (values: any) => {
    console.log("Update profile:", values);
  };

  const onChangePassword = (values: any) => {
    console.log("Change password:", values);
  };

  return (
    <Layout className="min-h-screen bg-[#f5f7fa]">
      <Content className="flex justify-center items-start py-20 px-4">
        <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
          <div className="flex items-center gap-6 mb-8">
            <Avatar size={96} icon={<UserOutlined />} />
            <div>
              <Title level={3} className="mb-0">
                John Doe
              </Title>
              <Text type="secondary">john@example.com</Text>
            </div>
            <Button
              type="primary"
              danger
              size="large"
              icon={<UserDeleteOutlined />}
              htmlType="submit"
            >
              Logout
            </Button>
          </div>

          <Divider />

          <Tabs
            size="large"
            defaultActiveKey="profile"
            items={[
              {
                key: "profile",
                label: "Profile information",
                children: (
                  <Form
                    layout="vertical"
                    className="max-w-md"
                    onFinish={onUpdateProfile}
                    initialValues={{
                      fullname: "John Doe",
                    }}
                  >
                    <Form.Item
                      label="Full name"
                      name="fullname"
                      rules={[
                        { required: true, message: "Full name is required" },
                        { min: 3, message: "Min 3 characters" },
                      ]}
                    >
                      <Input size="large" placeholder="Enter your full name" />
                    </Form.Item>

                    <Button
                      type="primary"
                      size="large"
                      icon={<SaveOutlined />}
                      htmlType="submit"
                    >
                      Save changes
                    </Button>
                  </Form>
                ),
              },
              {
                key: "security",
                label: "Security",
                children: (
                  <Form
                    layout="vertical"
                    className="max-w-md"
                    onFinish={onChangePassword}
                  >
                    <Form.Item
                      label="Current password"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Current password is required",
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder="Current password"
                      />
                    </Form.Item>

                    <Form.Item
                      label="New password"
                      name="newPassword"
                      rules={[
                        { required: true },
                        { min: 6, message: "Min 6 characters" },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder="New password"
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      danger
                      size="large"
                      icon={<SaveOutlined />}
                      htmlType="submit"
                    >
                      Change password
                    </Button>
                  </Form>
                ),
              },
            ]}
          />
        </Card>
      </Content>
    </Layout>
  );
}

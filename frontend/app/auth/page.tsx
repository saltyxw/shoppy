"use client";

import { Card, Tabs, Form, Input, Button } from "antd";

export default function AuthBox() {
  const onLogin = (values: any) => {
    console.log("Login:", values);
  };

  const onRegister = (values: any) => {
    console.log("Register:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[500px] text-center " title="Welcome to Shoppy">
        <Tabs
          defaultActiveKey="login"
          items={[
            {
              key: "login",
              label: "Login",
              children: (
                <Form layout="vertical" onFinish={onLogin}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input placeholder="email@example.com" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form>
              ),
            },
            {
              key: "register",
              label: "Register",
              children: (
                <Form layout="vertical" onFinish={onRegister}>
                  <Form.Item
                    label="Full name"
                    name="fullname"
                    rules={[
                      { required: true, message: "Full name is required" },
                    ]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input placeholder="email@example.com" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                      { min: 6, message: "Min 6 characters" },
                    ]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

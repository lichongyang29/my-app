import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    console.log('Login:', values);
  };

  let navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">登录</h2>
        <Form form={form} onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input placeholder="用户名" className="rounded-md" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder="密码" className="rounded-md" />
          </Form.Item>
          <Form.Item>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
            <Button
              type="link"
              className="w-full text-center"
              onClick={() => {
                navigate('/register');
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

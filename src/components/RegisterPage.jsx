import React, { useState } from 'react';
import { Form, Input, Button, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  let navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState('');

  // 检测密码强度
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
  };

  // 根据密码强度返回进度条的颜色和文本
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return { color: 'red', label: '弱', percent: 33 };
      case 'medium':
        return { color: 'orange', label: '中', percent: 66 };
      case 'strong':
        return { color: 'green', label: '强', percent: 100 };
      default:
        return { color: '', label: '', percent: 0 };
    }
  };

  const strengthInfo = getStrengthColor();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">注册</h2>
        <Form onFinish={(values) => console.log('Register:', values)}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input placeholder="用户名" className="rounded-md" />
          </Form.Item>

          <Form.Item name="password">
            <Input.Password
              placeholder="请输入密码"
              onChange={handlePasswordChange}
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '请确认密码!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配!'));
                }
              })
            ]}
          >
            <Input.Password placeholder="确认密码" className="rounded-md" />
          </Form.Item>
          {/* 密码强度进度条 */}
          <div className="flex items-center mb-4">
            <Progress
              percent={strengthInfo.percent}
              showInfo={false}
              strokeColor={strengthInfo.color}
              className="w-2/3 mr-4"
            />
            <span className={`text-${strengthInfo.color}`}>{strengthInfo.label}</span>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              注册
            </Button>
            <Button
              type="lint"
              className="w-full text-center"
              onClick={() => {
                navigate('/');
              }}
            >
              去登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// 密码强度检测函数
const checkPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

  if (strength <= 2) return 'weak';
  if (strength === 3) return 'medium';
  if (strength >= 4) return 'strong';
};

export default RegisterPage;

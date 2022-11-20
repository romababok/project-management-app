import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useForm } from 'antd/es/form/Form';
import { authSignIn, authSignUp } from '../features/auth/auth-slice';
import { useAppDispatch } from '../app/hooks';
import { useLocation } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleFinish = async (values: { name: string; login: string; password: string }) => {
    if (location.pathname === '/login') {
      dispatch(authSignIn(values));
      navigate('/');
    } else {
      dispatch(authSignUp(values));
      navigate('/');
    }
  };

  return (
    <Content style={{ padding: '50px 50px', minHeight: '100vh' }}>
      <div className="site-layout-content">
        <Form
          form={form}
          name="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          autoComplete="off"
          onFinish={handleFinish}
          style={{ marginTop: '2rem' }}
        >
          {location.pathname === '/registration' && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 3, message: 'Name length should be more than 3' },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="login"
            label="Login"
            rules={[
              { required: true, message: 'Please input your login!' },
              { min: 3, message: 'Login length should be more than 3' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 3,
                message: 'Password length should be more than 3',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
          <Button onClick={() => navigate('../')} style={{ marginLeft: '2rem' }}>
            Cancel
          </Button>
        </Form>
      </div>
    </Content>
  );
};

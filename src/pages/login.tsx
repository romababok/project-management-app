import React, { useEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useForm } from 'antd/es/form/Form';
import { authSignIn, authSignUp } from '../features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';

export const LoginPage: React.FC = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
<<<<<<< Updated upstream
  const status = useAppSelector((state) => state.auth.status);
  const userId = useAppSelector((state) => state.auth.userData.id);

  useEffect(() => {
    if (userId) {
      navigate('/boards');
    }
  }, [navigate, userId]);
=======
  const isLoading = useAppSelector((state) => state.auth.status !== 'idle');
>>>>>>> Stashed changes

  const handleFinish = async (values: { name: string; login: string; password: string }) => {
    if (location.pathname === '/login') {
      await dispatch(authSignIn(values));
<<<<<<< Updated upstream
    } else {
      await dispatch(authSignUp(values));
      navigate('/login');
    }
  };

  if (status === 'loading') {
=======
      navigate('/');
    } else {
      await dispatch(authSignUp(values));
      navigate('/');
    }
  };

  if (isLoading) {
>>>>>>> Stashed changes
    return <PageLoadingIndicator />;
  }

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

import React, { useEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useForm } from 'antd/es/form/Form';
import { authSignIn, authSignUp } from '../features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';
import { useTranslation } from 'react-i18next';

export const LoginPage: React.FC = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const status = useAppSelector((state) => state.auth.status);

  const userId = useAppSelector((state) => state.auth.userData._id);
  const { t } = useTranslation();

  useEffect(() => {
    if (userId) {
      navigate('/boards');
    }
  }, [navigate, userId]);

  const handleFinish = async (values: { name: string; login: string; password: string }) => {
    if (location.pathname === '/login') {
      await dispatch(authSignIn(values));
      navigate('/boards');
    } else {
      dispatch(authSignUp(values));
      navigate('/login');
    }
  };

  if (status === 'loading') {
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
              label={t('Name')}
              rules={[
                { required: true, message: `${t('Validation of name')}` },
                { min: 3, message: `${t('Validation of name length')}` },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="login"
            label={t('Login')}
            rules={[
              { required: true, message: `${t('Validation of login')}` },
              { min: 3, message: `${t('Validation of login length')}` },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('Password')}
            rules={[
              { required: true, message: `${t('Validation of password')}` },
              {
                min: 3,
                message: `${t('Validation of password length')}`,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit">{t('Submit button')}</Button>
          <Button onClick={() => navigate('../')} style={{ marginLeft: '2rem' }}>
            {t('Cancel button')}
          </Button>
        </Form>
      </div>
    </Content>
  );
};

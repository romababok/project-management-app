import React, { useEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router';
import { useForm } from 'antd/es/form/Form';
import { authSignIn, authSignUp } from '../../features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useLocation } from 'react-router-dom';
import { PageLoadingIndicator } from '../../components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './login.scss';

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
    }
  };

  if (status === 'loading') {
    return <PageLoadingIndicator />;
  }

  return (
    <Content style={{ padding: '50px 50px', minHeight: '100vh' }}>
      <div className="container">
        <Row justify="center">
          <Col span={18}>
            <Form
              layout="vertical"
              form={form}
              autoComplete="off"
              name="login-form"
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
                    { max: 10, message: `${t('Validation of max length')}` },
                  ]}
                >
                  <Input
                    autoComplete="off"
                    placeholder={t('Input name') as string}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              )}
              <Form.Item
                name="login"
                label={t('Login')}
                rules={[
                  { required: true, message: `${t('Validation of login')}` },
                  { min: 3, message: `${t('Validation of login length')}` },
                  { max: 10, message: `${t('Validation of max length')}` },
                ]}
              >
                <Input
                  autoComplete="off"
                  placeholder={t('Input login') as string}
                  prefix={<UserOutlined />}
                  maxLength={11}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('Password')}
                rules={[
                  { required: true, message: `${t('Validation of password')}` },
                  {
                    min: 4,
                    message: `${t('Validation of password length')}`,
                  },
                  { max: 10, message: `${t('Validation of max length')}` },
                ]}
              >
                <Input.Password
                  autoComplete="off"
                  placeholder={t('Input password') as string}
                  prefix={<LockOutlined />}
                  maxLength={11}
                />
              </Form.Item>
              <Button style={{ width: '60%' }} type="primary" htmlType="submit">
                {t('Submit button')}
              </Button>
              {location.pathname === '/login' ? (
                <p className="message">
                  {t('Not registered')}
                  <Link to="/registration"> {t('Header sign up link')}</Link>
                </p>
              ) : (
                <p className="message">
                  {t('Registered')} <Link to="/login">{t('Header login link')}</Link>
                </p>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

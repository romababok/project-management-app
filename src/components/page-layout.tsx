import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from 'antd/lib/layout/layout';
import { useAppSelector } from '../app/hooks';
import { UserOutlined } from '@ant-design/icons';

export const PageLayout: React.FC = () => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.userData?.token);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Welcome</Link>
          </Menu.Item>
          {token && (
            <Menu.Item key="/boards">
              <Link to="/boards">Boards</Link>
            </Menu.Item>
          )}

          {!token ? (
            <>
              <Menu.Item style={{ marginLeft: 'auto' }} key="/login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/registration">
                <Link to="/registration">Sing Up</Link>
              </Menu.Item>
            </>
          ) : (
            <Menu.SubMenu
              key="/user"
              title={<UserOutlined style={{ fontSize: '16px' }} />}
              style={{ marginLeft: 'auto' }}
            >
              <Menu.Item style={{ marginLeft: 'auto' }} key="/profile">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="/logout">
                <Link to="/welcome">Logout</Link>
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu>
      </Header>
      <Outlet />
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

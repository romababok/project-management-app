import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterOfApp from './footer/footer';
import HeaderOfApp from './header/header';

export const PageLayout: React.FC = () => {
<<<<<<< Updated upstream
  return (
    <Layout style={{ minHeight: '100vh' }} className="layout">
      <HeaderOfApp />
=======
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userData._id);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Welcome</Link>
          </Menu.Item>
          {userId && (
            <Menu.Item key="/boards">
              <Link to="/boards">Boards</Link>
            </Menu.Item>
          )}

          {!userId ? (
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
                <Link to="/">Logout</Link>
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu>
      </Header>
>>>>>>> Stashed changes
      <Outlet />
      <FooterOfApp />
    </Layout>
  );
};

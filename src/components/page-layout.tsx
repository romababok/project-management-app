import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/lib/layout/layout";

const NAV_ITEMS: { label: string; link: string }[] = [
  { label: "Welcome", link: "/" },
  { label: "Boards", link: "/boards" },
  { label: "Login", link: "/login" },
];

export const PageLayout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            {NAV_ITEMS.map((item) => (
              <Menu.Item key={item.link}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Outlet />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

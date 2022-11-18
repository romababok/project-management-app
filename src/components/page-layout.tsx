import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import FooterOfApp from "./footer/footer";
import HeaderOfApp from "./header/header";

export const PageLayout: React.FC = () => {

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout">
      <HeaderOfApp/>
      <Outlet />
      <FooterOfApp/>
    </Layout>
  );
};

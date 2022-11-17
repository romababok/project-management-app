import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import FooterOfApp from "./Footer/Footer";
import HeaderOfApp from "./Header/Header";

export const PageLayout: React.FC = () => {

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout">
      <HeaderOfApp/>
      <Outlet />
      <FooterOfApp/>
    </Layout>
  );
};

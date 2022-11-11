import React from "react";
import { Content } from "antd/lib/layout/layout";

export const UserPage: React.FC = () => {
  return (
    <Content style={{ padding: "0 50px", minHeight: "70vh" }}>
      <div className="site-layout-content">
        Content here <h1>UserPage</h1>
      </div>
    </Content>
  );
};

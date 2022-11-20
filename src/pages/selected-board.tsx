import React from "react";
import { Content } from "antd/lib/layout/layout";
import ColumnsList from "../components/columns-list/columns-list";

export const SelectedBoardPage: React.FC = () => {
  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh' }}>
      <div className="site-layout-content">
        <ColumnsList />
      </div>
    </Content>
  );
};

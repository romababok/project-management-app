import React from "react";
import { Content } from "antd/lib/layout/layout";
import { useParams } from "react-router";
import ColumnsList from "../components/columns-list/columns-list";

export const SelectedBoardPage: React.FC = () => {
  const { boardId } = useParams();

  return (
    <Content style={{ padding: "0 50px", minHeight: "70vh" }}>
      <div className="site-layout-content">
        <ColumnsList board = {boardId}/>
      </div>
    </Content>
  );
};

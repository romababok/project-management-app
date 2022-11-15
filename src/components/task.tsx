import React, { FC } from "react";
import { Content } from "antd/lib/layout/layout";

const Task: FC = () => {
  return (
    <Content>
      <div style={{ padding: "0 50px", height: 20, backgroundColor: "#fff", borderRadius: 5}}>
        Task
      </div>
    </Content>
  )
};

export default Task;
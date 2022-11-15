import React, { FC } from "react";
import { Content } from "antd/lib/layout/layout";
import './task.styles.scss';

const Task: FC = () => {
  return (
    <Content>
      <div className="task">
        Task
      </div>
    </Content>
  )
};

export default Task;
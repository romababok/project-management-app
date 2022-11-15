import React, { FC, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Card, Col, Modal, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Task from "../task/task";
import './task-list.styles.scss';

const TasksList: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateOk = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <Content>
      <div className="task-list">
          <Task />
          <Task />
          <Task />
          <Button icon={<PlusOutlined />} onClick={showCreateModal}>Add Task</Button>
          <Modal title="Create Task" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
          </Modal>
      </div>
    </Content>
  )
};

export default TasksList;
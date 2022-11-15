import React, { FC, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Card, Col, Modal, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Task from "./task";

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
      <div>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Task />
            <Task />
            <Task />
          </Row> 
          <Button icon={<PlusOutlined />} onClick={showCreateModal}>Add Task</Button>
          <Modal title="Create Task" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>

          </Modal>
        </Col>
      </div>
    </Content>
  )
};

export default TasksList;
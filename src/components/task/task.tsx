import React, { useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import './task.styles.scss';
import { Button, Modal, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { tasksDelete, tasksUpdate } from '../../features/task-list/task-list-slice';
import { useParams } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';

interface TaskProps {
  title: string;
  desc: string;
  columnId: string;
  taskId: string;
  order: number;
}

const Task: React.FC<TaskProps> = ({ title, desc, columnId, taskId, order }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, seTaskDesc] = useState(desc);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        tasksUpdate({
          boardId: boardId,
          columnId: columnId,
          taskId: taskId,
          request: {
            title: taskTitle,
            order: order,
            description: taskDesc,
            userId: 0,
            columnId: columnId,
            users: [],
          },
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteOk = () => {
    if (boardId) {
      dispatch(tasksDelete({ boardId: boardId, columnId: columnId, taskId: taskId }));
    }
  };

  return (
    <Content>
      <div className="task" onClick={showModal}>
        {title}
        <Popconfirm
          placement="bottomRight"
          title="Are you sure you want to delete this task?"
          onConfirm={handleDeleteOk}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
      <Modal title="View Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>Title</h2>
        <Paragraph editable={{ onChange: setTaskTitle }}>{taskTitle}</Paragraph>
        <h2>Description</h2>
        <Paragraph editable={{ onChange: seTaskDesc }}>{taskDesc}</Paragraph>
      </Modal>
    </Content>
  );
};

export default Task;

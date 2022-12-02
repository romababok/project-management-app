import React, { MouseEventHandler, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import './task.styles.scss';
import { Button, Modal, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { tasksDelete, tasksUpdate } from '../../features/task-list/task-list-slice';
import { useParams } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  const showModal: MouseEventHandler = (e) => {
    if (e.target instanceof HTMLDivElement) {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        tasksUpdate({
          boardId,
          columnId,
          taskId,
          request: {
            title: taskTitle,
            order,
            description: taskDesc,
            userId: 0,
            columnId,
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
      dispatch(tasksDelete({ boardId, columnId, taskId }));
    }
  };

  return (
    <Content>
      <div className="task" onClick={showModal}>
        <span>{title}</span>
        <Popconfirm
          placement="bottomRight"
          title={t('Popconfirm task')}
          onConfirm={handleDeleteOk}
          okText={t('Popconfirm okText')}
          cancelText={t('Popconfirm cancelText')}
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
      <Modal
        title={
          <Title level={3} ellipsis={true} editable={{ onChange: setTaskTitle, maxLength: 30 }}>
            {taskTitle}
          </Title>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('Cancel button')}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <h4>{t('Description')}:</h4>
        <Paragraph ellipsis={{ rows: 2 }} editable={{ onChange: seTaskDesc, maxLength: 150 }}>
          {taskDesc}
        </Paragraph>
      </Modal>
    </Content>
  );
};

export default Task;

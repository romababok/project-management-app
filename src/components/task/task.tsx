import React, { FC } from 'react';
import { Content } from 'antd/lib/layout/layout';
import './task.styles.scss';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { tasksDelete } from '../../features/task-list/task-list-slice';
import { useParams } from 'react-router-dom';

type TaskProps = {
  title: string;
  desc: string;
  columnId: string;
  id: string;
};

const Task: FC<TaskProps> = ({ title, desc, columnId, id }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const handleDeleteOk = () => {
    if (boardId) {
      dispatch(tasksDelete({ boardId: boardId, columnId: columnId, taskId: id }));
    }
  };

  return (
    <Content>
      <div className="task">
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
    </Content>
  );
};

export default Task;

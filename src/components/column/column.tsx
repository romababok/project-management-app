import React, { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { columnsDelete } from '../../features/columns/columns-slice';
import './column.styles.scss';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import TasksList from '../task-list/tasks-list';

type ColumnProps = {
  id: string;
  title: string;
};

const Column: FC<ColumnProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const handleDeleteOk = () => {
    if (boardId) {
      dispatch(columnsDelete({ boardId: boardId, columnId: id }));
    }
  };

  return (
    <Content className="column">
      {title}
      <Popconfirm
        placement="bottomRight"
        title="Are you sure you want to delete this column?"
        onConfirm={handleDeleteOk}
        okText="Yes"
        cancelText="No"
      >
        <Button type="text" danger icon={<DeleteOutlined />} />
      </Popconfirm>
      <TasksList columnId={id} />
    </Content>
  );
};

export default Column;

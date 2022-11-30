import React, { ChangeEventHandler, useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { columnsDelete, columnsUpdate } from '../../features/columns/columns-slice';
import './column.styles.scss';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import TasksList from '../task-list/tasks-list';

interface ColumnProps {
  columnId: string;
  title: string;
  order: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, title, order }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const [columnTitle, setColumnTitle] = useState(title);

  const handleDeleteOk = () => {
    if (boardId) {
      dispatch(columnsDelete({ boardId: boardId, columnId: columnId }));
    }
  };

  const handleUpdateOk = () => {
    setEditMode(false);
    if (boardId) {
      dispatch(
        columnsUpdate({
          boardId: boardId,
          columnId: columnId,
          request: {
            title: columnTitle,
            order: order,
          },
        })
      );
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setColumnTitle(event.target.value);
  };

  const handleUpdateCancel = () => {
    setEditMode(false);
    setColumnTitle(title);
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <Content className="column">
      <div>
        {editMode ? (
          <div className="column-info">
            <Input value={columnTitle} onChange={handleChange} />
            <Button onClick={handleUpdateOk} type="text" icon={<CheckOutlined />} />
            <Button onClick={handleUpdateCancel} type="text" icon={<CloseOutlined />} />
          </div>
        ) : (
          <div className="column-info">
            <p onClick={() => setEditMode(true)}>{columnTitle}</p>
            <Popconfirm
              placement="bottomRight"
              title="Are you sure you want to delete this column?"
              onConfirm={handleDeleteOk}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        )}
      </div>
      <TasksList columnId={columnId} />
    </Content>
  );
};

export default Column;

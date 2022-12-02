import React, { ChangeEventHandler, useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { columnsDelete, columnsUpdate } from '../../features/columns/columns-slice';
import styles from './column.module.scss';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import TasksList from '../task-list/tasks-list';
import { useTranslation } from 'react-i18next';

interface ColumnProps {
  columnId: string;
  title: string;
  order: number;
}

const Column: React.FC<ColumnProps> = ({ columnId, title, order }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const [columnTitle, setColumnTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);

  const { t } = useTranslation();

  const handleDeleteOk = () => {
    if (boardId) {
      dispatch(columnsDelete({ boardId, columnId }));
    }
  };

  const handleUpdateOk = () => {
    setEditMode(false);
    if (boardId) {
      dispatch(
        columnsUpdate({
          boardId,
          columnId,
          request: {
            title: columnTitle,
            order,
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

  return (
    <Content className={styles.column}>
      <div>
        {editMode ? (
          <div className={styles.columninfo}>
            <Input value={columnTitle} onChange={handleChange} maxLength={30} />
            <Button
              onClick={handleUpdateOk}
              type="text"
              icon={<CheckOutlined style={{ color: '#52c41a' }} />}
            />
            <Button onClick={handleUpdateCancel} danger type="text" icon={<CloseOutlined />} />
          </div>
        ) : (
          <div className={styles.columninfo}>
            <h3 onClick={() => setEditMode(true)}>{columnTitle}</h3>
            <Popconfirm
              placement="bottomRight"
              title={t('Popconfirm column')}
              onConfirm={handleDeleteOk}
              okText={t('Popconfirm okText')}
              cancelText={t('Popconfirm cancelText')}
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

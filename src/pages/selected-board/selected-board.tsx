import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, List } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { columnsGetAll, selectColumns, columnsCreate } from '../../features/columns/columns-slice';
import Column from '../../components/column/column';
import styles from './selected-board.module.scss';

export const SelectedBoardPage: React.FC = () => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<{ title: string }>();
  const columnTitle = Form.useWatch('title', form);

  useEffect(() => {
    if (boardId) {
      dispatch(columnsGetAll(boardId ?? ''));
    }
    // clear all columns and tasks when exiting Board page
    return () => {
      dispatch({ type: 'tasks/resetTasks' });
      dispatch({ type: 'columns/resetColumns' });
    };
  }, []);

  const columns = useAppSelector(selectColumns);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        columnsCreate({
          boardId: boardId,
          request: { title: columnTitle || 'New Column', order: 1 },
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh' }}>
      <h1>Board Title</h1>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add Column
      </Button>
      <List
        className={styles.boardList}
        dataSource={columns}
        renderItem={(column) => (
          <List.Item>
            <Column title={column.title} columnId={column._id}></Column>
          </List.Item>
        )}
      ></List>
      <Modal title="Add Column" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
<<<<<<< Updated upstream
import { Button, Popconfirm } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createBoard, deleteBoard, getAllBoards } from '../features/boards/boards-slice';
import { useState } from 'react';
import { Card, Form, Input, List, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
=======
import { Button, Card, Form, Input, List, Modal, Row } from 'antd';
import { createBoard, getAllBoards } from '../features/boards/boards-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useForm } from 'antd/es/form/Form';
import { PlusOutlined } from '@ant-design/icons';
>>>>>>> Stashed changes
import { Link } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';

interface FormFields {
  title: string;
  owner: string;
  users: string[];
}

export const BoardsListPage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.boards.status !== 'idle');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = useForm<FormFields>();

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

<<<<<<< Updated upstream
  const onFinish = async (values: FormFields) => {
    dispatch(createBoard({ ...values }));
    setIsModalOpen(false);
=======
  const onFinish = (values: FormFields) => {
    dispatch(createBoard({ ...values }));
    setIsModalOpen(false);
    dispatch(getAllBoards());
>>>>>>> Stashed changes
  };

  if (isLoading) {
    return <PageLoadingIndicator />;
  }
<<<<<<< Updated upstream
  const handleDeleteOk = async (boardId: string) => {
    if (boardId) {
      dispatch(deleteBoard(boardId));
      await dispatch(getAllBoards());
    }
  };
=======

>>>>>>> Stashed changes
  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh', marginTop: '2rem' }}>
      <PageHeader
        extra={[
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Board
          </Button>,
        ]}
      ></PageHeader>

      <div className="site-layout-content">
        <List
          grid={{
            gutter: 18,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={boards}
          renderItem={(board) => (
            <List.Item>
<<<<<<< Updated upstream
              {board._id && (
                <Card
                  title={<Link to={board._id}>{board.title}</Link>}
                  bodyStyle={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                  actions={[
                    <>
                      <Popconfirm
                        placement="bottomRight"
                        title="Are you sure you want to delete this board?"
                        onConfirm={() => handleDeleteOk(board._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </>,
                  ]}
                ></Card>
=======
              {board._id ? (
                <Card
                  title={<Link to={board._id}>{board.title}</Link>}
                  bodyStyle={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {board._id ?? (
                    <Row justify="center">
                      <PlusOutlined className="plus_icon" onClick={() => setIsModalOpen(true)} />
                    </Row>
                  )}
                </Card>
              ) : (
                <Button
                  type="ghost"
                  icon={<PlusOutlined style={{ fontSize: '2.2rem', color: '#1990ff' }} />}
                  onClick={() => setIsModalOpen(true)}
                  shape="circle"
                  style={{ height: '70px', width: '70px' }}
                />
>>>>>>> Stashed changes
              )}
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Create a new board"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button type="primary" key="create" htmlType="submit" form="create-board">
            Create
          </Button>,
        ]}
      >
        <Form name="create-board" form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
          <Form.Item name="title" label="Title" required>
            <Input />
          </Form.Item>
          <Form.Item name="owner" label="Owner" required>
            <Input />
          </Form.Item>
          <Form.Item name="users" label="Users" required>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

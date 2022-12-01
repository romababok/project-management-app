import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Popconfirm, Select } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createBoard, deleteBoard, getAllBoards } from '../features/boards/boards-slice';
import { Card, Form, Input, List, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';
import { useTranslation } from 'react-i18next';

interface FormFields {
  title: string;
  users: string[];
}

interface User {
  _id: string;
  name: string;
  login: string;
}

export const BoardsListPage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const users = useAppSelector((state) => state.auth.users);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.boards.status);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = useForm<FormFields>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { t } = useTranslation();
  const OPTIONS = users;
  const filteredOptions = OPTIONS.filter((o: User) => !selectedItems.includes(o.login));
  const userId = useAppSelector((state) => state.auth.userData._id);

  useEffect(() => {
    if (userId) {
      dispatch(getAllBoards(userId));
    }
  }, [dispatch, userId]);

  const onFinish = (values: FormFields) => {
    dispatch(createBoard(values));
    setIsModalOpen(false);
    form.resetFields();
  };

  if (isLoading === 'loading') {
    return <PageLoadingIndicator />;
  }
  const handleDeleteOk = async (boardId: string) => {
    if (boardId) {
      await dispatch(deleteBoard(boardId));
      dispatch(getAllBoards(userId));
    }
  };

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
            {t('Add board')}
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
          <Form.Item
            name="title"
            label={t('Title')}
            rules={[
              { required: true, message: 'Please input your board name!' },
              { min: 2, message: `${t('Form rules')}` },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="users" label={'users'}>
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: '100%' }}
              options={filteredOptions.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

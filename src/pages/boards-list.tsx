import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Popconfirm } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteBoard, getAllBoards, getBoardById } from '../features/boards/boards-slice';
import { Card, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';
import { useTranslation } from 'react-i18next';
import { ModalCreateBoard, ModalUpdateBoard } from '../components/modals/modals';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export const BoardsListPage: React.FC = () => {
  const { boards, status } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.auth.userData._id);
  const onSearch = (value: string) => setValue(value);
  const [value, setValue] = useState<string>('');
  const filteredBoards = boards.filter((board) => {
    return board.title.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    if (userId) {
      dispatch(getAllBoards(userId));
    }
  }, [dispatch, userId]);

  if (status === 'loading') {
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
      <ModalCreateBoard
        key="create-board"
        isModalOpen={isModalCreateOpen}
        setIsModalOpen={setIsModalCreateOpen}
      />

      <div style={{ height: '10px' }}>
        <ModalUpdateBoard
          key="update-board"
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
        />
      </div>
      <PageHeader
        style={{ padding: '24px' }}
        extra={[
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalCreateOpen(true)}
          >
            {t('Add board')}
          </Button>,
          <Input
            key="2"
            placeholder={t('Input search text') as string}
            onChange={(e) => onSearch(e.target.value)}
            style={{ width: 200 }}
          />,
        ]}
      ></PageHeader>

      <div className="site-layout-content">
        <List
          grid={{
            gutter: 18,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 3,
            xl: 4,
            xxl: 3,
          }}
          dataSource={filteredBoards}
          renderItem={(board) => (
            <List.Item>
              {board._id && (
                <Card
                  title={<Link to={board._id}>{board.title}</Link>}
                  bodyStyle={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={async () => {
                        await dispatch(getBoardById(board._id));
                        setIsModalUpdateOpen(true);
                      }}
                    />,
                    <Popconfirm
                      key="delete"
                      placement="bottomRight"
                      title="Are you sure you want to delete this board?"
                      onConfirm={() => handleDeleteOk(board._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                  ]}
                ></Card>
              )}
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};

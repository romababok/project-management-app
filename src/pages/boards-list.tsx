import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Popconfirm } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteBoard, getAllBoards } from '../features/boards/boards-slice';
import { Card, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PageLoadingIndicator } from '../components';
import { useTranslation } from 'react-i18next';
import { ModalCreateBoard } from '../components/modal/modal';

export const BoardsListPage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boards);

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.boards.status);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const userId = useAppSelector((state) => state.auth.userData._id);

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
                        title={t('Popconfirm board')}
                        onConfirm={() => handleDeleteOk(board._id)}
                        okText={t('Popconfirm okText')}
                        cancelText={t('Popconfirm cancelText')}
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
      <ModalCreateBoard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Content>
  );
};

import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import styles from './profile.module.scss';
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
  notification,
  Popconfirm,
  Skeleton,
  Typography,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm } from 'antd/lib/form/Form';
import { DeleteOutlined, EditOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { EditModal } from './edit-window';
import { deleteUser, updateUser } from '../../features/auth/auth-slice';
import { User } from '../../api/users';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TaskItem } from '../../Interfaces';
import { getUserTasks } from '../../api/tasks';
import i18next from 'i18next';

const { Text, Paragraph, Title } = Typography;

export const ProfilePage: React.FC = () => {
  const { userData, status } = useAppSelector((state) => state.auth);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const { t } = useTranslation();
  const [data, setData] = useState<TaskItem[]>([]);
  const [filtredTasks, setFiltredTasks] = useState<TaskItem[]>(data);
  const [value, setValue] = useState<string>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (request: User) => {
    const userId = userData._id;
    dispatch(updateUser({ userId, request }));
    setIsModalOpen(false);
    form.resetFields();
  };

  const confirm = () => {
    dispatch(deleteUser(userData._id));
    navigate('/');
  };
  const loadData = async () => {
    try {
      if (userId) {
        const response = await getUserTasks(userId);
        setData(response.data);
        setFiltredTasks(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: i18next.t('Request failed message') + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filterTasks = (value: string) => {
    if (value.length >= 1) {
      const newTasks = [...data].filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFiltredTasks(newTasks);
    } else {
      setFiltredTasks(data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    filterTasks(e.target.value);
  };

  return (
    <Content className={styles.profile__page}>
      {status === 'loading' ? (
        <Skeleton className={styles.skeleton} avatar paragraph={{ rows: 6 }} active />
      ) : (
        <div className={styles.profile__container}>
          <Avatar className={styles.profile__avatar} size={64} icon={<UserOutlined />}>
            {userData?.name.slice(0, 1).toUpperCase()}
          </Avatar>
          <Divider />
          <div className={styles.profile__window}>
            <div className={styles.name__block}>
              <Text strong className={styles.name__title}>
                {t('Name')}
              </Text>
              <Text className={styles.name__text}>
                {userData._id && userData.name.slice(0, 1).toUpperCase() + userData.name.slice(1)}
              </Text>
            </div>
            <div className={styles.login__block}>
              <Text strong className={styles.login__title}>
                {t('Login')}
              </Text>
              <Text className={styles.name__text}>{userData._id && userData.login}</Text>
            </div>
            <div className={styles.userid__block}>
              <Text strong className={styles.userid__title}>
                {t('UserId')}
              </Text>
              <Text className={styles.userid__text}>{userData._id && userData._id}</Text>
            </div>
          </div>
          <div className={styles.profile__buttons}>
            <Button
              icon={<EditOutlined />}
              type="primary"
              className={styles.edit__button}
              onClick={showModal}
            >
              {t('Edit button')}
            </Button>
            <Popconfirm
              placement="bottom"
              title={t('Popconfirm account')}
              onConfirm={confirm}
              okText={t('Popconfirm okText')}
              cancelText={t('Popconfirm cancelText')}
            >
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                ghost
                className={styles.delete__button}
              >
                {t('Delete account button')}
              </Button>
            </Popconfirm>
          </div>
        </div>
      )}
      {data.length < 1 ? (
        <Skeleton className={styles.skeleton__tasks} active paragraph={{ rows: 6 }} />
      ) : (
        <div className={styles.tasks}>
          <Title level={4}>{t('My tasks')}</Title>
          <List
            footer={<Divider plain>It is all, nothing more 🤐</Divider>}
            header={<Input value={value} onChange={handleInputChange} maxLength={10} />}
            className={styles.tasks__list}
            bordered
            dataSource={filtredTasks}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<PaperClipOutlined className={styles.tasks__icon} />}
                  title={<Paragraph ellipsis={true}>{item.title}</Paragraph>}
                  description={<Paragraph ellipsis={true}>{item.description}</Paragraph>}
                />
                <Button
                  className={styles.tasks__button}
                  onClick={() => navigate(`/boards/${item.boardId}`)}
                >
                  {t('Go')}
                </Button>
              </List.Item>
            )}
          />
        </div>
      )}
      <EditModal
        form={form}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </Content>
  );
};

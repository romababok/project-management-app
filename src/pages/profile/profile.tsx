import React, { useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import styles from './profile.module.scss';
import { Avatar, Button, Divider, Popconfirm, Skeleton, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm } from 'antd/lib/form/Form';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { EditModal } from './edit-window';
import { deleteUser, updateUser } from '../../features/auth/auth-slice';
import { User } from '../../api/users';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export const ProfilePage: React.FC = () => {
  const { userData, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const { t } = useTranslation();

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
                {t('Edit profile name')}
              </Text>
              <Text className={styles.name__text}>
                {userData._id && userData.name.slice(0, 1).toUpperCase() + userData.name.slice(1)}
              </Text>
            </div>
            <div className={styles.login__block}>
              <Text strong className={styles.login__title}>
                {t('Edit profile login')}
              </Text>
              <Text className={styles.name__text}>{userData._id && userData.login}</Text>
            </div>
            <div className={styles.userid__block}>
              <Text strong className={styles.userid__title}>
                {t('Edit profile userId')}
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
              {t('Edit profile edit button')}
            </Button>
            <Popconfirm
              placement="bottom"
              title="Are you shure to delete acount?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                ghost
                className={styles.delete__button}
              >
                {t('Edit profile delete account button')}
              </Button>
            </Popconfirm>
          </div>
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

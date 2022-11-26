import React, { FC } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { User } from '../../api';
import styles from './profile.module.scss';
import { useTranslation } from 'react-i18next';

type EditModalProps = {
  handleSubmit: (request: User) => void;
  form: FormInstance;
  isModalOpen: boolean;
  handleCancel: () => void;
};

export const EditModal: FC<EditModalProps> = ({
  form,
  handleSubmit,
  isModalOpen,
  handleCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      className={styles.edit__window}
      title={t('Edit profile modal window')}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        form={form}
        name="update-user-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={handleSubmit}
        className={styles.window__form}
      >
        <Form.Item
          name="name"
          label={t('Edit profile name')}
          rules={[
            { required: true, message: 'Please input your new name!' },
            { min: 3, message: 'Name length should be more than 3' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="login"
          label={t('Edit profile login')}
          rules={[
            { required: true, message: 'Please input your new login!' },
            { min: 3, message: 'Login length should be more than 3' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('Edit profile password')}
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              min: 3,
              message: 'Password length should be more than 3',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button className={styles.submit__button} htmlType="submit" type="primary">
          {t('Edit profile submit button')}
        </Button>
      </Form>
    </Modal>
  );
};

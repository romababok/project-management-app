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
        layout="vertical"
        labelCol={{ xs: 10, sm: 6, md: 6, lg: 6 }}
        onFinish={handleSubmit}
        className={styles.window__form}
      >
        <Form.Item
          name="name"
          label={t('Name')}
          rules={[
            { required: true, message: `${t('Validation of name')}` },
            { min: 3, message: `${t('Validation of name length')}` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="login"
          label={t('Login')}
          rules={[
            { required: true, message: `${t('Validation of login')}` },
            { min: 3, message: `${t('Validation of login length')}` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('Password')}
          rules={[
            { required: true, message: `${t('Validation of password')}` },
            {
              min: 3,
              message: `${t('Validation of password length')}`,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button className={styles.submit__button} htmlType="submit" type="primary">
          {t('Submit button')}
        </Button>
      </Form>
    </Modal>
  );
};

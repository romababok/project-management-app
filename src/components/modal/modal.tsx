import { Button, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import i18next, { t } from 'i18next';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBoard } from '../../features/boards/boards-slice';

interface FormFields {
  title: string;
  users: string[];
}
interface User {
  _id: string;
  name: string;
  login: string;
}
interface ModalCreateBoardProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ModalCreateBoard = ({ isModalOpen, setIsModalOpen }: ModalCreateBoardProps) => {
  const [form] = useForm<FormFields>();
  const users = useAppSelector((state) => state.auth.users);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const OPTIONS = users;
  const filteredOptions = OPTIONS.filter((o: User) => !selectedItems.includes(o.login));
  const dispatch = useAppDispatch();

  const onFinish = (values: FormFields) => {
    dispatch(createBoard(values));
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={t('Create a new board')}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          {t('Cancel button')}
        </Button>,
        <Button type="primary" key="create" htmlType="submit" form="create-board">
          {t('Create button')}
        </Button>,
      ]}
    >
      <Form
        name="create-board"
        form={form}
        layout="vertical"
        labelCol={{ xs: 10, sm: 6, md: 6, lg: 6 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label={t('Title')}
          rules={[
            { required: true, message: `${i18next.t('Validation of board')}` },
            { min: 2, message: `${t('Validation of board name length')}` },
            { max: 30, message: `${t('Validation of max length 30')}` },
          ]}
        >
          <Input maxLength={31} />
        </Form.Item>
        <Form.Item name="users" label={t('Users')}>
          <Select
            mode="multiple"
            placeholder={t('Select users')}
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
  );
};

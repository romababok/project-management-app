import { Button, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBoard, updateBoardById } from '../../features/boards/boards-slice';

export interface FormFields {
  title: string;
  users: string[];
}
interface User {
  _id: string;
  name: string;
  login: string;
}
interface ModalBoardProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ModalCreateBoard = ({ isModalOpen, setIsModalOpen }: ModalBoardProps) => {
  const [form] = useForm<FormFields>();
  const users = useAppSelector((state) => state.auth.users);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const OPTIONS = users;
  const filteredOptions = OPTIONS.filter((o: User) => !selectedItems.includes(o.login));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
      <Form name="create-board" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label={t('Title')}
          rules={[
            { required: true, message: `${t('Validation of board name')}` },
            { min: 2, message: `${t('Form rules')}` },
          ]}
        >
          <Input placeholder={t('Placeholder name') as string} />
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

export const ModalUpdateBoard = ({ isModalOpen, setIsModalOpen }: ModalBoardProps) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const board = useAppSelector((state) => state.boards.board);
  const { t } = useTranslation();

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: { title: string }) => {
    const { title } = values;
    dispatch(
      updateBoardById({
        title,
        users: board.users,
        boardId: board._id,
        owner: board.owner,
      })
    );

    closeModal();
  };

  return (
    <Modal
      title={t('Edit board')}
      open={isModalOpen}
      onCancel={() => {
        closeModal();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            closeModal();
          }}
        >
          {t('Cancel button')}
        </Button>,
        <Button type="primary" key="create" htmlType="submit" form="update-board">
          {t('Edit button')}
        </Button>,
      ]}
    >
      <Form name="update-board" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label={t('Title')}
          rules={[
            { required: true, message: `${t('Validation of board')}` },
            { min: 2, message: `${t('Validation of board name length')}` },
          ]}
        >
          <Input placeholder={t('Placeholder name') as string} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

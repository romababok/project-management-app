import React, { FC, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Modal } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import TasksList from "./tasks-list";
import { useAppDispatch } from "../app/hooks";
import { columnsDelete } from "../features/columns/columns-slice";

type ColumnProps = {
  board: string,
  id: string,
  title: string,
}

const Column: FC<ColumnProps> = ({ board, id, title }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    dispatch(columnsDelete({boardId: board, columnId: id}))
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <Content style={{ padding: "0 50px", minHeight: "70vh", backgroundColor: "#ccc", borderRadius: 3}}>
      <div>
        {title}
        <Button type="text" danger icon={<DeleteOutlined />}onClick={showDeleteModal} />
        <TasksList />
        <Modal title="Delete Column" open={isDeleteModalOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Are you sure you want to delete this column?</p>
        </Modal>
      </div>
    </Content>
  )
};

export default Column;
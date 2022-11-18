import React, { FC, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import './task.styles.scss';
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../app/hooks";
import { tasksDelete } from "../../features/task-list/task-list-slice";

type TaskProps = {
  title: string;
  desc: string;
  board: string;
  columnId: string;
  id: string;
}

const Task: FC<TaskProps> = ({ title, desc, board, columnId, id }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    dispatch(tasksDelete({boardId: board, columnId: columnId, taskId: id}));
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <Content>
      <div className="task">
        {title}
        <Button type="text" icon={<DeleteOutlined />} onClick={showDeleteModal} />
        <Modal title="Delete Column" open={isDeleteModalOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <p>Are you sure you want to delete this column?</p>
        </Modal>
      </div>
    </Content>
  )
};

export default Task;
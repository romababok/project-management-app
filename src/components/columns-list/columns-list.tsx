import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Column from "../column/column";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  columnsCreate,
  columnsGetAll,
  selectColumns,
} from "../../features/columns/columns-slice";
import "./columns-list.styles.scss";
import { useParams } from "react-router-dom";

const ColumnsList: FC = () => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<{ title: string }>();
  const columnTitle = Form.useWatch('title', form);

  useEffect(() => {
    dispatch({ type: "tasks/resetTasks" });
    if (boardId) {
      dispatch(columnsGetAll(boardId));
    }
  }, []);

  const columns = useAppSelector(selectColumns);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        columnsCreate({
          boardId: boardId,
          request: { title: columnTitle || "New Column", order: 1 },
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="columns-container">
      {columns?.map((column) => {
          return (
            <Column
              key={column._id}
              title={column.title}
              id={column._id}
            />
          );
        })}
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add Column
      </Button>
      <Modal
        title="Add Column"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ColumnsList;

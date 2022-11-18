import React, { FC, useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Column from "../column/column";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  columnsCreate,
  columnsGetAll,
  selectColumns,
} from "../../features/columns/columns-slice";
import "./columns-list.styles.scss";

type ColumnsListProps = {
  board: string | undefined;
};

const ColumnsList: FC<ColumnsListProps> = ({ board }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "tasks/resetTasks" });
    dispatch(columnsGetAll(board ?? ""));
  }, []);

  const columns = useAppSelector(selectColumns);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(
      columnsCreate({
        boardId: board ?? "",
        request: { title: newColumnTitle || "New Column", order: 1 },
      })
    );
    setNewColumnTitle("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="columns-container">
      {columns &&
        columns.map((column) => {
          return (
            <Column
              key={column._id}
              title={column.title}
              id={column._id}
              board={board ?? ""}
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
        <form>
          <Input
            placeholder="Add title"
            defaultValue="New Column"
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
};

export default ColumnsList;

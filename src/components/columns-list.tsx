import React, { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Input, Modal, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Column from "./column";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { columnsCreate, columnsGetAll, selectColumns } from "../features/columns/columns-slice";

type ColumnsListProps = {
  board: string | undefined;
}

const ColumnsList: FC<ColumnsListProps> = ({ board }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(columnsGetAll(board ?? ''))
  }, []);

  const columns = useAppSelector(selectColumns);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(columnsCreate({boardId: board ?? '', request: {title: newColumnTitle, order: 1}}));
    setNewColumnTitle('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Content style={{ padding: "0 50px", minHeight: "70vh" }}>
      <div>
        <Row gutter={[24, 24]}>
          {columns.map((column) => {
            return <Column title={column.title} id={column._id} board={board ?? ''}/>
          })}
        </Row>
        <Button icon={<PlusOutlined />} onClick={showModal}>Add Column</Button>
        <Modal title="Add Column" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form>
            <Input placeholder="Add title" defaultValue="New Column" onChange={(e) => setNewColumnTitle(e.target.value)}/>
          </form>
        </Modal>
      </div>
    </Content>
  )
};

export default ColumnsList;
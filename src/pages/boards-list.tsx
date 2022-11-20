import React, { useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { BoardComponent } from "../components";
import { Button, Row } from "antd";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createBoard, getAllBoards } from "../features/boards/boards-slice";
import { CreateBoardRequest } from "../api/boards";

export const BoardsListPage: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  const createBoardHandler = (values: CreateBoardRequest) => {
    dispatch(createBoard({ ...values }));
  };

  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh', marginTop: '2rem' }}>
      <div className="site-layout-content">
        <Button
          onClick={() => {
            createBoardHandler({
              title: 'qwdqwd',
              owner: 'qwdqwd',
              users: ['amahasla'],
            });
          }}
        >
          Create board
        </Button>
        <Row gutter={[24, 24]}>
          {boards.map((el) => (
            <BoardComponent key={uuid()} id={el._id} title={el.title} />
          ))}
        </Row>
      </div>
    </Content>
  );
};

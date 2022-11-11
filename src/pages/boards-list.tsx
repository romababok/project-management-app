import React, { useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { BoardComponent } from "../components";
import { Row } from "antd";
import { v4 as uuid } from "uuid";

export const BoardsListPage: React.FC = () => {
  return (
    <Content
      style={{ padding: "0 50px", minHeight: "70vh", marginTop: "2rem" }}
    >
      <div className="site-layout-content">
        <Row gutter={[24, 24]}>
          {new Array(4)
            .fill({
              title: "Board title",
              tasks: ["qweqwe", "asdasd", "zxczxc"],
            })
            .map((el) => (
              <BoardComponent
                key={uuid()}
                id={uuid()}
                title={el.title}
                tasks={el.tasks}
              />
            ))}
        </Row>
      </div>
    </Content>
  );
};

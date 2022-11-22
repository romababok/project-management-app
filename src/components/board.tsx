import React from 'react';
import { Card, Col, List } from 'antd';
import { Link } from 'react-router-dom';

interface BoardComponentProps {
  id: string;
  title: string;
  tasks?: string[];
}

export const BoardComponent: React.FC<BoardComponentProps> = (props: BoardComponentProps) => {
  return (
    <Col span={6}>
      <Card title={<Link to={props.id}>{props.title}</Link>}>
        <List dataSource={props.tasks} renderItem={(item) => <List.Item>{item}</List.Item>} />
      </Card>
    </Col>
  );
};

import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useParams } from 'react-router';

export const SelectedBoardPage: React.FC = () => {
  const { boardId } = useParams();

  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh' }}>
      <div className="site-layout-content">
        Content here <h1>SelectedBoard</h1>
        {boardId}
      </div>
    </Content>
  );
};

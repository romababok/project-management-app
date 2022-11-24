import React from 'react';
import { Spin } from 'antd';

export const PageLoadingIndicator: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

import React, { useEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserData } from '../features/auth/auth-slice';
import { getUserByIdAPI } from '../api';

export const WelcomePage: React.FC = () => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData(token as string));
  }, [dispatch, token]);

  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh' }}>
      <div className="site-layout-content">
        Content here <h1>WelcomePage</h1>
      </div>
    </Content>
  );
};

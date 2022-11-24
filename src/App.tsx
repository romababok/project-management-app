import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { PageLayout, ProtectedRoute } from './components';
import { BoardsListPage, ErrorPage, LoginPage, UserPage, WelcomePage } from './pages';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { SelectedBoardPage } from './pages/selected-board/selected-board';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<LoginPage />} />
          <Route
            path="boards"
            element={
              <ProtectedRoute>
                <BoardsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="boards/:boardId"
            element={
              <ProtectedRoute>
                <SelectedBoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:userId"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <ErrorBoundary>
              <ErrorPage />
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

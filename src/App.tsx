import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { WelcomePage } from "./pages/welcome/welcome-page";
import { PageLayout } from "./components";
import {
  BoardsListPage,
  ErrorPage,
  LoginPage,
  SelectedBoardPage,
  UserPage,
} from "./pages";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<LoginPage />} />
          <Route path="boards" element={<BoardsListPage />} />
          <Route path="boards/:boardId" element={<SelectedBoardPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="users/:userId" element={<UserPage />} />
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

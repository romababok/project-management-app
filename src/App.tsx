import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { PageLayout } from './components';
import { BoardsListPage, ErrorPage, LoginPage, ProfilePage, WelcomePage } from './pages';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { SelectedBoardPage } from './pages/selected-board/selected-board';
import { ProtectedRoute } from './components/protected-route';

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
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
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

import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import RegistrationForm from '../Pages/RegistrationForm';
import ProtectedRoute from './ProtectedRoutes';
import Dashboard from '../Pages/Dashboard';
import CSVUploader from '../Pages/CSVUploader.jsx';
import Campaigns from '../Pages/Campaigns';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/upload"
        element={
          <ProtectedRoute>
            <CSVUploader />
          </ProtectedRoute>
        }
      />
      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <Campaigns />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
};

export default AppRoutes;

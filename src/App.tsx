import { AuthProvider, useAuth } from "./component/context/auth-context";
import MainLayoutBasic from "./component/mainLayout/MainLayoutBasic";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MaidsForm from "./pages/MaidsForm";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/add-maids" element={<MaidsForm />} />
        <Route path="/*" element={<MainLayoutBasic />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

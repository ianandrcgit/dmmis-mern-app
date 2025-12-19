import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        
        {/* Placeholder for Home/Dashboard */}
        <Route path="/" element={user ? <div>Welcome, {user.phoneOrEmail}!</div> : <Navigate to="/login" />} />
        
        {/* We will build these next */}
        <Route path="/admin-dashboard" element={user?.role === 'SystemManager' ? <div>Admin Panel</div> : <Navigate to="/login" />} />
        <Route path="/officer-dashboard" element={user?.role === 'VillageLevelOfficer' ? <div>Officer Panel</div> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
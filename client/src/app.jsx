import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Ensure this points to LoginPage.jsx
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* If logged in as Officer, go to officer dashboard */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/officer-dashboard" />} />
        
        <Route path="/officer-dashboard" element={
            user?.role === 'VillageLevelOfficer' ? <div>Officer Dashboard</div> : <Navigate to="/login" />
        } />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
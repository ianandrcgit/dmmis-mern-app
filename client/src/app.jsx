import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Pages
import LoginPage from './pages/LoginPage';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Import Components
import Navbar from './components/Navbar';

function App() {
    const { user, loading } = useAuth();

    // Show a loading screen while checking for a saved JWT token
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Loading DMMIS...</h2>
            </div>
        );
    }

    return (
        <Router>
            {/* The Navbar handles role-based links */}
            <Navbar />
            
            <div style={{ padding: '20px' }}>
                <Routes>
                    {/* Public Route: Redirects to dashboard if already logged in */}
                    <Route 
                        path="/login" 
                        element={!user ? <LoginPage /> : <Navigate to={user.role === 'SystemManager' ? "/admin-dashboard" : "/officer-dashboard"} />} 
                    />

                    {/* Protected Officer Route */}
                    <Route 
                        path="/officer-dashboard" 
                        element={
                            user?.role === 'VillageLevelOfficer' 
                            ? <OfficerDashboard /> 
                            : <Navigate to="/login" />
                        } 
                    />

                    {/* Protected Admin Route */}
                    <Route 
                        path="/admin-dashboard" 
                        element={
                            user?.role === 'SystemManager' 
                            ? <AdminDashboard /> 
                            : <Navigate to="/login" />
                        } 
                    />

                    {/* Default Landing Logic */}
                    <Route 
                        path="/" 
                        element={<Navigate to={user ? (user.role === 'SystemManager' ? "/admin-dashboard" : "/officer-dashboard") : "/login"} />} 
                    />
                    
                    {/* Fallback for 404s */}
                    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
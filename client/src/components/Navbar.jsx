import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null; // Don't show navbar if not logged in

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '1rem', 
            background: '#333', 
            color: 'white' 
        }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
                
                {/* Links for System Managers only */}
                {user.role === 'SystemManager' && (
                    <>
                        <Link to="/admin-dashboard" style={{ color: 'white', textDecoration: 'none' }}>👥 Manage Users</Link>
                        <Link to="/all-incidents" style={{ color: 'white', textDecoration: 'none' }}>📊 All Reports</Link>
                    </>
                )}

                {/* Links for Officers only */}
                {user.role === 'VillageLevelOfficer' && (
                    <Link to="/officer-dashboard" style={{ color: 'white', textDecoration: 'none' }}>📝 Report Incident</Link>
                )}
            </div>
            
            <button onClick={() => { logout(); navigate('/login'); }} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                Logout ({user.role})
            </button>
        </nav>
    );
};

export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <nav style={{ 
            background: '#1e293b', padding: '1rem 2rem', color: 'white',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' 
        }}>
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: '#38bdf8' }}>🛡️ DMMIS</h2>
                <Link to="/" style={linkStyle}>Home</Link>
                {user.role === 'SystemManager' && <Link to="/admin-dashboard" style={linkStyle}>Management</Link>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '0.9rem' }}>{user.phoneOrEmail} ({user.role})</span>
                <button onClick={() => { logout(); navigate('/login'); }} 
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

const linkStyle = { color: 'white', textDecoration: 'none', fontWeight: '500' };
export default Navbar;
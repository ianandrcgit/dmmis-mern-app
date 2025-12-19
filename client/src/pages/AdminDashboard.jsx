import React from 'react';
import CreateUser from './systemManager/CreateUser'; // Ensure path is correct
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>System Manager Control Panel</h1>
                <button onClick={logout}>Logout</button>
            </header>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <CreateUser />
                
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>📈 Quick Stats</h3>
                    <p>Total Incidents: Check DB</p>
                    <p>Active Officers: Check DB</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
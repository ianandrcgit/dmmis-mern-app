import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const OfficerDashboard = () => {
    const { user, logout } = useAuth();
    const [incident, setIncident] = useState({ title: '', description: '', location: '', severity: 'Medium' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This uses the Axios interceptor to automatically send your JWT token!
            const res = await API.post('/incidents', incident);
            if (res.data.success) {
                setMessage('Incident reported successfully!');
                setIncident({ title: '', description: '', location: '', severity: 'Medium' });
            }
        } catch (err) {
            setMessage('Error reporting incident: ' + err.response?.data?.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
                <h2>Officer Dashboard</h2>
                <button onClick={logout}>Logout</button>
            </nav>

            <h3>Report an Incident</h3>
            {message && <p>{message}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <input type="text" placeholder="Title" value={incident.title} 
                    onChange={(e) => setIncident({...incident, title: e.target.value})} required />
                <textarea placeholder="Description" value={incident.description} 
                    onChange={(e) => setIncident({...incident, description: e.target.value})} required />
                <input type="text" placeholder="Location" value={incident.location} 
                    onChange={(e) => setIncident({...incident, location: e.target.value})} required />
                <select value={incident.severity} onChange={(e) => setIncident({...incident, severity: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
};

export default OfficerDashboard;
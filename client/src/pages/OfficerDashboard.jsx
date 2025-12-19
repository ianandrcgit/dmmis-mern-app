import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const OfficerDashboard = () => {
    const { user, logout } = useAuth();
    const [incident, setIncident] = useState({
        title: '',
        description: '',
        location: '',
        latitude: '',  // Added field
        longitude: '', // Added field
        severity: 'Medium'
    });
    const [statusMsg, setStatusMsg] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Create the payload structure the backend expects
        const payload = {
            title: incident.title,
            description: incident.description,
            locationName: incident.location, // Assuming your backend calls the string field locationName
            severity: incident.severity,
            location: {
                type: 'Point',
                coordinates: [parseFloat(incident.longitude), parseFloat(incident.latitude)] //
            }
        };

        const res = await API.post('/incidents', payload);
        if (res.data.success) {
            setStatusMsg('✅ Incident reported successfully!');
            setIncident({ title: '', description: '', location: '', latitude: '', longitude: '', severity: 'Medium' });
        }
    } catch (err) {
        // This will now show the specific error from the network preview if it fails again
        setStatusMsg('❌ Error: ' + (err.response?.data?.message || 'Check coordinate format'));
    }
};

    return (
        <div style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>Officer Dashboard</h2>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h3>Report New Incident</h3>
                {statusMsg && <p>{statusMsg}</p>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="Title" required
                        value={incident.title} onChange={(e) => setIncident({...incident, title: e.target.value})} />
                    
                    <textarea placeholder="Description" required
                        value={incident.description} onChange={(e) => setIncident({...incident, description: e.target.value})} />
                    
                    <input type="text" placeholder="Location Name" required
                        value={incident.location} onChange={(e) => setIncident({...incident, location: e.target.value})} />

                    {/* New Coordinate Inputs */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="number" step="any" placeholder="Latitude" required
                            value={incident.latitude} onChange={(e) => setIncident({...incident, latitude: e.target.value})} />
                        <input type="number" step="any" placeholder="Longitude" required
                            value={incident.longitude} onChange={(e) => setIncident({...incident, longitude: e.target.value})} />
                    </div>
                    
                    <select value={incident.severity} onChange={(e) => setIncident({...incident, severity: e.target.value})}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    
                    <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OfficerDashboard;
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import CreateUser from './systemManager/CreateUser'; // Ensure this path is correct

const AdminDashboard = () => {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const res = await API.get('/incidents');
                if (res.data.success) setIncidents(res.data.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchIncidents();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Left Side: User Management */}
            <div>
                <CreateUser />
            </div>

            {/* Right Side: Incident List */}
            <div>
                <h3>📋 All Reported Incidents</h3>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {incidents.map(inc => (
                        <div key={inc._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                            <h4>{inc.title} ({inc.severity})</h4>
                            <p><strong>Location:</strong> {inc.locationName} [{inc.location.coordinates[0]}, {inc.location.coordinates[1]}]</p>
                            <p>{inc.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
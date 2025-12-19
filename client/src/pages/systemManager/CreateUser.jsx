import React, { useState } from 'react';
import API from '../../api/axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        phoneOrEmail: '',
        role: 'VillageLevelOfficer'
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure this matches your backend registration route
            const res = await API.post('/auth/register', formData); 
            if (res.data.success) {
                setMessage('✅ New user created successfully!');
                setFormData({ phoneOrEmail: '', role: 'VillageLevelOfficer' });
            }
        } catch (err) {
            setMessage('❌ Error: ' + (err.response?.data?.message || 'Failed to create user'));
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>➕ Register New Officer</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Phone or Email" 
                    value={formData.phoneOrEmail}
                    onChange={(e) => setFormData({...formData, phoneOrEmail: e.target.value})}
                    required
                />
                <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                    <option value="VillageLevelOfficer">Village Level Officer</option>
                    <option value="SystemManager">System Manager</option>
                </select>
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
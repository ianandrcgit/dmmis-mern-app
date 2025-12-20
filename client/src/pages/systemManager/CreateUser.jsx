import React, { useState } from 'react';
import API from '../../api/axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({ phoneOrEmail: '', role: 'VillageLevelOfficer', password: '' });
    const [status, setStatus] = useState({ msg: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/users', formData);
            if (res.data.success) {
                setStatus({ msg: 'User created successfully!', type: 'success' });
                setFormData({ phoneOrEmail: '', role: 'VillageLevelOfficer', password: '' });
            }
        } catch (err) {
            setStatus({ msg: (err.response?.data?.message || 'Registration failed'), type: 'error' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Add New Personnel</h3>

            {status.msg && (
                <div className={`mb-4 p-3 rounded ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-gray-700 mb-1">Phone or Email</label>
                    <input
                        id="phoneOrEmail"
                        type="text"
                        placeholder="e.g. +919900000000 or user@example.com"
                        value={formData.phoneOrEmail}
                        onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Set a temporary password for the user"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">User will be prompted to change password on first login (if implemented).</p>
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                    >
                        <option value="VillageLevelOfficer">Village Level Officer</option>
                        <option value="TalukaLevelOfficer">Taluka Level Officer</option>
                        <option value="DistrictLevelOfficer">District Level Officer</option>
                        <option value="StateLevelOfficer">State Level Officer</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full inline-flex justify-center items-center rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
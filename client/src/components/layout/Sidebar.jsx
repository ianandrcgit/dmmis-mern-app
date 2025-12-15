import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-full bg-slate-800 text-white p-4">
            <h2 className="text-2xl font-bold mb-6">DMMIS</h2>
            <nav className="space-y-2">
                <Link to="/" className="block p-2 hover:bg-slate-700 rounded">Dashboard</Link>
                <Link to="/system/create-user" className="block p-2 hover:bg-slate-700 rounded">Create User</Link>
                <Link to="/login" className="block p-2 text-red-400 hover:bg-slate-700 rounded mt-10">Logout</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
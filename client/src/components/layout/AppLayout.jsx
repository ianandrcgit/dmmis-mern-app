// src/components/layout/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// NOTE: We will create the Sidebar component later, but we reference it now.
import Sidebar from './Sidebar'; 

const AppLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Sidebar (Fixed) */}
            <div className="w-64">
                <Sidebar />
            </div>

            {/* 2. Main Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
                <header className="bg-white shadow p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">DMMIS Dashboard</h1>
                </header>

                <main className="p-6">
                    {/* The Outlet renders the component matched by the current route (e.g., CreateUser, Dashboard, etc.) */}
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
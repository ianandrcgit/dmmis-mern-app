// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages - NOTE: We will create these pages/components later.
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
import CreateUserPage from './pages/systemManager/CreateUserPage';
// import ProtectedRoute from './routes/ProtectedRoute'; // Will be imported in the next phase

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Route: Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Private Routes: Wrapped by AppLayout */}
                <Route path="/" element={<AppLayout />}>

                    {/* Dashboard (Home of the application) */}
                    <Route index element={<Dashboard />} /> 

                    {/* System Manager Routes */}
                    <Route 
                        path="system/create-user" 
                        element={<CreateUserPage />} // Will be secured by ProtectedRoute later
                    />

                    {/* You can add more routes here later (e.g., /incidents, /profile) */}

                </Route>

                {/* Fallback for 404 (optional) */}
                <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
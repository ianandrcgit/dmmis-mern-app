import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { requestOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    // Form States
    const [phoneOrEmail, setPhoneOrEmail] = useState('');
    const [role, setRole] = useState('VillageLevelOfficer');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP
    const [error, setError] = useState('');

    // Step 1: Request OTP
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await requestOtp(phoneOrEmail, role);
            if (res.data.success) {
                setStep(2); // Move to OTP input view
                alert('OTP sent to your terminal!'); // In production, this goes to SMS/Email
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await verifyOtp(phoneOrEmail, otp);
            if (data.success) {
                // Check role to redirect to correct dashboard
                if (data.data.role === 'SystemManager') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/officer-dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>DMMIS Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {step === 1 ? (
                <form onSubmit={handleRequestOtp}>
                    <div>
                        <label>Phone or Email:</label>
                        <input type="text" value={phoneOrEmail} onChange={(e) => setPhoneOrEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="VillageLevelOfficer">Village Level Officer</option>
                            <option value="SystemManager">System Manager</option>
                        </select>
                    </div>
                    <button type="submit" style={{ marginTop: '10px' }}>Request OTP</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <p>Enter the OTP sent to <strong>{phoneOrEmail}</strong></p>
                    <div>
                        <label>OTP:</label>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="123456" />
                    </div>
                    <button type="submit" style={{ marginTop: '10px' }}>Verify & Login</button>
                    <button type="button" onClick={() => setStep(1)} style={{ marginLeft: '10px' }}>Back</button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
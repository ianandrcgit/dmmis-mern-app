import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [phoneOrEmail, setPhoneOrEmail] = useState('');
    const [role, setRole] = useState('VillageLevelOfficer');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP
    const { requestOtp, verifyOtp } = useAuth();

    const handleRequestOTP = async () => {
        try {
            const res = await requestOtp(phoneOrEmail, role);
            // show OTP in alert for local testing (server returns it in non-prod)
            if (res?.data?.otp) alert(`OTP (for testing): ${res.data.otp}`);
            setStep(2);
        } catch (err) {
            alert("Failed to send OTP. Ensure the user exists with this role.");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await verifyOtp(phoneOrEmail, otp);
            if (res.success) {
                alert('Login successful');
            }
        } catch (err) {
            alert("Invalid OTP");
        }
    };

    return (
        <div style={cardStyle}>
            <h2>DMMIS Login</h2>
            {step === 1 ? (
                <>
                    <input type="text" placeholder="Phone or Email" value={phoneOrEmail} onChange={(e) => setPhoneOrEmail(e.target.value)} style={inputStyle} />
                    <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
                        <option value="VillageLevelOfficer">Village Level Officer</option>
                        <option value="SystemManager">System Manager</option>
                    </select>
                    <button onClick={handleRequestOTP} style={buttonStyle}>Request OTP</button>
                </>
            ) : (
                <>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={inputStyle} />
                    <button onClick={handleVerifyOTP} style={buttonStyle}>Verify & Login</button>
                </>
            )}
        </div>
    );
};

const cardStyle = { maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', display: 'block' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };

export default LoginPage;
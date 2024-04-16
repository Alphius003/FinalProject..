import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function ResetPassword() {
    const { userID } = useParams();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {

        console.log(userID, otp, newPassword)
        try {
            const response = await fetch('http://localhost:4000/ResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID, otp, newPassword })
            });
console.log("after reset api call")
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }

            // Set success message
            setSuccessMessage('Password reset successfully!');
            toast.success('Password reset successfully!');
              
            // Redirect to home route after a brief delay
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2000 milliseconds delay

        } catch (error) {
            console.error('Error resetting password:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="reset-password-container">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-container">
                
            <h2>Reset Password</h2>
                <label htmlFor="otp">OTP:</label>
                <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div>
    );
}

export default ResetPassword;

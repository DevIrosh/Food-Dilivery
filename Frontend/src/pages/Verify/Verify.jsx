import React, { useEffect, useContext, useState, useCallback } from 'react'
import './Verify.css'   
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContextValue'

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const success = searchParams.get('success');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = useCallback(async () => {
        try {
            setLoading(true);
            const session_id = searchParams.get('session_id');
            
            const response = await fetch(`${url}/api/order/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    success: success,
                    session_id: session_id
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) { 
                    navigate('/ordersuccess');
                } else {
                    navigate('/ordercancel');
                }
            } else {
                navigate('/ordercancel');
            }
        } catch (error) {
            console.error('Payment verification error:', error);
            navigate('/ordercancel');
        } finally {
            setLoading(false);
        }
    }, [url, success, navigate, searchParams])

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment])

    return (
        <div className='verify'>
            <div className='verify-container'>
                {loading ? (
                    <div className='verify-loading'>
                        <div className='spinner'></div>
                        <h2>Verifying Payment...</h2>
                        <p>Please wait while we confirm your payment.</p>
                    </div>
                ) : (
                    <div className='verify-error'>
                        <h2>Verification Complete</h2>
                        <p>Redirecting you shortly...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Verify   
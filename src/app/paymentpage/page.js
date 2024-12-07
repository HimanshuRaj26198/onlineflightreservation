"use client"
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
const [token, setToken] = useState(null);
const [error, setError] = useState(null);
var utils = require('../utils.js');
var constants = require('../constants.js');

const PaymentPage = () => {

    const createHostedPaymentPage = async () => {
        try {
            const response = await fetch('/api/authorize/charge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: '50.00' }), // Replace with dynamic amount
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred while creating the payment page.');
        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            {!token && <button onClick={createHostedPaymentPage}>Pay Now</button>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && (
                <iframe
                    src={`https://sandbox.authorize.net/payment/payment?token=${token}`}
                    frameBorder="0"
                    width="100%"
                    height="600px"
                    allowFullScreen
                />
            )}
        </div>
    );
}




export default PaymentPage
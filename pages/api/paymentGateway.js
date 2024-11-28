import { ApiContracts, ApiControllers } from 'authorizenet';
import configs from '../../constant';  // Ensure you have your API credentials here

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Log the request body for debugging
            console.log("Received Request Body:", req.body);

            const { traveler, cardDetails, billingInfo } = req.body;

            // // Validate inputs
            if (!traveler || !cardDetails || !billingInfo) {
                return res.status(400).json({ success: false, message: 'Missing required information.' });
            }

            if (!cardDetails.cardNo || !cardDetails.expiry || !cardDetails.cvv) {
                return res.status(400).json({ success: false, message: 'Incomplete payment details.' });
            }

            if (!billingInfo.address || !billingInfo.city || !billingInfo.country) {
                return res.status(400).json({ success: false, message: 'Incomplete billing information.' });
            }

            // Extract traveler info (assuming one traveler for simplicity)
            const firstTraveler = traveler[0];  // Assuming one traveler for simplicity

            // Payment Processing with Authorize.Net
            const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
            merchantAuthenticationType.setName(configs.apiLoginKey);
            merchantAuthenticationType.setTransactionKey(configs.transactionKey);

            // Credit Card information
            const creditCard = new ApiContracts.CreditCardType();
            creditCard.setCardNumber(cardDetails.cardNo);
            creditCard.setExpirationDate(cardDetails.expiry.month + cardDetails.expiry.year); // MMYYYY format
            creditCard.setCardCode(cardDetails.cvv);

            const paymentType = new ApiContracts.PaymentType();
            paymentType.setCreditCard(creditCard);

            // Billing Information
            const billTo = new ApiContracts.CustomerAddressType();
            billTo.setFirstName(firstTraveler.firstName);
            billTo.setLastName(firstTraveler.lastName);
            billTo.setAddress(billingInfo.address);
            billTo.setCity(billingInfo.city);
            billTo.setState(billingInfo.state);
            billTo.setZip(billingInfo.postalCode);  // Postal Code
            billTo.setCountry(billingInfo.country);

            // Order details (dynamic invoice number)
            const orderDetails = new ApiContracts.OrderType();
            orderDetails.setInvoiceNumber('INV-' + new Date().getTime());  // Dynamic Invoice Number
            orderDetails.setDescription('Flight Reservation for ' + firstTraveler.firstName + ' ' + firstTraveler.lastName);

            // Transaction details (example amount)
            const transactionRequestType = new ApiContracts.TransactionRequestType();
            transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
            transactionRequestType.setPayment(paymentType);
            transactionRequestType.setAmount(100); // Example amount, replace with actual flight amount
            transactionRequestType.setOrder(orderDetails);
            transactionRequestType.setBillTo(billTo);

            // Create transaction request
            const createRequest = new ApiContracts.CreateTransactionRequest();
            createRequest.setMerchantAuthentication(merchantAuthenticationType);
            createRequest.setTransactionRequest(transactionRequestType);

            const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

            // Execute transaction
            ctrl.execute(function () {
                const apiResponse = ctrl.getResponse();

                // Log the API response for debugging
                console.log("API Response:", apiResponse);

                if (apiResponse != null) {
                    const response = new ApiContracts.CreateTransactionResponse(apiResponse);

                    if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
                        // Transaction successful
                        res.status(200).json({
                            success: true,
                            message: 'Transaction Successful',
                            transactionId: response.getTransactionResponse().getTransId(),
                        });
                    } else {
                        // Handle transaction failure
                        res.status(400).json({
                            success: false,
                            message: 'Transaction Failed',
                            errors: response.getTransactionResponse().getErrors(),
                        });
                    }
                } else {
                    res.status(500).json({ success: false, message: 'No Response from Payment Gateway' });
                }
            });
        } catch (error) {
            // Log detailed error for debugging
            console.error('Error processing flight reservation:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}

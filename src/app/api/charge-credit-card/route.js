
import * as AuthorizeNet from 'authorizenet';
import { APIContracts, APIControllers } from 'authorizenet';
//import * as AuthorizeNet from 'authorizenet';
import configs from '../../../../constant';

export async function POST(request){
    try {
        // Log the request body for debugging
        console.log("start me");

        console.log("start me 2nd tradetai ke pahle");

        // req.body = JSON.parse(req.body);  // Now convert string to object
        // console.log("Converted Request Body:", req.body);

        const { travelers, cardDetails, billingInfo } = await request.json();
        console.log({travelers, cardDetails, billingInfo}, "JSON DATA BACKEND");

        console.log("start me 3nd tradetai ke baad");

        console.log("Traveler Data:", travelers);
        console.log("Card Details:", cardDetails);
        console.log("Billing Info:", billingInfo);


        // // Validate inputs
        // if (!traveler || !cardDetails || !billingInfo) {
        //     return res.status(400).json({ success: false, message: 'Missing required information.' });
        // }

        // if (!cardDetails.cardNo || !cardDetails.expiry || !cardDetails.cvv) {
        //     return res.status(400).json({ success: false, message: 'Incomplete payment details.' });
        // }

        // if (!billingInfo.address || !billingInfo.city || !billingInfo.country) {
        //     return res.status(400).json({ success: false, message: 'Incomplete billing information.' });
        // }

        // Extract traveler info (assuming one traveler for simplicity)
        // const firstTraveler = travelers.firstName;  // Assuming one traveler for simplicity
        // console.log(AuthorizeNet,"APIContracts");
        // Payment Processing with Authorize.Net
        const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(configs.apiLoginKey);
        merchantAuthenticationType.setTransactionKey(configs.transactionKey);

        // Credit Card information
        const creditCard = new APIContracts.CreditCardType();
        creditCard.setCardNumber(cardDetails.cardNo);
        creditCard.setExpirationDate(cardDetails.expiry.month + cardDetails.expiry.year); // MMYYYY format
        creditCard.setCardCode(`${cardDetails.expiry}`);

        const paymentType = new APIContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        // Billing Information
        var billTo = new APIContracts.CustomerAddressType();
        billTo.setFirstName(`${travelers.firstName}`);
        billTo.setLastName(`${travelers.lastName}`);
        billTo.setCompany('Souveniropolis');
        billTo.setAddress(`${billingInfo.address}`);
        billTo.setCity(`${billingInfo.city}`);
        billTo.setState(`${billingInfo.state}`);
        billTo.setZip(`${billingInfo.postalCode}`);
        billTo.setCountry(`${billingInfo.country}`);

        // Order details (dynamic invoice number)
        const orderDetails = new APIContracts.OrderType();
        orderDetails.setInvoiceNumber('INV-' + new Date().getTime());  // Dynamic Invoice Number
        orderDetails.setDescription('Flight Reservation for ' + `${travelers.firstName}` + ' ' + `${travelers.lastName}`);

        // Transaction details (example amount)
        const transactionRequestType = new APIContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(100); // Example amount, replace with actual flight amount
        transactionRequestType.setOrder(orderDetails);
        transactionRequestType.setBillTo(billTo);

        // Create transaction request
        const createRequest = new APIContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);

        const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

        // Execute transaction
        ctrl.execute(function () {
            const apiResponse = ctrl.getResponse();

            // Log the API response for debugging
            console.log("API Response:", apiResponse);

            if (apiResponse != null) {
                const response = new APIContracts.CreateTransactionResponse(apiResponse);

                if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                    // Transaction successful
                    return new Response(JSON.stringify({
                        success: true,
                        message: 'Transaction Successful',
                        transactionId: response.getTransactionResponse().getTransId(),
                    }), {status: 200})
                } else {
                    // Handle transaction failure
                    return new Response(JSON.stringify({
                        success: false,
                        message: 'Transaction Failed',
                    }), {status: 400})
                }
            } else {
                return new Response(JSON.stringify({ success: false, message: 'No Response from Payment Gateway' }), {status: 500})
            }
        });
    } catch (error) {
        // Log detailed error for debugging
        console.error('Error processing flight reservation:', error);
        return new Response({ success: false, message: 'Internal Server Error', error: error.message }, {status: 500})
    }
}
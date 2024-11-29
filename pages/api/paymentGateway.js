import * as AuthorizeNet from 'authorizenet';
import { APIContracts, APIControllers } from 'authorizenet';
import configs from '../../constant';  // Ensure you have your API credentials here
import { message } from 'antd';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log("Received Request Body:", req.body);

            const { travelers, cardDetails, billingInfo } = req.body;

            // // Validate input data before proceeding
            // if (!travelers || !cardDetails || !billingInfo) {
            //     return res.status(400).json({ success: false, message: 'Missing required information.' });
            // }


            const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
            merchantAuthenticationType.setName(configs.apiLoginKey);
            merchantAuthenticationType.setTransactionKey(configs.transactionKey);

            // Credit Card Information
            const creditCard = new APIContracts.CreditCardType();
            creditCard.setCardNumber(`${cardDetails.cardNo}`);
            creditCard.setExpirationDate(`${cardDetails.expiry.month}${cardDetails.expiry.year.slice(-2)}`);
            creditCard.setCardCode(`${cardDetails.expiry.cvv}`);
            // creditCard.setCardNumber('4242424242424242');
            // creditCard.setExpirationDate('0842');
            // creditCard.setCardCode('999');

            const paymentType = new APIContracts.PaymentType();
            paymentType.setCreditCard(creditCard);

            // Billing Information
            const billTo = new APIContracts.CustomerAddressType();
            billTo.setFirstName(travelers.firstName);
            billTo.setLastName(travelers.lastName);
            billTo.setAddress(billingInfo.address);
            billTo.setCity(billingInfo.city);
            billTo.setState(billingInfo.state);
            billTo.setZip(billingInfo.postalCode);
            billTo.setCountry(billingInfo.country);

            // Order Details (Dynamic Invoice Number)
            const orderDetails = new APIContracts.OrderType();
            orderDetails.setInvoiceNumber('INV-' + new Date().getTime());  // Dynamic Invoice Number
            orderDetails.setDescription(`Flight Reservation for ${travelers.firstName} ${travelers.lastName}`);

            // Transaction Request
            const transactionRequestType = new APIContracts.TransactionRequestType();
            transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
            transactionRequestType.setPayment(paymentType);
            transactionRequestType.setAmount(100); // Example amount
            transactionRequestType.setOrder(orderDetails);
            transactionRequestType.setBillTo(billTo);

            const createRequest = new APIContracts.CreateTransactionRequest();
            createRequest.setMerchantAuthentication(merchantAuthenticationType);
            createRequest.setTransactionRequest(transactionRequestType);

            const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

            // // Execute the transaction
            // ctrl.execute(async function () {
            //     const apiResponse = ctrl.getResponse();

            //     if (apiResponse != null) {
            //         const response = new APIContracts.CreateTransactionResponse(apiResponse);

            //         if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
            //             // Transaction successful
            //             return res.status(200).json({
            //                 success: true,
            //                 message: 'Transaction Successful',
            //                 transactionId: response.getTransactionResponse().getTransId(),
            //             });
            //         } else {
            //             // Handle failure
            //             return res.status(400).json({
            //                 success: false,
            //                 message: 'Transaction Failed',
            //                 errors: response.getTransactionResponse().getErrors(),
            //             });
            //         }
            //     } else {
            //         return res.status(500).json({ success: false, message: 'No Response from Payment Gateway' });
            //     }
            // });

            // Execute the transaction and wait for the response
            const apiResponse = await new Promise((resolve, reject) => {
                ctrl.execute(function () {
                    const response = ctrl.getResponse();
                    if (response) {
                        resolve(response);
                    } else {
                        reject(new Error('No response from Payment Gateway'));
                    }
                });
            });

            // Process the response after receiving it
            const response = new APIContracts.CreateTransactionResponse(apiResponse);

            if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                // Transaction successful
                return res.status(200).json({
                    success: true,
                    message: 'Transaction Successful',
                    transactionId: response.getTransactionResponse().getTransId(),
                });
            } else {
                // Handle failure and log detailed errors
                const errors = response.getTransactionResponse().getErrors();
                console.error('Transaction Failed:', errors);
                return res.status(400).json({
                    success: false,
                    message: 'Transaction Failed',
                    errors: errors || 'Unknown error',
                });
            }

        } catch (error) {
            console.error('Error processing flight reservation:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}





// import * as AuthorizeNet from 'authorizenet';
// import { APIContracts, APIControllers } from 'authorizenet';
// import configs from '../../constant';  // Ensure you have your API credentials here
// import { message } from 'antd';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             // Static data for testing purposes
//             const travelers = {
//                 firstName: 'John',
//                 lastName: 'Doe',
//             };

//             const cardDetails = {
//                 cardNo: '4242424242424242',   // Sample valid card number (test card)
//                 expiry: {
//                     month: '08',
//                     year: '42',
//                 },
//                 cvv: '999',
//             };

//             const billingInfo = {
//                 address: '123 Test St',
//                 city: 'Test City',
//                 state: 'Test State',
//                 postalCode: '12345',
//                 country: 'USA',
//             };

//             console.log("Received Static Data for Payment Processing");

//             // Merchant Authentication
//             const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
//             merchantAuthenticationType.setName(configs.apiLoginKey);  // Replace with your API login key
//             merchantAuthenticationType.setTransactionKey(configs.transactionKey);  // Replace with your transaction key

//             // Credit Card Information
//             const creditCard = new APIContracts.CreditCardType();
//             creditCard.setCardNumber(cardDetails.cardNo);  // Test card number
//             creditCard.setExpirationDate(cardDetails.expiry.month + cardDetails.expiry.year);  // MMYY format
//             creditCard.setCardCode(cardDetails.cvv);  // CVV

//             const paymentType = new APIContracts.PaymentType();
//             paymentType.setCreditCard(creditCard);

//             // Billing Information
//             const billTo = new APIContracts.CustomerAddressType();
//             billTo.setFirstName(travelers.firstName);
//             billTo.setLastName(travelers.lastName);
//             billTo.setAddress(billingInfo.address);
//             billTo.setCity(billingInfo.city);
//             billTo.setState(billingInfo.state);
//             billTo.setZip(billingInfo.postalCode);
//             billTo.setCountry(billingInfo.country);

//             // Order Details
//             const orderDetails = new APIContracts.OrderType();
//             orderDetails.setInvoiceNumber('INV-' + new Date().getTime());  // Dynamic Invoice Number
//             orderDetails.setDescription(`Flight Reservation for ${travelers.firstName} ${travelers.lastName}`);

//             // Transaction Request
//             const transactionRequestType = new APIContracts.TransactionRequestType();
//             transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);  // AuthCapture transaction type
//             transactionRequestType.setPayment(paymentType);  // Set payment type
//             transactionRequestType.setAmount(100);  // Example amount (set this as per your needs)
//             transactionRequestType.setOrder(orderDetails);  // Set order details
//             transactionRequestType.setBillTo(billTo);  // Set billing info

//             const createRequest = new APIContracts.CreateTransactionRequest();
//             createRequest.setMerchantAuthentication(merchantAuthenticationType);  // Set merchant credentials
//             createRequest.setTransactionRequest(transactionRequestType);  // Set transaction request details

//             const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

//             // Execute the transaction
//             ctrl.execute(async function () {
//                 const apiResponse = ctrl.getResponse();

//                 if (apiResponse != null) {
//                     const response = new APIContracts.CreateTransactionResponse(apiResponse);

//                     if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
//                         // Transaction successful
//                         return res.status(200).json({
//                             success: true,
//                             message: 'Transaction Successful',
//                             transactionId: response.getTransactionResponse().getTransId(),
//                         });
//                     } else {
//                         // Handle failure
//                         const errors = response.getTransactionResponse().getErrors();
//                         console.error("Transaction failed with errors:", errors);
//                         return res.status(400).json({
//                             success: false,
//                             message: 'Transaction Failed',
//                             errors: errors ? errors : 'Unknown error',
//                         });
//                     }
//                 } else {
//                     console.error("No response from the payment gateway.");
//                     return res.status(500).json({ success: false, message: 'No Response from Payment Gateway' });
//                 }
//             });

//         } catch (error) {
//             console.error('Error processing flight reservation:', error);
//             return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
//         }
//     } else {
//         return res.status(405).json({ success: false, message: 'Method Not Allowed' });
//     }
// }


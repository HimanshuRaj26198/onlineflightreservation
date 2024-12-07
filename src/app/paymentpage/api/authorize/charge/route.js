import { APIContracts, APIControllers } from 'authorizenet';

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 })
    }

    const { amount } = req.body;

    // Set up merchant authentication
    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZE_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZE_TRANSACTION_KEY);

    // Set up transaction request
    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequest.setAmount(amount);

    // Hosted payment return options
    const returnOptions = {
        showReceipt: true,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`, // Hosted receipt page redirects here
        urlText: 'Return to Merchant',
        cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        cancelUrlText: 'Cancel',
    };

    const hostedPaymentSettings = new APIContracts.ArrayOfSetting();
    const setting = new APIContracts.SettingType();
    setting.setSettingName('hostedPaymentReturnOptions');
    setting.setSettingValue(JSON.stringify(returnOptions));
    hostedPaymentSettings.setSetting([setting]);

    // Create the request
    const request = new APIContracts.GetHostedPaymentPageRequest();
    request.setMerchantAuthentication(merchantAuthenticationType);
    request.setTransactionRequest(transactionRequest);
    request.setHostedPaymentSettings(hostedPaymentSettings);

    const controller = new APIControllers.GetHostedPaymentPageController(request.getJSON());

    try {
        controller.execute(() => {
            const apiResponse = controller.getResponse();
            const response = new APIContracts.GetHostedPaymentPageResponse(apiResponse);

            if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                const token = response.getToken();
                return res.status(200).json({ token });
            } else {
                return res.status(400).json({
                    error: response.getMessages().getMessage()[0].getText(),
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create hosted payment page.' });
    }
}

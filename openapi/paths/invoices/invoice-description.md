CoinPayments exposes invoices API endpoints allowing merchants to create and send invoices
to their clients to pay for goods and services in cryptocurrencies supported by the merchant's platform.

Here are the steps for creating and paying an invoice using our payment system:
1. input the product or service name, price, and any applicable discounts in the corresponding fields ( see request payload below ).
2. specify how you want to send the invoice to the payer:
either via email or by providing a link for them to access in their browser.

**Note** To send the invoice via email, you must set the value of the `isEmailDelivery` field to "true" and populate the `emailAddress` field. If you prefer to create the invoice and send the link manually through your preferred method,
set the value of `isEmailDelivery` to "false" and leave the `emailAddress` field blank.

3. upon accessing the invoice link, the payer can review the bill details and click on the payment button to proceed to the checkout page.
4. on the checkout page, you can choose or specify your preferred payment coin from the list of available currencies.
Please note that only coins supported by CoinPayments and enabled by the merchant are available for selection.
5. review the wallet address and QR code provided, then use them to complete the payment using your selected coin.
6. once the payment has been successfully processed, the invoice will be marked as paid.


![markdown file changed](./mermaid-invoice.png)


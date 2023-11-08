CoinPayments exposes invoices API endpoints allowing merchants to implement a payment gateway on their platform and let 
buyers pay for goods and services in cryptocurrencies supported by the merchant’s platform.
With CoinPayments invoices API you may:
 - send out invoices to their clients.
 - launch an integrated hosted checkout to merchant’s payment flow that will be acting on the whitelabeling basis.
CoinPayment’s invoices API is built around “invoice” entity. In other words, under the hood it generates an invoice with
all the buyer’s and merchant’s data plus information on the product/service. Thus, merchant’s will be flexible in 
managing payments with the help of this data via a set of available endpoints.
Below you will find information on how payment flow is organized for each of the above-mentioned approaches.

**Payment Flow for Sent out Invoices**

Imagine a case where you have a platform that provides services on subscription basis. Every month you need to send out 
invoices to your users with the reminder to pay for the subscription. In order to automate this flow, you may want to 
use CoinPayments API. Here are the steps that should take place in order payment could occur:

1. Merchant adds details on services for which invoice is issued, indicates user’s details like name, payment address 
and email
2. With the help of Create Invoice endpoint merchant generates an invoice entity with the data from step 1 and launches 
the payment flow
3. As a response to the Create Invoice endpoint, merchant receives all invoice entity data including:
 - paymentId to get payment address and check payment status
 - link to the invoice document with the active payment button that would lead user to payment checkout
 - date when invoice expires
 - array of allowed currencies with currency description, payment amount and fees.

4. Link to the invoice is sent to the user’s email address
5. User selects currency for payment, which triggers the Get Payment Address endpoint and merchant receives payment 
address
6. After that merchant can check the status of the payment with the help of Get Payment Status endpoint that includes:
 - status of payment
 - how much was detected and confirmed on blockchain
 - how much was detected but not confirmed yet.

**Payment Flow for Integrated Checkout with Whitelabeling**

Imagine a case where you have an online shop and you want to accept payment for goods in cryptocurrency. With 
CoinPayments API you will be able to allow buyers to add goods to the shopping cart, click “pay” and they will be 
forwarded to the payment gateway provided by CoinPayments. Here are the steps that should take place in order payment 
could occur:

1. Buyer selects product/service on the merchant’s site.
2. With the help of Create Invoice endpoint merchant generates an invoice entity and launches the payment flow.
3. As a response to the Create Invoice endpoint, merchant receives all invoice entity data including:
 - paymentId to get payment address and check payment status
 - link to the checkout for payment
 - date when invoice expires
 - array of allowed currencies with currency description, payment amount and fees.
4. Once buyer clicks “Pay” in your website, they are forwarded to the CoinPayments checkout window where they select 
currency for payment. This triggers the Get Payment Address endpoint and merchant receives payment address
5. After that merchant can check the status of the payment with the help of Get Payment Status endpoint that includes:
 - status of payment
 - how much was detected and confirmed on blockchain
 - how much was detected but not confirmed yet.

Below we will provide you with the detailed information on each of the invoices endpoints and their field values. 
Although endpoints are the same for both described use-cases, there exists a slight difference in fields to be used for 
either flow which will be addressed additionally.
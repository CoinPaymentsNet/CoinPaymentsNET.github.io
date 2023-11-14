CoinPayments exposes invoices API endpoints allowing merchants to implement a payment gateway on their platform, and let 
buyers pay for goods and services in a wide selection of cryptocurrencies.

With CoinPayments invoices API you may:
1. Create invoice links for payment collection.
2. Build custom white-label checkout solutions for your business.
CoinPayment’s invoices API is built around “invoice” entity. In other words, under the hood it generates an invoice with
all the buyer’s and merchant’s data plus information on the product/service. Thus, merchants will be flexible in 
managing payments with the help of this data via a set of available endpoints.

Below you will find information on how payment flow is organized for each of the above-mentioned approaches.

**Payment Flow for Invoice Links**

Let us consider a subscription use case, where you have a platform that provides services with a subscription payment 
model. Every month you need to send out invoices to your users with the reminder to pay for the subscription and ability
to collect this payment in crypto. In order to automate this flow, you may want to use CoinPayments API. Here are the steps
that should take place in order for a payment to occur:

1. Merchant adds details on services for which invoice is issued, indicates user’s details like name, payment address 
and email.
2. With the help of createInvoice endpoint merchant generates an invoice entity with the data from step 1 and launches 
the payment flow.
3. As a response to the createInvoice endpoint, merchant receives all invoice entity data including:
 - paymentId to get payment address and check payment status
 - link to the invoice document with the active payment button that would lead user to payment checkout
 - date when invoice expires
 - array of allowed currencies with currency description, payment amount and fees.
4. Merchant sends out the link to the invoice to the buyer.
5. Buyer enters their email for payment status updates and potential refunds, selects the currency for payment.
6. The buyer is presented with a payment address, total amount of cryptocurrency to-be-deposited, and a timer within which
the transaction has to be completed.
7. After that merchant can check the status of the payment with the help of getPaymentStatus endpoint that includes:
 - status of payment
 - how much was detected and confirmed on blockchain
 - how much was detected but not confirmed yet.
8. If the merchant has [webhooks](../webhooks/webhooks.md) set-up, they receive invoice payment notifications for each status change thereof 
(e.g. invoiceCreated, invoicePending, invoicePaid, invoiceCompleted, invoiceCancelled, invoiceTimedOut).

**Payment Flow for Integrated Checkout with Whitelabeling**

Let us consider a case where you have an online shop and you want to accept payment for goods in cryptocurrency. With 
CoinPayments API you will be able to allow buyers to add goods to the shopping cart, click “pay” and they will be 
forwarded to the payment gateway provided by CoinPayments. Here are the steps that should take place in order payment 
could occur:

1. Buyer selects product/service on the merchant’s site. Buyer indicates their details like name, payment address
   and email in the merchant's checkout UI and clicks "Pay".
2. With the help of createInvoice endpoint merchant generates an invoice entity and launches the payment flow.
3. As a response to the createInvoice endpoint, merchant receives all invoice entity data including:
 - paymentId to get payment address and check payment status
 - link to the checkout for payment
 - date when invoice expires
 - array of allowed currencies with currency description, payment amount and fees.
4. Once buyer clicks “Pay” in the merchant's website, they are forwarded to the CoinPayments checkout window where they can 
select currency for payment. For each selected currency in the checkout, the buyer is presented with a payment address,
total amount of the selected cryptocurrency to-be-deposited, and a timer within which the transaction has to be completed. 
5. After that merchant can check the status of the payment with the help of getPaymentStatus endpoint that includes:
 - status of payment
 - how much was detected and confirmed on blockchain
 - how much was detected but not confirmed yet.
6. If the merchant has [webhooks](../webhooks/webhooks.md) set-up, they receive invoice payment notifications for each status change thereof
   (e.g. invoiceCreated, invoicePending, invoicePaid, invoiceCompleted, invoiceCancelled, invoiceTimedOut).

Below we will provide you with the detailed information on each of the invoices endpoints and their field values. 
Although endpoints are the same for both described use-cases, there exists a slight difference in fields to be used for 
either flow which will be addressed additionally.
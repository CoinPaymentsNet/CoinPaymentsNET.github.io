CoinPayments exposes invoices API endpoints allowing merchants to implement a payment gateway on their platform, and let 
buyers pay for goods and services in a wide selection of cryptocurrencies.

With CoinPayments invoices API you may:
1. Create invoice links for payment collection.
2. Build custom white label checkout solutions for your business.
3. Create buy-now buttons for quick buyers' checkout.
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
and email, if provided.
2. With the help of createInvoice endpoint merchant generates an invoice entity with the data from step 1.
3. As a response to the createInvoice endpoint, merchant receives:
 - an invoice Id to further check invoice status
 - a link to the invoice document with the active payment button that would lead user to payment checkout.

*Note:* In order this request could work properly, merchant must make sure to eliminate the following attribute from the
request:

```json
   "payment": {
     "paymentCurrency": "1004:somecontractaddress"
     "refundEmail": "user@example.com"
   }
```

Providing the 'refundEmail' and 'paymentCurrency' will initiate the White Labeling flow disclosed below. Leaving 'payment' 
attribute empty will cause an error.

4. Invoice is added to merchant's account transaction history where merchant will be able to track payment status.
5. Merchant sends out the link to the invoice to the buyer.
6. Buyer enters their email for potential refunds, selects the currency for payment.
7. The buyer is presented with a payment address, total amount of cryptocurrency to-be-deposited, and a timer within which
the transaction has to be completed.
8. At the same time currency of payment is reflected in the transaction details of the payment in the merhant's
transaction history. 
9. Additionally, if the merchant has [webhooks](/#tag/Webhooks-API) set-up, CoinPayments will be sending invoice payment 
notifications for each status change thereof (e.g. invoiceCreated, invoicePending, invoicePaid, invoiceCompleted,
invoiceCancelled, invoiceTimedOut).

**Payment Flow for Integrated Checkout with White Labeling**

Let us consider a case where you have an online shop and you want to accept payment for goods in cryptocurrency. With 
CoinPayments API you will be able to allow buyers to request goods and pay with the cryptocurrency all at your website
and under your own branding. Here are the steps that should take place in order payment could occur:

1. Buyer selects product/service on the merchant’s site and adds them to the shopping cart. At the checkout, buyer
indicates their details like name, payment address and email and clicks "Pay".
2. By clicking "Pay", buyer launches the payment flow. In this flow, buyer's email provided when creating the order, 
is recorded as the 'RefundEmail' in the 'creteInvoice' request for possible refunds in case of over- and underpayment.
```
{
  ...
  "Payment": {
    "RefundEmail": "norefunds@in.crypto"
  }
}
```

At the same time, the 'createInvoice' endpoint generates an invoice entity including:
- 'invoiceId' to get payment address and check payment status
- list of available currencies for payment with currency description, payment amount and fees
- payment expiration timestamp.

3. If merchant wants to allow buyer to select currency at checkout, payment address is obtained with the help of 
'getPaymentAddressByCurrency' endpoint, once buyer chooses the currency for payment. If merchant's website has preset 
currency for all goods and services, the same endpoint must be triggered at step 2., once buyer clicks "Pay". As a result, buyer is
presented with the following data:
- a currency id
- a payment address
- total amount of the selected cryptocurrency to be deposited
- timer for completing the transaction.

3.a. A merchant can combine steps 2 and 3 into one, i.e. create an invoice for the shopping cart content already with 
the payment in the specific cryptocurrency. For this, when creating invoice, merchant should provide id of the 
'PaymentCurrency' in the 'Payment' entity of the 'CreateInvoice' request:

```
{
  ...
  "Payment": {
    "RefundEmail": "test@gmail.com",
    "PaymentCurrency": "1004:somecontractaddress"
    }
  }
```

The indication of the cryptocurrency id will trigger creation of the invoice together with payment and HotWallet
(address for buyer).

4. After that merchant can check the status of the payment with the help of getPaymentStatus endpoint that includes:
 - status of payment
 - how much was detected and confirmed on blockchain
 - how much was detected but not confirmed yet.
5. Additionally, if the merchant has [webhooks](/#tag/Webhooks-API) set-up, CoinPayments will be sending payment
   notifications for each status change (e.g. invoiceCreated, invoicePending, invoicePaid, invoiceCompleted,
   invoiceCancelled, invoiceTimedOut).

A merchant can simplify the payment process for the buyer by incorporating payment details like payment amount, currency
and payment address into a QR code. Below is an example of a script to create a QR code:

---
```javascript

<div id="canvas"></div>
<script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
<script type="text/javascript">
  const generateQRData = (currency, address, tag, amount) => {
    switch (currency.name) {
      case 'Bitcurrency SV':
        return `bitcurrency:${address}?sv&amount=${amount}`;
      case 'Tether USD (Omni)':
        return `bitcurrency:${address}?amount=${amount}&req-asset=${currency.id}`;
      case 'BinanceCoin':
        return `bnb:${address}?sv&amount=${amount}&req-asset=${currency.id}`;
      case 'Tether USD (ERC20)':
        return `ethereum:${address}?value=${amount}&req-asset=${currency.id.slice(currency.id.indexOf(':') + 1)}`;
      case 'Tether USD (TRC20)':
        return `tron:${address}?value=${amount}&req-asset=${currency.id.slice(currency.id.indexOf(':') + 1)}`;
      default:
        return `${currency?.name?.toLowerCase().replace(/ /g, '')}:${address}?amount=${amount}${tag ? `&tag=${tag}` : ''}`;
    }
  };

  const color = "#2A5ED5";
  const corner = "#000000";
  const margin = 5;

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    dotsOptions: {
      color: color,
      type: "square"
    },
    backgroundOptions: {
      color: "transparent",
      gradient: null
    },
    cornersSquareOptions: {
      type: "square",
      color: corner
    },
    cornersDotOptions: {
      type: "square",
      color: corner
    },
    imageOptions: {
      crossOrigin: "anonymous",
      imageSize: 0.5,
      margin: margin
    }
  });

  qrCode.append(document.querySelector('#canvas'));
  qrCode.update({
    data: generateQRData(currency, address, tag, amount)
  });
  </script>

```
---

**Payment Flow for Integrated Checkout with Buy-Now Button**

Let us consider another case for an online shop where you want to accept payment for goods in cryptocurrency and want
to allow your buyers to make quick purchases by clicking on the Buy-Now button next to the good or service you offer. With
CoinPayments API you will be able to allow buyers to request goods and pay with the cryptocurrency in a matter of a few 
clicks. Here are the steps that should take place in order payment could occur:

1. Buyer detects product/service on the merchant’s site and wants to order them immediately, so they click on the "Pay 
   with CoinPayments" button next to the product/service.
2. By clicking "Pay with CoinPayments", buyer launches the payment flow. As a first step of the flow, buyer is requested
   to provide their email. The email is recorded as the 'RefundEmail' in the creteInvoice request for possible refunds 
   in case of over- and underpayment.
   At the same time, the createInvoice endpoint generates an invoice entity including:
- invoiceId to get payment address and check payment status
- list of available currencies for payment with currency description, payment amount and fees
- payment expiration timestamp.
3. If merchant wants to allow buyer to select currency at checkout, payment address is obtained with the help of
   getPaymentAddressByCurrency endpoint, once buyer chooses the currency for payment. If merchant's website has preset
   currency for all goods and services, the same endpoint must be triggered once buyer clicks "Pay". As a result, buyer is
   presented with a payment address, total amount of the selected cryptocurrency to be deposited, and a timer within which
   the transaction has to be completed.
4. After that merchant can check the status of the payment with the help of 'getPaymentStatus' endpoint that includes:
- status of payment
- how much was detected and confirmed on blockchain
- how much was detected but not confirmed yet.
5. Additionally, if the merchant has [webhooks](/#tag/Webhooks-API) set-up, CoinPayments will be sending payment
   notifications for each status change (e.g. invoiceCreated, invoicePending, invoicePaid, invoiceCompleted,
   invoiceCancelled, invoiceTimedOut).

Below, you will find the detailed information on each of the invoices endpoints and their field values. 
Endpoints are the same for both described use-cases with the slight difference in utilizing certain fields in schemas.
All such differences will be outlined explicitly.
CoinPayments API offers webhook notifications, a powerful feature that allows merchants to seamlessly enable and manage 
notifications sent from CoinPayments API to their own merchant API when specific events occur. This provides merchants
with real-time updates on important activities within their CoinPayments account.

To set up webhook notifications, merchants can easily define a public endpoint URL on their server API and specify the 
events for which they want to receive notifications. 

CoinPayments will send webhooks from one of these IPs:

`hook1.coinpayments.com` - `23.183.244.249`

`hook2.coinpayments.com` - `23.183.244.250`

## Authenticate Webhooks from CoinPayments to Your Server

All webhook messages from CoinPayments contain the same headers as used by merchants to [sign requests](#section/Generate-API-Signature)
to CoinPayments API:

```
const headers = {
  'X-CoinPayments-Client': clientId,
  'X-CoinPayments-Timestamp': date,
  'X-CoinPayments-Signature': signature,
};
```

By verifying the signature with the help of the private key, merchant can make sure that the received webhook is 
produced by CoinPayments server.

Here is an example of the received notification with headers included:

`POST` to webhook URL: http://localhost:9004/api/invoices/callbacks

Headers:

```
X-CoinPayments-Signature = 60NsOvvOwtWxtNBpkrY615Y3iPNGDAWReegr2LUwIpY=
X-CoinPayments-Client = dc6a16e545c34187ba21a9edbbe484a5
X-CoinPayments-Timestamp = 2024-07-01T11:04:10
```

Body (JSON):

```
{
  "id": "8a49a588266246a2ab5f43217ca993bd",
  "type": "InvoiceCreated",
  "timestamp": "2024-07-01T11:04:06.8033575+00:00",
  "invoice": {
    "invoiceId": "0067",
    "id": "2008d68d-0f66-44ec-8500-68d054b882b9",
    "userId": "fd2d3885-b90b-4c8a-bf6d-bd94970781db",
    "userEmail": "mykola.lutsenko+t21@hypedriven.com",
    "merchantId": "91695d60-c082-406d-a2ed-5be6fbae58a4",
    "merchantClientId": "dc6a16e5-45c3-4187-ba21-a9edbbe484a5",
    "invoiceNumber": "0067",
    "invoiceNumberSuffix": null,
    "createdAt": 1719831846,
    "invoiceDate": null,
    "dueDate": null,
    "description": null,
    "expiresDate": 1751367846,
    "customData": null,
    "notes": null,
    "notesToRecipient": null,
    "buyerDataCollectionMessage": null,
    "termsAndConditions": null,
    "metadata": null,
    "poNumber": null,
    "buyer": null,
    "shipping": null,
    "lineItems": [
      {
        "amount": 10000,
        "customId": null,
        "description": null,
        "name": "test item",
        "originalAmount": 10000,
        "quantity": 1,
        "sku": null,
        "tax": null,
        "type": "Quantity"
      }
    ],
    "merchantOptions": {
      "additionalInfo": null,
      "showAddress": false,
      "showEmail": true,
      "showPhone": false,
      "showRegistrationNumber": false
    },
    "emailDeliveryOptions": null,
    "amount": {
      "currency": {
        "id": 5057,
        "smartContract": null
      },
      "subtotal": 10000,
      "shippingTotal": 0,
      "handlingTotal": 0,
      "discountTotal": 0,
      "taxTotal": 0,
      "total": 10000
    },
    "state": "Unpaid",
    "flags": {
      "requireBuyerNameAndEmail": false,
      "sendPaymentCompleteEmailNotification": false,
      "isPos": false
    },
    "canceledAt": null,
    "completedAt": null,
    "confirmedAt": null,
    "payments": [],
    "payoutConfig": null,
    "partialAcceptAvailable": false
  }
}

```

By using the following secret:

`ClientSecret` - `9ZFHcnGMxawADeXRfDtNkQDCjFUK5998oOMhl51QvzM=`

merchant can verify the signature within the header:

`X-CoinPayments-Signature = 60NsOvvOwtWxtNBpkrY615Y3iPNGDAWReegr2LUwIpY=`

thus, making sure the webhook notification is authentic.

---

**Note:** Currently, CoinPayments supports webhook notifications for **invoices** and **merchant wallets and addresses**.
This section provides information on the invoices webhooks. Webhooks for wallets and addresses are set up within 
**Create-wallet** and **Create-address-for-an-existing-wallet** requests. You can find more information about this 
**[here](/#tag/Wallets-API)**.

It's important to note that webhooks are tied to integration clients, and merchants can create multiple clients under 
their main account on the CoinPayments website, providing flexibility and customization options.

Here is a list of events for which merchants can choose to receive notifications:

- **invoiceCreated:** triggered when a new invoice is created
- **invoicePending:** triggered when the transfer amount is detected on the blockchain and the transaction has received
    enough confirmations on chain
- **invoicePaid:** triggered when an invoice is successfully paid. A paid invoice means the funds are received in the 
    CoinPayments' wallet for further payout to the merchant
- **invoiceCompleted:** triggered when the invoice is paid **and** funds are added to merchant's balance
- **invoiceCancelled:** triggered when an invoice is cancelled by the merchant
- **invoiceTimedOut:** triggered once invoice expiration date and time is over

Merchants have the flexibility to set up webhooks either through the user-friendly UI or via API calls. To set up 
webhook notifications, first, [create an API integration via CoinPayments UI](/#section/Create-credentials). Then
follow these steps:
- Access the dashboard and click on "Integrations" in the left sidebar.
- Click on the integration that you want to use for webhooks.
- On the left side of the popup screen, in the "Permissions" field select all necessary actions for which you would like to enable your API integration. 
For invoices select "Create Invoice", "List Invoices", "Find Invoice", "Invoice Payouts", "List Invoice History".
- Click "Save" to confirm your selections.

To create a webhook through the UI, continue in the popup screen with the following steps:
- On the right side of the popup screen, open the dropdown menu to specify the events for which you want to receive notifications.
- Click "Save" to confirm your selections.

To set up webhook notifications through the API calls, follow these steps:
- Create a webhook using ['createWebhook' endpoint](/#operation/createWebhook) indicating merchant's 'clientId' of the API integration. 
- In the request body provide a list of notification types you want to receive in the 'notifications' parameter. Possible values are:
'invoiceCreated', 'invoicePending', 'invoicePaid', 'invoiceCompleted', 'invoiceCancelled', 'invoiceTimedOut'.
- In the request body provide your server URL where the notifications will be sent in the 'notificationsUrl' parameter.

Once completed, your webhook notifications are all set, and your API will receive notifications based on the events you 
have chosen. This allows you to stay updated in real-time on the activities that matter most to your business.

Notification Payload will include the event type, timestamp of the invoice status update, and the actual invoice object.

Below is a descriptive flowchart illustrating the process of webhook notifications. This example specifically focuses on
the scenario where the merchant intends for their server API to receive notifications upon invoice completion.

![markdown file changed](./webhook-flowchart.png)
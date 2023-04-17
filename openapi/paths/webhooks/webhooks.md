CoinPayments API offers webhook notifications, a powerful feature that allows merchants to seamlessly enable and manage notifications sent from CoinPayments API to their own merchant API when specific events occur. This provides merchants with real-time updates on important activities within their CoinPayments account.

To set up webhook notifications, merchants can easily define a public endpoint URL on their server API and specify the events for which they want to receive notifications. Currently, CoinPayments supports webhook notifications for invoices, with plans to extend support to merchant wallets in the future.

It's important to note that webhooks are tied to integration clients, and merchants can create multiple clients under their main account on the CoinPayments website, providing flexibility and customization options.

Here is a list of invoice events for which merchants can choose to receive notifications:

- invoiceCreated: triggered when a new invoice is created
- invoicePending: triggered when an invoice is pending payment
- invoicePaid: triggered when an invoice is successfully paid
- invoiceCancelled: triggered when an invoice is cancelled

Merchants have the flexibility to create webhooks either through the user-friendly UI or via API calls. To create a webhook through the UI, simply follow these steps:

- Access the dashboard and click on "Integrations" in the left sidebar.
- Choose "API integrations", click "Add New", and provide a name for your integration client, along wit- your server URL.
- On the right side of the popup screen, open the dropdown menu to specify the events for which you wan- to receive notifications.
- Click "OK" to confirm your selections.

Once completed, your webhook notifications are all set, and your API will receive notifications based on the events you have chosen. This allows you to stay updated in real-time on the activities that matter most to your business.

Notification Payload will include the event type, timestamp of the invoice status update, and the actual invoice object


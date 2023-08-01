The Wallets API enables merchants to create and manage their wallets and wallet addresses. This is made possible through a set of endpoints that enable merchants to create new wallets with the coins supported by the platform, as well as initiate withdrawal requests from their wallets to any external or internal address of their choosing. With this powerful functionality, merchants have full control and flexibility in managing their cryptocurrency wallets to cater to their specific business needs.


**Important Note:**

If WebhookUrl field of the body is specified, then the following requests will be sent to the provided URL (maximum 5 attempts with 5-seconds timeout for a single request and 1-second delay between retries). All keys and values of the webhook payloads are strings. Samples of data being sent:

1- When wallet is activated:
```javascript
{
  "eventType" : "walletActivated",
  "walletId" : "58f78b24-1de0-42b3-9a48-94f3e9c57752",
  "walletAddress" : "0x063c9743195f53c85c8ebbdaa5916da3502b24ac"
}
```



2- When funds are received (amount is in currency's smallest units):
```javascript
{
  "eventType" : "transferReceived",
  "walletId" : "58f78b24-1de0-42b3-9a48-94f3e9c57752",
  "currencyId" : "4",
  "transactionId" : "f8ea1354-b3c9-470f-af09-c2ba96f2e391" ,
  "amount" : "1000000000000000000"
}
```



3- When sent transaction is confirmed:
```javascript
{
  "eventType" : "transferConfirmed",
  "fromWalletId" : "58f78b24-1de0-42b3-9a48-94f3e9c57752",
  "transactionId" : "f8ea1354-b3c9-470f-af09-c2ba96f2e391",
  "spendRequestId" : "c25bb620-ffdd-4b63-9ae6-dd8f2645c8f6",
  "txHash" : "0xdb247c2d1db3ee09658bced93761360e24d8fe555b79661f252470305babfd3d",
  "block" : "11286611"
}
```


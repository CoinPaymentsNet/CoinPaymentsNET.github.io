CoinPayments provides merchants with the flexibility to create and manage wallets either through the user-friendly UI or
via API calls. Due to security reasons, wallets created via UI cannot be managed via API. However, all wallets created
via API are available through UI with the full functionality scope. Hence, in case merchant requires their funds
from the wallet that was originally created via UI to be accessible via API, they need to sweep funds from the "UI wallet"
to the "API wallet".

Since merchants may have several API clients activated, it is important to note that wallets created under one API client
cannot be controlled by a different API client.

The Wallets API provides a set of endpoints that enable merchants to create new wallets with the coins supported by the platform, as well as 
initiate withdrawal requests from their wallets to any external or internal address of their choosing. With this 
powerful functionality, merchants have extensive control and flexibility in managing their cryptocurrency wallets to cater to
their specific business needs.

Currently, CoinPayments API supports only creation of temporary account-based addresses for their wallets with the plan to extend to 
permanent account-based addresses in future. Such temporary addresses are used as commercial addresses for commercial 
fees, e.g. gambler casino accounts. The life-time of such addresses is configurable via admin dashboard.

UTXO addresses with CoinPayments are always permanent.

**Important Note:**

Unlike wallets created via UI, wallets created via API can send webhook notifications to the URL specified by the merchant
when funds are received by the wallet:
```javascript
{
  "walletId" : "58f78b24-1de0-42b3-9a48-94f3e9c57752",
  "address" : "3HX4jDA4ESQahmE9w448TKUQiF786paVBT",
  "transactionId" : "f8ea1354-b3c9-470f-af09-c2ba96f2e391",
  "transactionType" : "UtxoExternalReceive",
  "amount" : "1.5",
  "symbol" : "BTC"
}
```

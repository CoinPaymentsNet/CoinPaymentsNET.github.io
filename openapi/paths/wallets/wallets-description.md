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
fees, e.g. gambler casino accounts.

UTXO addresses with CoinPayments are always permanent.

**Important Note:**

Unlike wallets and addresses created via UI, wallets and addresses created via API can send webhook notifications to 
the URL specified by the merchant when funds are received by/withdrawn from the wallet/address:
```javascript
{
  "walletId":"4ca18e8e-915b-4a69-a17a-0b0b666858a7",
  "address":"myGTmrMtU6vUULkYRCDxJMggF7egsXhcTi",
  "transactionId":"cb44e78f-a97b-44b5-a23d-1e3b025aab47",
  "txHash":"9d9dd1f6f4a62388797e6beeb76c1a3c34d41942303ce6fb49177d3c88a74d11",
  "transactionType":"UtxoExternalReceive",
  "amount":"2",
  "symbol":"LTCT",
  "nativeAmount":"173.35",
  "nativeSymbol":"USD",
  "confirmations":3,
  "requiredConfirmations":3
}
```

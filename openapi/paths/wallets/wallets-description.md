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

Addresses created via CoinPayments API are used as commercial addresses for commercial funds, e.g. gambler casino accounts.
Hence, merchants require flexibility when accumulating and sweeping funds from such commercial addresses.

UTXO addresses, by their nature, allow for accumulation of funds and, hence, reduction of network fees when withdrawing 
funds in bulk from such addresses. 
Thus, it is possible to assign UTXO addresses to the merchant (and merchant can assign specific address to a specific customer)
for permanent use without any considerable loss in service fees when managing funds. As a result, CoinPayments refers to
UTXO addresses created via API as permanent addresses.

Account-based addresses created via CoinPayments API may be either temporary or permanent depending on the flag set up 
by the merchant when creating a new account-based address.

CoinPayments randomly emits **temporary account-based address** to a merchant so that the merchant could obtain a 
commercial deposit from a customer. The address stays in merchant's use for a certain period of time set up by the 
CoinPayments admins. When the time period expires, the address returns to the pool of CoinPayments addresses. This 
time period is renewed in case the address is topped up again before the set time period rus out. If the address 
returns to the pool, the funds are automatically assigned to the corresponding merchant API wallet within which the 
address had been emitted. Consolidation of funds from addresses at the main wallet balance is CoinPayments responsibility
in this design and allows for reduction in fees when sweeping wallet balance elsewhere. Nevertheless, some merchants 
might find it uncomfortable that addresses cannot be assigned permanently to specific customers. Hence, customer must 
always check for the correct address before sending funds to the merchant.

The merchant can decide to use **permanent account-based addresses** if it is important to manage funds/balances 
deposited by their customers individually. For that, when creating a commercial wallet via API, merchant must enable the
`usePermanentAddresses` flag. Thus, all the addresses created within such wallet will be permanent. This will allow
merchant to assign specific addresses to specific clients perpetually. Such design allows for better customer experience.
Also, merchant can manage themselves when to sweep funds from addresses to the main wallet balance and further. Address 
balance is always swept in full to the main wallet balance in order to reduce the amount of cases when a small amount of
funds is stuck on the address because the fee for withdrawal equals or higher than the withdrawn amount.

The tradeoff of the permanent address vs. temporary address design is fees. In order to be able to consolidate the balances
of all permanent addresses within the wallet at its main balance, each new address must be activated. The activation fee
is charged only once when the first withdrawal from the address takes place. However, the network fee is charged
everytime funds are withdrawn from each address. Unlike with UTXO addresses, accumulation of network fees for withdrawals 
from the account-based addresses is not possible, hence, leading to larger expenses at the merchant's side.

**Note:** When sending funds to an address, make sure that the address you are sending to matches the token/coin
that you credit to the address. Otherwise, this may lead to the funds being stuck in the network or even lost.

A common case for merchants is to use wallets and addresses created via API for receiving payments from their customers,
e.g. top-up a subscription or casino account. A merchant can simplify the payment process for the buyer by incorporating
payment details like payment amount, currency and payment address into a QR code. This will decrease the possibility of 
an error when sending funds.

For the QR code script example check description of the **Payment Flow for Integrated Checkout with White Labeling** 
in the **[Invoices API](#tag/Invoices-API)**.

**Note:**

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

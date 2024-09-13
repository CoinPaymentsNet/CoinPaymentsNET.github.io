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

**Note:** When sending funds to an address, make sure that the address you are sending to matches the token/coin
that you credit to the address. Otherwise, this may lead to the funds being stuck in the network or even lost.

---

## Permanent vs. Temporary Addresses

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
Also, merchant can manage themselves when to sweep funds from addresses to the main UI wallet balance and further. Address 
balance is always swept in full to reduce the amount of cases when a small amount of
funds is stuck on the address because the fee for withdrawal equals or higher than the withdrawn amount. 

The tradeoff of the permanent address vs. temporary address design is fees. In order to be able to use the funds from permanent addresses,
merchant must consolidate addresses balances at the UI wallet balance. For this each new address created within the API wallet must be activated.
The activation fee is charged only once when the first withdrawal from the address takes place and the funds are swept from the address to
the UI wallet balance. However, the network fee for further withdrawal of the consolidated funds is charged
everytime funds are withdrawn from the wallet. Although address activation fees lead to larger expenses at the first sweep,
each repetitive withdrawal of consolidated funds from the wallet is still way cheaper compared to regular withdrawal from an
account-based address.

---

## Simplify Wallet Top-up

A common case for merchants is to use wallets and addresses created via API for receiving payments from their customers,
e.g. top-up a subscription or casino account. A merchant can simplify the payment process for the buyer by incorporating
payment details like payment amount, currency and payment address into a QR code. This will decrease the possibility of
an error when sending funds.

For the QR code script example check description of the **Payment Flow for Integrated Checkout with White Labeling**
in the **[Invoices API](#tag/Invoices-API)**.

---

## Webhook Notifications

Unlike wallets and addresses created via UI, wallets and addresses created via API can send webhook notifications to 
the URL specified by the merchant. The URL for receiving webhook notifications is specified at [wallet/address creation](#operation/createMerchantWallet) 
or [update](#operation/updateWalletWebhookUrl).

### Authenticate Webhooks from CoinPayments to Your Server

CoinPayments will send webhooks from one of these IPs:

`hook1.coinpayments.com` - `23.183.244.249`

`hook2.coinpayments.com` - `23.183.244.250`

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

### Webhook Types

The list of wallet/address transactions that support webhook notifications includes:
- **InternalReceive** - receiving funds within the system;
- **UtxoExternalReceive** - receiving funds from external UTXO transfers;
- **AccountBasedExternalReceive** - receiving funds from external account-based transfers;
- **InternalSpend** - sending funds to the address that belongs to CoinPayments;
- **ExternalSpend** - sending funds to the address that does not belong to CoinPayments;
- **SameUserReceive** - receiving funds from one wallet to another for the same CoinPayments user;
- **AccountBasedExternalTokenReceive** - receiving tokens from external account-based transfers;
- **AccountBasedTokenSpend** - sending account-based tokens to external address;

Below is an example of the webhook notification thrown when an external withdrawal is made from a wallet:

```javascript
{
  "walletId":"4ca18e8e-915b-4a69-a17a-0b0b666858a7",
  "address":"myGTmrMtU6vUULkYRCDxJMggF7egsXhcTi",
  "transactionId":"cb44e78f-a97b-44b5-a23d-1e3b025aab47",
  "txHash":"9d9dd1f6f4a62388797e6beeb76c1a3c34d41942303ce6fb49177d3c88a74d11",
  "spendRequestId": "448c1624-98e7-43c9-85f4-75ed0c97a8bb"
  "transactionType":"ExternalSpend",
  "amount":"2",
  "symbol":"LTCT",
  "nativeAmount":"173.35",
  "nativeSymbol":"USD",
  "coinPaymentsFee": "0.05",
  "coinPaymentsFeeSymbol": "LTCT",
  "confirmations":3,
  "requiredConfirmations":3
}
```

Also, below is the description of the typical wallet transaction notification payload.

---


Welcome to CoinPayments API documentation!

![markdown file changed](./charlie.png)

CoinPayments API is a RESTful JSON API for interacting with blockchains,
accessed over HTTP or HTTPS from the domain **https://api.coinpayments.net/api/v1/**

# Overview
Coinpayments API docs defines a standard, language-agnostic interface to CoinPayments API.
The platform allows merchants to integrate the payment system into their own websites or applications,
allowing their customers to pay for goods or services with cryptocurrency.
The API documentation provides the necessary information for developers to integrate the payment system into their own platforms,
including details on how to authenticate requests, what parameters to include in requests and responses, and how to handle errors.
Overall, the API is designed to provide a simple and secure way for merchants to accept cryptocurrency payments from their customers.
In these docs you'll find everything you need to leverage CoinPayments for your applications.

Also, while studying documentation, you can test it in Postman. For this, you can download API collection 
[here](https://coinpayments.postman.co/workspace/Team-Workspace~09eaa205-3e67-47b7-86d7-1d5709bf0610/collection/28654468-da626518-a5d1-44ac-ab0b-d59e23d051dc?action=share&creator=28654468&active-environment=28654468-0e4b6fab-4efd-4c74-a76e-d21527672c78).


# Features
CoinPayments provides a multi-currency wallet that enables businesses and individuals to store, send,
and receive a wide range of digital currencies and tokens.
The free-to-set-up wallet is available on web and mobile, enabling account management online and on the go.

#### Some of the key features of the website include:
1. Support for multiple popular cryptocurrencies, allowing customers to pay with the digital currency of their choice.
2. Generate invoices and manually share them with buyers through a link or via email.
3. Callback Addresses feature allows merchant to receive payment without specifying the amount or time in advance.
4. Real-time updates using Webhooks, The API provides updates on the status of transactions, allowing merchants and customers to track the progress of their payments.
5. Advanced security measures to ensure that all transactions are safe and secure.


# Common API Errors
This section provides an overview of the common errors that you may encounter when utilizing CoinPayment API. By familiarizing yourself with these errors, you will be better equipped to handle potential issues and troubleshoot effectively. Understanding these errors will contribute to a smoother integration process and ensure a more seamless payment experience for your users.

### Unauthorized
This error occurs when an invalid `clientId` or `clientSecret` is used to generate API signature to authenticate requests. It may also occur if a `clientId` is valid but the integration is either deleted or the user's account does not exist. or an invalid or incorrect client secret is provided. In such cases, the API returns an "Unauthorized" error.

### Insufficient Funds
This error can occur in different scenarios, such as during withdrawal to an external address or when converting a coin to another, whether to an internal or external address. It arises when the user's wallet does not have enough balance to cover the requested transaction amount.

### Invalid Address
When sending a request to create a withdrawal or a conversion, if the provided address is not valid or formatted incorrectly, this error is triggered. Users should double-check the address they provided and ensure it follows the required format. here are examples of Valid addresses


#### Valid UTXO-Based Coin Addresses:
- Bitcoin (BTC): `1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`
- Bitcoin Cash (BCH): `bitcoincash:qr7uq7uvujmzhcv29tw92q0hs7fwpht4fvl4a4kj9a`
- Litecoin (LTC): `LZx9pzGfH6mKSzVsJZnryeVrRzt6X8uZ9r`

#### Valid Token Coin Addresses:
- Ethereum (ETH): `0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf`
- ERC-20 Tokens (e.g., DAI, USDT): `0x6B175474E89094C44Da98b954EedeAC495271d0F`


### Invalid or Unsupported Currency:
This error occurs when the requested invoice, withdrawal, conversion involves an invalid or unsupported currency. It could be due to the currency not being listed or supported on the platform. Users can utilize the currencies API included in the documentation to list all supported currencies and verify if their intended currency is supported before initiating the transaction.

### Bad request ( Input validation errors ):
This error occurs when there are issues with the validation of fields in the request's payload. For example, if a required field is not sent, or if the fields have invalid values or incorrect types. The API response for a validation error includes a description of the error and may provide details about the missing fields or the specific issues with the payload.



# Rate limits
The API provides access to our platform's data and functionality, but in order to maintain the stability and performance of our services, rate limits have been implemented. Rate limits are set to prevent excessive use of the API and to ensure fair usage among all integrations.
Currently, the rate limit is capped at a maximum of 70 requests per second.

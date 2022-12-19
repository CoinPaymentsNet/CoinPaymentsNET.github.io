CoinPayments API uses SHA-256 which is a way of authenticating an API request to ensure that it comes from a trusted source. 
In this scheme, the API server generates a unique signature for each request using the SHA-256 hashing algorithm. 


#### Prerequisites
To Integrate Coin Payments API you need to obtain CLIENT ID and CLIENT SECRET.
If you haven't yet created your credentials, you may skip to next section.


# Create API credentials
First, you need to [create an account](https://identity.coinpaymints.com/Identity/Account/SignUp?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dcoinpayments-aphrodite%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520orion%26redirect_uri%3Dhttps%253A%252F%252Fdashboard.coinpaymints.com%252Fcallback%26nonce%3D1d30da16-4ff7-4c2c-2006-33bebbb54bd8%26signup%3D1)
##### Once you're logged into your account, Go to Dashboard Business tools 👇

![markdown file changed](./integrations-1.png)


##### Integrations 🏗
![markdown file changed](./integration-2.png)


##### Add integration ➕
![markdown file changed](./integration-3.png)


##### give a name and a URL to your integration - more on the URL later. 📛
![markdown file changed](./integration-4.png)



**Warning**
It is strongly recommended that you save your credentials after they are shown to you.
Your credentials will only be displayed once, and if you lose them, you will not be able to access the API.
Please take the time to save your credentials in a secure location so that you can use them in the future.

---

# Create API Signature
In order to properly sign an authenticated request for the CoinPayments v2 API, the following headers must be included:

* `X-CoinPayments-Client`
* `X-CoinPayments-Timestamp`
* `X-CoinPayments-Signature`

The following sections are instructions for properly populating these headers.

---

### X-CoinPayments-Client
Populate this header with your **CLIENT ID**

Example Value
`cc7caaa431d54ad6accfd28b20170ee4`


---
### X-CoinPayments-Timestamp
Before we Populate this header with the current time as a UNIX timestamp, exclude the milliseconds epoch, example:

```javascript
const date = new Date().toISOString().split(".")[0];
```

Example value:
`2022-12-19T19:27:04`  
---
## Construct the request queryString
To create an API signature takes a query string you first need to construct the query string which is made of the 
following attributes concatenated together
* method
* url
* clientId
* date

Example ( Javascript )
```javascript
const queryString = `\ufeff${method}${url}${clientId}${JSON.stringify(requestPayload)}`;
```

For requests with no request body, replace last attribute by an empty string:
Example ( Javascript )
```javascript
const queryString = `\ufeff${method}${url}${clientId}${''}`;
```

---
### X-CoinPayments-Signature
Next step is to use the your `clientSecret` to generate the signature using SHA-256 encryption Algorithm as follows:

```javascript
const hash = CryptoJS.HmacSHA256(queryString, CryptoJS.enc.Utf8.parse(clientSecret));
const signature = CryptoJS.enc.Base64.stringify(hash);
```
example value:
`oW7d1ktvK7R6741oACgVR3bysGTPY8tqren0WTmmEk0=`

---  
Here is a complete example of how to generate an API signature for making a call to the create wallet API:
```javascript
const clientId = 'd0ccc52b8204460783d375e278082de2';
const clientSecret = 'WYEB+hN+89waO76QeO9T7IIqhdo/60GHrdYu2vEa7Tg=';
const url = `https://api.coinpaymints.com/api/v1/merchant/wallets`;
const method = 'POST';
const date = new Date().toISOString().split('.')[0];

const createWalletDto = {
  currencyId: 2,
  label: 'Online Shop Wallet',
  webhookUrl: 'ttps://mysite.com/api/v1/payment/notification',
};

const queryString = `\ufeff${method}${url}${clientId}${date}${JSON.stringify(createWalletDto)}`;


const hash = CryptoJS.HmacSHA256(queryString, CryptoJS.enc.Utf8.parse(clientSecret));
const signature = CryptoJS.enc.Base64.stringify(hash);

const headers = {
  'X-CoinPayments-Client': clientId,
  'X-CoinPayments-Timestamp': date,
  'X-CoinPayments-Signature': signature,
};


/** Make API call using axios ( you may choose any http client ) */
const axiosoptions = {
  url,
  headers,
  method,
  data: createWalletDto,
};

const response = await this.httpsService.request(options).toPromise();
console.log(response);
```

---















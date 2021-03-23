    var $ = document.querySelector.bind(document);
    $("img").parentElement.style.setProperty('padding', '7%');

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    setTimeout(function () {
        var tabHtml = '<li data-item-id="section/UseCasesExamples" class="sc-hrWEMg bbViyS"><label type="section" role="menuitem"              class="sc-eTuwsz iNzLCk -depth1"><span title="Authentication" class="sc-gwVKww fyUykq">Use Cases Examples</span></label></li>';

        var tutorialsHtml = `  <div class="c-article b13" data-block-id="13">
    <div class="c-article__content max-width-sm">
      <div id="article-body" class="article-body">
        <h3><strong>Use Case Tutorials</strong></h3>
  <p>The following are a collection of potential use cases for the CoinPayments API with example steps for integration.</p>
  <p><strong>Prerequisites for tutorials</strong></p>
  <ul>
  <li>A CoinPayments.net account.</li>
  <li>A platform capable of making HTTP calls to the CoinPayments.net API.</li>
  <li>Developer understanding of the introduction documentation section for the CoinPayments.net API.</li>
  <li>A private and public API key (from this logged in account page).</li>
  <li>Knowledge of the different coin codes, listed in the CODE column on the supported coins page. These codes (also known as tickers) are used in the API calls anytime a "currency", "to" or "from" field is needed.</li>
  </ul>
  <p>Note: These tutorials assume every HTTP request executing on <a href="https://alpha.coinpayments.net/">https://alpha.coinpayments.net/</a> and he will be skipped in examples. Also, assume so every API response format to be the default format of JSON.</p>
  <h4><strong>Tutorial 1: E-Commerce System Checkout</strong></h4>
  <p>This tutorial will cover integrating the following features using the CoinPayments.net API:</p>
  <ul>
  <li>Get a list of available currencies</li>
  <li>Returns the currency conversion rates for the specified from currencies converted to the specified to currencies</li>
  <li>Be notified of a completed payment by the IPN system.</li>
  </ul>
  <h4><strong>Part A: Get a list of available currencies</strong></h4>
  <p>For getting all available currencies we'll send an <strong>HTTP</strong>  request (<strong>GET</strong>) to <strong>/api/v1/currencies</strong>.<br>
  The response will contain information about all available currencies.<br>
  Currency information looks like</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
     "id":1,
     "type":"crypto",
     "symbol":"BTC",
     "name":"Bitcoin",
     "logo":{
        "imageUrl":"https://api.coinpayments.net/static/img/coins/64x64/1.png",
        "vectorUrl":"https://api.coinpayments.net/static/img/coins/vector/1.svg"
     },
     "decimalPlaces":8,
     "rank":1,
     "status":"active",
     "capabilities":[
        "multiSigAccounts",
        "singleSigAccounts"
     ],
     "urls":{
        "websites":[
           "https://bitcoin.org"
        ],
        "explorers":[
           "https://blockchain.info"
        ]
     }
  }
  </code></pre>
  <h4><strong>Part B: The currency conversion rates</strong></h4>
  <p>For check rate between currencies, we'll send the <strong>HTTP</strong> request (<strong>GET</strong>) to <strong>/api/v1/rates?from=1&amp;to=5057</strong><br>
  query param explanation:</p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="center">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left"><strong>from</strong></td>
  <td align="center">currency id to use as the source for rate calculations</td>
  </tr>
  <tr>
  <td align="left"><strong>to</strong></td>
  <td align="center">comma separated list of currency ids for which to retrieve conversion rates for (from the from currencies)</td>
  </tr>
  </tbody>
  </table>
  <p>The response will be looks like</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "items": [
      {
        "baseCurrencyId": 1,
        "quoteCurrencyId": 5057,
        "rate": "8896.619359154478102279714028"
      }
    ]
  }
  </code></pre>
  <h4><strong>Part C: Checkout</strong></h4>
  <p>The next example explains how to create a payment using the CoinPayments.net API in order to accept payment in your e-commerce system during the checkout process. You will need to know the following information in order to create the payment:</p>
  <ul>
  <li>The total price that you wish to charge for the payment.</li>
  <li>Buyer personal data (name, email, phone, etc)</li>
  </ul>
  <p>For creating new payment we will send <strong>HTTP</strong> request (<strong>POST</strong>) to <strong>/api/v1/invoices</strong>. The request body should look like</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "clientId": "string",
    "currencyId": 0,
    "invoiceId": "string",
    "buyer": {
      "companyName": "string",
      "name": {
        "firstName": "string",
        "lastName": "string"
      },
      "emailAddress": "user@example.com",
      "phoneNumber": "string",
      "address": {
        "address1": "string",
        "address2": "string",
        "address3": "string",
        "provinceOrState": "string",
        "city": "string",
        "suburbOrDistrict": "string",
        "countryCode": "string",
        "postalCode": "string"
      }
    },
    "description": "string",
    "items": [
      {
        "customId": "string",
        "sku": "string",
        "name": "string",
        "description": "string",
        "quantity": 0,
        "originalAmount": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "amount": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "tax": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        }
      }
    ],
    "amount": {
      "breakdown": {
        "subtotal": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "shipping": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "handling": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "taxTotal": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        },
        "discount": {
          "currencyId": 0,
          "displayValue": "string",
          "value": "string"
        }
      },
      "currencyId": 0,
      "displayValue": "string",
      "value": "string"
    },
    "shipping": {
      "method": "string",
      "companyName": "string",
      "name": {
        "firstName": "string",
        "lastName": "string"
      },
      "emailAddress": "user@example.com",
      "phoneNumber": "string",
      "address": {
        "address1": "string",
        "address2": "string",
        "address3": "string",
        "provinceOrState": "string",
        "city": "string",
        "suburbOrDistrict": "string",
        "countryCode": "string",
        "postalCode": "string"
      }
    },
    "requireBuyerNameAndEmail": true,
    "buyerDataCollectionMessage": "string",
    "notesToRecipient": "string",
    "termsAndConditions": "string",
    "customData": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "metadata": {
      "integration": "string",
      "hostname": "string"
    }
  }
  </code></pre>
  <br>
  <p><strong>Request body explanation:</strong></p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="left">Description</th>
  <th align="left">Required</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left">clientId</td>
  <td align="left">The id of the client creating this invoice</td>
  <td align="left">Yes</td>
  </tr>
  <tr>
  <td align="left">currencyId</td>
  <td align="left">The id of the currency the invoice is to be in, alternatively this can be set individually per field</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">invoiceId</td>
  <td align="left">The optional API caller provided external invoice number. Appears in screens shown to the Buyer and emails sent.</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">buyer</td>
  <td align="left">Info about buyer</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">description</td>
  <td align="left">The purchase description, can be provided instead of a list of items</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">items</td>
  <td align="left">The optional array of items that a buyer intends to purchase from the merchant</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">amount</td>
  <td align="left">The total amount of the invoice, with an optional breakdown that provides details, such as the total item amount, total tax amount, shipping, handling, insurance and discounts, if any</td>
  <td align="left">Yes</td>
  </tr>
  <tr>
  <td align="left">shipping</td>
  <td align="left">The optional shipping method and address</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">requireBuyerNameAndEmail</td>
  <td align="left">Flag indicating whether a buyer name and email are required, they will be requested at checkout if not provider by the caller</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">buyerDataCollectionMessage</td>
  <td align="left">The message to display when collecting buyer user data</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">notesToRecipient</td>
  <td align="left">Any additional information to share with the buyer about the transaction</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">termsAndConditions</td>
  <td align="left">Any terms and conditions, e.g. a cancellation policy</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">customData</td>
  <td align="left">Any custom data the caller wishes to attach to the invoice which will be sent back in notifications</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">metadata</td>
  <td align="left"></td>
  <td align="left">No</td>
  </tr>
  </tbody>
  </table>
  <h4><strong>Tutorial 2: User Currency Withdrawal</strong></h4>
  <p>This tutorial will cover integrating the following features using the CoinPayments.net API.</p>
  <ul>
  <li>Having a user withdraw an amount of currency from your CoinPayments.net account to a specified currency address (outside the CoinPayments.net system).</li>
  <li>The withdrawing system checking it's currency balance before initiating the withdrawal.</li>
  </ul>
  <p>Some example scenarios that this tutorial would apply to include:</p>
  <ul>
  <li>A gambling platform where the user wishes to cash out some of their account's holdings.</li>
  <li>A freelancer network where a job has been completed and the service provider needs to be paid by the network's system (acting as escrow).</li>
  <li>A company paying it's employees payroll from their CoinPayments.net wallet.</li>
  </ul>
  <p>To create a transaction and spend funds from an account we will send <strong>HTTP</strong> request (<strong>POST</strong>) to<br>
  <strong>/api&#8203;/v1&#8203;/accounts&#8203;/{id}&#8203;/spend</strong>. The request body should look like</p>
  <ul>
  <li>id - The id of the account from which to spend funds from</li>
  </ul>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "recipients": [
      {
        "address": "string",
        "amount": "string"
      }
    ],
    "memo": "string",
    "customData": {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  }
  </code></pre>
  <br>
  <p><strong>Request body explanation:</strong></p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="left">Description</th>
  <th align="left">Required</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left">recipients</td>
  <td align="left">The list of recipients to send funds to</td>
  <td align="left">Yes</td>
  </tr>
  <tr>
  <td align="left">memo</td>
  <td align="left">Custom memo to attach to this transaction, this will only be visible within CoinPayments®</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">customData</td>
  <td align="left">Optional additional information for the spend request e.g. "UseHopAddress" for Ethereum</td>
  <td align="left">No</td>
  </tr>
  </tbody>
  </table>
  <p>When a request sent successfully then the server will return a response which will contain the next information</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "spendRequestId": "string",
    "spendRequestToken": "string"
  }
  </code></pre>
  <p><strong>The response explanation:</strong></p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="left">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left">spendRequestId</td>
  <td align="left">The id of the created request to spend funds</td>
  </tr>
  <tr>
  <td align="left">spendRequestToken</td>
  <td align="left">Additional validation token that must be sent up with the signed request</td>
  </tr>
  </tbody>
  </table>
  <h4><strong>Tutorial 3: Convert Coins</strong></h4>
  <p>This tutorial covers converting coins in your CoinPayments.net wallet from one currency to another using the API request <strong>/api/v1/accounts/{id}/convert</strong>. It also explains how to first check the conversion limits for a coin pairing and confirm that conversion for the given pair is supported. Even though a call to the request will throw an error if the coin pairing is not supported, it's good practice to check the amount you're planning to convert is within the minimum and maximum limits, with the additional benefit of finding out before making the convert request call if the pairing is supported or not.</p>
  <p>For create a transaction and convert funds from an account we'll send  <strong>HTTP</strong> request(<strong>POST</strong>) to <strong>/api/v1/accounts/{id}/convert</strong></p>
  <ul>
  <li>id - The id of the account for converting</li>
  </ul>
  <p>The request body should look like</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "convertToCurrency": 0,
    "recipients": [
      {
        "address": "string",
        "amount": "string"
      }
    ],
    "memo": "string",
    "customData": {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  }
  </code></pre>
  <p><strong>Request body explanation:</strong></p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="left">Description</th>
  <th align="left">Required</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left">convertToCurrency</td>
  <td align="left">Currency into which funds should be converted</td>
  <td align="left">Yes</td>
  </tr>
  <tr>
  <td align="left">recipients</td>
  <td align="left"></td>
  <td align="left">Yes</td>
  </tr>
  <tr>
  <td align="left">memo</td>
  <td align="left">Custom memo to attach to this transaction, this will only be visible within CoinPayments®</td>
  <td align="left">No</td>
  </tr>
  <tr>
  <td align="left">customData</td>
  <td align="left">Optional additional information</td>
  <td align="left">No</td>
  </tr>
  </tbody>
  </table>
  <p>When a request sent successfully then the server will return a response which will contain the next information</p>
  <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "spendRequestId": "string",
    "spendRequestToken": "string"
  }
  </code></pre>
  <p><strong>The response explanation:</strong></p>
  <table>
  <thead>
  <tr>
  <th align="left">Parameter</th>
  <th align="left">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="left">spendRequestId</td>
  <td align="left">The id of the created request to spend funds</td>
  </tr>
  <tr>
  <td align="left">spendRequestToken</td>
  <td align="left">Additional validation token that must be sent up with the signed request</td>
  </tr>
  </tbody>
  </table>
    
  
  <h4><strong>Tutorial 4: Using the MerchantCallback api endpoints</strong></h4>
  <p>This tutorial covers creating callback addresses CoinPayments.net using the API request <strong>/api/v1/merchant/callbacks</strong> and receiving IPNDTO on your url. It also explains how to list all callback addresses, find the callback address by its id, update information about the callback address and list information about all merchant transactions.</p>
  For sending any of these requests you have to use a pre-request for the authentication. Here is an example in JavaScript:
 <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">
  var clientId = "7aa5e7ba45d84d978c5ea7f62498abf4";
  var clientKey = "I1sCXrA4jS29f4JYk3mohCoErLHvpESW3XF83sxo/lg=";
  pm.request.headers.add({
      key: "X-CoinPayments-Client",
      value: clientId
  });
  var date = new Date().toUTCString();
  pm.request.headers.add({
      key: "X-CoinPayments-Timestamp",
      value: date
  });
  var text = pm.request.method + pm.request.url + clientId + date + pm.request.body;
  var hash = CryptoJS.HmacSHA256("\ufeff" + text, clientKey);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  pm.request.headers.add({
      key: "X-CoinPayments-Signature",
      value: hashInBase64
  });
    </code>
  </pre>
  
  <h4><strong>Receiving IPNDTO</strong></h4>

        <p>
          When merchant, for example, makes a transaction, the request is sent to the url specified for callback address.
          <br> To receive IPNDTO you should make 3 steps:
        <ol type="1">
          <li>Create callback address by using the request describing below, specify your callback url webhook.</li>
          <li>Deposit some crypto at the callback address.</li>
          <li>Receive a ipndto at your callback url webhook.</li>
        </ol>
      </p>

        <h4><strong>Part A: Creating callback addresses</strong></h4>
        <p>For creating callback addresses we'll send  <strong>HTTP</strong> request(<strong>POST</strong>) to <strong>/api/v1/merchant/callbacks</strong></p>
        <p>The request body should look like</p>
        <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "clientId":"7aa5e7ba45d84d978c5ea7f62498abf4",
    "currencyId":4,
    "label":"testcallbacketh",
    "webhook":{
        "nativeCurrencyId":1,
        "url":"https://google.com"
    }
}
</code></pre>
        <p><strong>Request body explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
            <th align="left">Required</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">clientId</td>
            <td align="left">The id of the currency the address will be receiving</td>
            <td align="left">No</td>
          </tr>
          <tr>
            <td align="left">currencyId</td>
            <td align="left">The id of the currency the address will be receiving</td>
            <td align="left">Yes</td>
          </tr>
          <tr>
            <td align="left">label</td>
            <td align="left">The label of the address (display only)</td>
            <td align="left">No</td>
          </tr>
          <tr>
            <td align="left">webhook</td>
            <td align="left">The webhook notification information and customizations</td>
            <td align="left">No</td>
          </tr>
          </tbody>
        </table>
        <p>When a request sent successfully then the server will return a response which will contain the next information</p>
        <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
     "id":"6Fa43sdVgjHuZRMuzei8ae",
     "clientId":"AaXX9g2Zp99ij2cvLVymTN",
     "created":"2020-10-28T09:44:54.9986654+00:00",
     "currencyId":4,
     "address":"0x4ca1a7a8332d4cad0abe4dbcb58c10d6edf4e315",
     "label":"testcallbacketh",
     "webhook":{
         "url":"https://google.com",
         "nativeCurrencyId":1
     }
}
  </code></pre>
        <p><strong>The response explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">id</td>
            <td align="left">The unique id of the callback address</td>
          </tr>
          <tr>
            <td align="left">clientId</td>
            <td align="left">The merchant client this callback address is linked to</td>
          </tr>
          <tr>
            <td align="left">created</td>
            <td align="left">The timestamp of when the callback address was created</td>
          </tr>
          <tr>
            <td align="left">currencyId</td>
            <td align="left">The id of the currency the address is receiving</td>
          </tr>
          <tr>
            <td align="left">address</td>
            <td align="left">The actual deposit address</td>
          </tr>
          <tr>
            <td align="left">label</td>
            <td align="left">The display label of the callback address</td>
          </tr>
          <tr>
            <td align="left">webhook</td>
            <td align="left">The webhook notification information and customizations</td>
          </tr>
          </tbody>
        </table>
        
        <h4><strong>Part B: Sending a request to spend funds from the account</strong></h4>
        <p>This part was described in the Tutorial 2.</p>
        
        After making these steps the request will be sent on your url.
      <p>The body of the request contains next information:</p>
      <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
  "id": "bdaae1f4c051445099325f384a74e46b",
  "type": "CallbackDepositConfirmed",
  "timestamp": "2020-10-15T13:16:56.27704444+00:00",
  "transaction": {
    "callbackAddressId": "Lhdrs8hw6z3WWpHD6oMBea",
    "address": "0x4723e2edcdedd471e016b03765df8f9c56572c69",
    "currency": {
      "id": "4",
      "symbol": "ETH",
      "name": "Ethereum",
    },
    "amount": {
      "currencyId": "0",
      "displayValue": "0.000000000000000001",
      "value": "1"
    },
    "coinPaymentsFee": {
      "currencyId": "0",
      "displayValue": "0.000000000000000000",
      "value": "0"
    },
    "nativeCurrency": {
      "id": "1",
      "symbol": "BTC",
      "name": "Bitcoin",
    },
    "nativeAmount": {
      "currencyId": "0",
      "displayValue": "0.00000000",
      "value": "0"
    },
    "nativeCoinPaymentsFee": {
      "currencyId": "0",
      "displayValue": "0.00000000",
      "value": "0"
    },
    "status": "Confirmed"
  }
}
  </code></pre>
      <p><strong>The response explanation:</strong></p>
      <table>
        <thead>
        <tr>
          <th align="left">Parameter</th>
          <th align="left">Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td align="left">id</td>
          <td align="left">The unique id of the ipn notification</td>
        </tr>
        <tr>
          <td align="left">type</td>
          <td align="left">The type of notification</td>
        </tr>
        <tr>
          <td align="left">timestamp</td>
          <td align="left">The timestamp of when the notification was generated</td>
        </tr>
        <tr>
          <td align="left">invoice</td>
          <td align="left">The invoice the notification was sent for</td>
        </tr>
        <tr>
          <td align="left">payouts</td>
          <td align="left">The payout information of the invoice, once available</td>
        </tr>
        <tr>
          <td align="left">transaction</td>
          <td align="left">Callback deposit transaction</td>
        </tr>
        <tr>
          <td align="left">customdata</td>
          <td align="left">Any custom data associated with the callback address, specified at the time when the callback address was created</td>
        </tr>
        </tbody>
      </table>
      
      
      <h4><strong>Other requests which can be helpful for working with callbacks:</strong></h4>
      </br>
        <h4><strong> List of all callback addresses</strong></h4>
        <p>For list all callback addresses sorted descending by the creation date we'll send  <strong>HTTP</strong> request(<strong>GET</strong>) to <strong>/api/v1/merchant/callbacks</strong></p>
        <ul>
          <li>clientId - The merchant client id whose callback address should be listed</li>
          <li>currencyId - The id of the currency the address was receiving</li>
          <li>after - </li>
          <li>limit - </li>
        </ul>
        <p>When a request sent successfully then the server will return a response which will contain the next information</p>
       <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
     "items":[{
         "id":"6Fa43sdVgjHuZRMuzei8ae",
          "clientId":"AaXX9g2Zp99ij2cvLVymTN",
          "created":"2020-10-28T09:44:54.998665+00:00",
          "currencyId":4,
          "address":"0x4ca1a7a8332d4cad0abe4dbcb58c10d6edf4e315",
          "label":"testcallbacketh",
          "webhook":{
              "url":"https://google.com",
              "nativeCurrencyId":1
          }
     }],
     "paging":{
          "cursors":{
              "before":"WpESICZ72Ag=",
              "after":"At0ZPLdf2Ag="
          },
          "limit":100
     }
}
  </code></pre>
        <p><strong>The response explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">items</td>
            <td align="left">Information about the callback address</td>
          </tr>
          <tr>
            <td align="left">paging</td>
            <td align="left"></td>
          </tr>
          </tbody>
        </table>

        <h4><strong>Searching the callback address by id</strong></h4>
        <p>For listing all callback addresses with the same id we'll send  <strong>HTTP</strong> request(<strong>GET</strong>) to <strong>/api/v1/merchant/callbacks/{id}</strong></p>
        <ul>
          <li>id - The id of the callback address</li>
        </ul>
        <p>When a request sent successfully then the server will return a response which will contain the next information</p>
        <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
     "id":"56NVoGgbkPxStkhTjokV8E",
     "clientId":"AaXX9g2Zp99ij2cvLVymTN",
     "created":"2020-09-28T13:43:10.01129+00:00",
     "currencyId":4,
     "address":"0xbb050a0ab1e6a801ed6d2c7eac775737dea7d11e",
     "label":"testcallbacketh",
     "webhook":{
         "url":"https://google.com",
         "nativeCurrencyId":1
     }
}
  </code></pre>
        <p><strong>The response explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">id</td>
            <td align="left">The unique id of the callback address</td>
          </tr>
          <tr>
            <td align="left">clientId</td>
            <td align="left">The merchant client this callback address is linked to</td>
          </tr>
          <tr>
            <td align="left">created</td>
            <td align="left">The timestamp of when the callback address was created</td>
          </tr>
          <tr>
            <td align="left">currencyId</td>
            <td align="left">The id of the currency the address is receiving</td>
          </tr>
          <tr>
            <td align="left">address</td>
            <td align="left">The actual deposit address</td>
          </tr>
          <tr>
            <td align="left">label</td>
            <td align="left">The display label of the callback address</td>
          </tr>
          <tr>
            <td align="left">webhook</td>
            <td align="left">The webhook notification information and customizations</td>
          </tr>
          </tbody>
        </table>

        <h4><strong>Updating a callback address</strong></h4>
        <p>For updating a callback address we'll send  <strong>HTTP</strong> request(<strong>PUT</strong>) to <strong>/api/v1/merchant/callbacks/{id}</strong></p>
        <ul>
          <li>id - The id of the callback address</li>
        </ul>
        <p>The request body should look like</p>
        <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "clientId":"7aa5e7ba45d84d978c5ea7f62498abf4",
    "currencyId":4,
    "label":"testcallbacketh",
    "webhook":{
        "nativeCurrencyId":1,
        "url":"https://google.com"
    }
}
  </code></pre>
        <p><strong>Request body explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
            <th align="left">Required</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">label</td>
            <td align="left">The label of the address (display only)</td>
            <td align="left">No</td>
          </tr>
          <tr>
            <td align="left">webhook</td>
            <td align="left">The webhook notification information and customizations</td>
            <td align="left">No</td>
          </tr>
          </tbody>
        </table>
        <p>When a request sent successfully then the server will return a response which will contain the status 204(No content)</p>




        <h4><strong>Listing all deposit transactions to callback addresses</strong></h4>
        <p>For listing all deposit transactions to callback addresses, ordered newest first and optionally filtering by address, currency and date range we'll send  <strong>HTTP</strong> request(<strong>GET</strong>) to <strong>/api/v1/merchant/callbacks/{id}</strong></p>
        <ul>
          <li>callbackId - The id of the callback address</li>
          <li>currencyId - </li>
          <li>from - </li>
          <li>to - </li>
          <li>after - </li>
          <li>limit - </li>

        </ul>
        <p>When a request sent successfully then the server will return a response which will contain the next information</p>
        <pre style="background-color: #1e1e1e"><code style="color: rgb(240,240,240);">{
    "items":[{
        "id":"Dv1vDiDmfVrgSkEB2bLcUA",
        "created":"2020-09-25T08:36:23.470791+00:00",
        "completed":"2020-09-25T08:36:23.470793+00:00",
        "callbackAddressId":"JhmojzDdEJA8qJ4fF3zkT9",
        "address":"V7dHXKN6jKFXQrV3AKsYiePNezcgf7Cn2h",
        "currency":{
            "id":"33","symbol":"VLX",
            "name":"Velas","decimalPlaces":18},
            "nativeCurrency":{
                "id":"1",
                "symbol":"BTC",
                "name":"Bitcoin",
                "decimalPlaces":8
            },
            "amount":{
                "displayValue":"81.282438450358048310",
                "value":"81282438450358048310",
                "amount":"81282438450358048310",
                "currencyId":"0"
            },
            "coinPaymentsFee":{
                "displayValue":"0.406412192251790242",
                "value":"406412192251790242",
                "amount":"406412192251790242",
                "currencyId":"0"
            },
            "nativeAmount":{
                "displayValue":"0.00030505",
                "value":"30505",
                "amount":"30505",
                "currencyId":"1"
            },
            "nativeCoinPaymentsFee":{
                "displayValue":"0.00000153",
                "value":"153",
                "amount":"153",
                "currencyId":"1"
            },
            "status":"PaidOut"
        }],
        "paging":{
            "cursors":{
                "before":"xnPHFS5h2Ag=",
                "after":"TPRdkbdf2Ag="
            },
            "limit":100
        }
}
  </code></pre>
        <p><strong>The response explanation:</strong></p>
        <table>
          <thead>
          <tr>
            <th align="left">Parameter</th>
            <th align="left">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td align="left">items</td>
            <td align="left">Information about callback address</td>
          </tr>
          <tr>
            <td align="left">paging</td>
            <td align="left"></td>
          </tr>
          <tr>
          </tbody>
        </table>

</div>
</div>
</div>
<div>
  

</div>
`;
        var contentHtml = `        <div id="section/UseCasesExamples" data-section-id="section/UseCasesExamples" class="sc-ifAKCX dluJDj">          <div class="sc-gzVnrw eesUPo">            <div class="sc-bxivhb cjtbAK">              <h1 class="sc-htoDjs WxWXp"><a class="sc-VigVT kGvRyb" href="#section/UseCasesExamples"></a>Use Cases Examples              </h1>            </div>          </div>          <div id="section/Authent/oauth2" data-section-id="section/Authentication/oauth2"            class="sc-ifAKCX dluJDj">            <div class="sc-gzVnrw eesUPo">              <div class="sc-bxivhb cjtbAK">                ${tutorialsHtml}                </div>              </div>            </div>          </div>        </div>`;

        var tablist = $("#tabs-list");
        tablist.insertBefore(createElementFromHTML(tabHtml), tablist.firstChild);
        tablist.firstChild.firstChild.addEventListener('click', function () { window.location.hash = "#section/UseCasesExamples"; });
        window.location.hash = "#section/UseCasesExamples";

        var apiContent = $("#apiContent")
        apiContent.insertBefore(createElementFromHTML(contentHtml), apiContent.firstChild.nextSibling);

    }, 1000);

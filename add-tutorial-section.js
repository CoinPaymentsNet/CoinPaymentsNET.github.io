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
  <pre class="language-js"><code class= "language-js"><span class="token punctuation">{</span>
     "id"<span class="token punctuation">:</span><span class="token number"> 1</span><span class="token punctuation">,</span>
     "type"<span class="token punctuation">:</span><span class="token string"> "crypto"</span><span class="token punctuation">,</span>
     "symbol"<span class="token punctuation">:</span><span class="token string"> "BTC"</span><span class="token punctuation">,</span>
     "name"<span class="token punctuation">:</span><span class="token string"> "Bitcoin"</span><span class="token punctuation">,</span>
     "logo"<span class="token punctuation">:</span><span class="token punctuation"> {</span>
        "imageUrl"<span class="token punctuation">:</span><span class="token string"> "https://api.coinpayments.net/static/img/coins/64x64/1.png"</span><span class="token punctuation">,</span>
        "vectorUrl"<span class="token punctuation">:</span><span class="token string"> "https://api.coinpayments.net/static/img/coins/vector/1.svg"</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
     "decimalPlaces"<span class="token punctuation">:</span><span class="token number"> 8</span><span class="token punctuation">,</span>
     "rank"<span class="token punctuation">:</span><span class="token number"> 1</span><span class="token punctuation">,</span>
     "status"<span class="token punctuation">:</span><span class="token string"> "active"</span><span class="token punctuation">,</span>
     "capabilities"<span class="token punctuation">:</span>
     <span class="token punctuation">[</span>
        <span class="token string">"multiSigAccounts"</span><span class="token punctuation">,</span>
        <span class="token string">"singleSigAccounts"</span>
     <span class="token punctuation">]</span><span class="token punctuation">,</span>
     "urls"<span class="token punctuation">:</span><span class="token punctuation"> {</span>
        "websites"<span class="token punctuation">:</span>
        <span class="token punctuation">[</span>
           <span class="token string">"https://bitcoin.org"</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        "explorers"<span class="token punctuation">:</span>
        <span class="token punctuation">[</span>
           <span class="token string">"https://blockchain.info"</span>
        <span class="token punctuation">]</span>
     <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
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
  <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>
    "items"<span class="token punctuation">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        "baseCurrencyId"<span class="token punctuation">:</span> <span class="token number">1</span>,
        "quoteCurrencyId"<span class="token punctuation">:</span> <span class="token number">5057</span>,
        "rate"<span class="token punctuation">:</span> <span class="token string">"8896.619359154478102279714028"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  </code></pre>
  <h4><strong>Part C: Checkout</strong></h4>
  <p>The next example explains how to create a payment using the CoinPayments.net API in order to accept payment in your e-commerce system during the checkout process. You will need to know the following information in order to create the payment:</p>
  <ul>
  <li>The total price that you wish to charge for the payment.</li>
  <li>Buyer personal data (name, email, phone, etc)</li>
  </ul>
  <p>For creating new payment we will send <strong>HTTP</strong> request (<strong>POST</strong>) to <strong>/api/v1/invoices</strong>. The request body should look like</p>
  <pre class="language-js"><code class="language-js">{
    "clientId": <span class="token string">"string"</span>,
    "currencyId": <span class="token number">0</span>,
    "invoiceId": <span class="token string">"string"</span>,
    "buyer": {
      "companyName": <span class="token string">"string"</span>,
      "name": {
        "firstName": <span class="token string">"string"</span>,
        "lastName": <span class="token string">"string"</span>
      },
      "emailAddress": <span class="token string">"user@example.com"</span>,
      "phoneNumber": <span class="token string">"string"</span>,
      "address": {
        "address1": <span class="token string">"string"</span>,
        "address2": <span class="token string">"string"</span>,
        "address3": <span class="token string">"string"</span>,
        "provinceOrState": <span class="token string">"string"</span>,
        "city": <span class="token string">"string"</span>,
        "suburbOrDistrict": <span class="token string">"string"</span>,
        "countryCode": <span class="token string">"string"</span>,
        "postalCode": <span class="token string">"string"</span>
      }
    },
    "description": <span class="token string">"string"</span>,
    "items": [
      {
        "customId": <span class="token string">"string"</span>,
        "sku": <span class="token string">"string"</span>,
        "name": <span class="token string">"string"</span>,
        "description": <span class="token string">"string"</span>,
        "quantity": <span class="token number">0</span>,
        "originalAmount": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "amount": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "tax": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        }
      }
    ],
    "amount": {
      "breakdown": {
        "subtotal": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "shipping": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "handling": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "taxTotal": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        },
        "discount": {
          "currencyId": <span class="token number">0</span>,
          "displayValue": <span class="token string">"string"</span>,
          "value": <span class="token string">"string"</span>
        }
      },
      "currencyId": <span class="token number">0</span>,
      "displayValue": <span class="token string">"string"</span>,
      "value": <span class="token string">"string"</span>
    },
    "shipping": {
      "method": <span class="token string">"string"</span>,
      "companyName": <span class="token string">"string"</span>,
      "name": {
        "firstName": <span class="token string">"string"</span>,
        "lastName": <span class="token string">"string"</span>
      },
      "emailAddress": <span class="token string">"user@example.com"</span>,
      "phoneNumber": <span class="token string">"string"</span>,
      "address": {
        "address1": <span class="token string">"string"</span>,
        "address2": <span class="token string">"string"</span>,
        "address3": <span class="token string">"string"</span>,
        "provinceOrState": <span class="token string">"string"</span>,
        "city": <span class="token string">"string"</span>,
        "suburbOrDistrict": <span class="token string">"string"</span>,
        "countryCode": <span class="token string">"string"</span>,
        "postalCode": <span class="token string">"string"</span>
      }
    },
    "requireBuyerNameAndEmail": <span class="token boolean">true</span>,
    "buyerDataCollectionMessage": <span class="token string">"string"</span>,
    "notesToRecipient": <span class="token string">"string"</span>,
    "termsAndConditions": <span class="token string">"string"</span>,
    "customData": {
      "additionalProp1": <span class="token string">"string"</span>,
      "additionalProp2": <span class="token string">"string"</span>,
      "additionalProp3": <span class="token string">"string"</span>
    },
    "metadata": {
      "integration": <span class="token string">"string"</span>,
      "hostname": <span class="token string">"string"</span>
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
  <pre class="language-js"><code class="language-js">{
    "recipients": [
      {
        "address": <span class="token string">"string"</span>,
        "amount": <span class="token string">"string"</span>
      }
    ],
    "memo": <span class="token string">"string"</span>,
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
  <pre class="language-js"><code class="language-js">{
    "spendRequestId": <span class="token string">"string"</span>,
    "spendRequestToken": <span class="token string">"string"</span>
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
  <pre class="language-js"><code class="language-js">{
    "convertToCurrency": <span class="token number">0</span>,
    "recipients": [
      {
        "address": <span class="token string">"string"</span>,
        "amount": <span class="token string">"string"</span>
      }
    ],
    "memo": <span class="token string">"string"</span>,
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
  <pre class="language-js"><code class="language-js">{
    "spendRequestId": <span class="token string">"string"</span>,
    "spendRequestToken": <span class="token string">"string"</span>
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
  <pre class="language-js">
    <code class="language-js">
  <span class="token keyword">var</span> clientId = <span class="token string">"7aa5e7ba45d84d978c5ea7f62498abf4"</span>;
  <span class="token keyword">var</span> clientKey = <span class="token string">"I1sCXrA4jS29f4JYk3mohCoErLHvpESW3XF83sxo/lg="</span>;
  pm.request.headers.<span class="token function">add</span>({
      key: <span class="token string">"X-CoinPayments-Client"</span>,
      value: clientId
  });
  <span class="token keyword">var</span> date = <span class="token keyword">new</span> <span class="token function">Date()</span>.<span class="token function">toUTCString()</span>;
  pm.request.headers.<span class="token function">add</span>({
      key: <span class="token string">"X-CoinPayments-Timestamp"</span>,
      value: date
  });
  <span class="token keyword">var</span> text = pm.request.method + pm.request.url + clientId + date + pm.request.body;
  <span class="token keyword">var</span> hash = CryptoJS.<span class="token function">HmacSHA256</span>("\ufeff" + text, clientKey);
  <span class="token keyword">var</span> hashInBase64 = CryptoJS.enc.Base64.<span class="token function">stringify</span>(hash);
  pm.request.headers.<span class="token function">add</span>({
      key: <span class="token string">"X-CoinPayments-Signature"</span>,
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
        <pre class="language-js"><code class="language-js">{
    "clientId":<span class="token string">"7aa5e7ba45d84d978c5ea7f62498abf4"</span>,
    "currencyId":<span class="token number">4</span>,
    "label":<span class="token string">"testcallbacketh"</span>,
    "webhook":{
        "nativeCurrencyId":<span class="token number">1</span>,
        "url":<span class="token string">"https://google.com"</span>
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
        <pre class="language-js"><code class="language-js">{
     "id":<span class="token string">"6Fa43sdVgjHuZRMuzei8ae"</span>,
     "clientId":<span class="token string">"AaXX9g2Zp99ij2cvLVymTN"</span>,
     "created":<span class="token string">"2020-10-28T09:44:54.9986654+00:00"</span>,
     "currencyId":<span class="token number">4</span>,
     "address":<span class="token string">"0x4ca1a7a8332d4cad0abe4dbcb58c10d6edf4e315"</span>,
     "label":<span class="token string">"testcallbacketh"</span>,
     "webhook":{
         "url":<span class="token string">"https://google.com"</span>,
         "nativeCurrencyId":<span class="token number">1</span>
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
      <pre class="language-js"><code class="language-js">{
  "id": <span class="token string">"bdaae1f4c051445099325f384a74e46b"</span>,
  "type": <span class="token string">"CallbackDepositConfirmed"</span>,
  "timestamp": <span class="token string">"2020-10-15T13:16:56.27704444+00:00"</span>,
  "transaction": {
    "callbackAddressId": <span class="token string">"Lhdrs8hw6z3WWpHD6oMBea"</span>,
    "address": <span class="token string">"0x4723e2edcdedd471e016b03765df8f9c56572c69"</span>,
    "currency": {
      "id": <span class="token string">"4"</span>,
      "symbol": <span class="token string">"ETH"</span>,
      "name": <span class="token string">"Ethereum"</span>,
    },
    "amount": {
      "currencyId": <span class="token string">"0"</span>,
      "displayValue": <span class="token string">"0.000000000000000001"</span>,
      "value": <span class="token string">"1"</span>
    },
    "coinPaymentsFee": {
      "currencyId": <span class="token string">"0"</span>,
      "displayValue": <span class="token string">"0.000000000000000000"</span>,
      "value": <span class="token string">"0"</span>
    },
    "nativeCurrency": {
      "id": <span class="token string">"1"</span>,
      "symbol": <span class="token string">"BTC"</span>,
      "name": <span class="token string">"Bitcoin"</span>,
    },
    "nativeAmount": {
      "currencyId": <span class="token string">"0"</span>,
      "displayValue": <span class="token string">"0.00000000"</span>,
      "value": <span class="token string">"0"</span>
    },
    "nativeCoinPaymentsFee": {
      "currencyId": <span class="token string">"0"</span>,
      "displayValue": <span class="token string">"0.00000000"</span>,
      "value": <span class="token string">"0"</span>
    },
    "status": <span class="token string">"Confirmed"</span>
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
        <pre class="language-js"><code class="language-js">{
     "items":[{
         "id":<span class="token string">"6Fa43sdVgjHuZRMuzei8ae"</span>,
          "clientId":<span class="token string">"AaXX9g2Zp99ij2cvLVymTN"</span>,
          "created":<span class="token string">"2020-10-28T09:44:54.998665+00:00"</span>,
          "currencyId":<span class="token number">4</span>,
          "address":<span class="token string">"0x4ca1a7a8332d4cad0abe4dbcb58c10d6edf4e315"</span>,
          "label":<span class="token string">"testcallbacketh"</span>,
          "webhook":{
              "url":<span class="token string">"https://google.com"</span>,
              "nativeCurrencyId":<span class="token number">1</span>
          }
     }],
     "paging":{
          "cursors":{
              "before":<span class="token string">"WpESICZ72Ag="</span>,
              "after":<span class="token string">"At0ZPLdf2Ag="</span>
          },
          "limit":<span class="token number">100</span>
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
        <pre class="language-js"><code class="language-js">{
     "id":<span class="token string">"56NVoGgbkPxStkhTjokV8E"</span>,
     "clientId":<span class="token string">"AaXX9g2Zp99ij2cvLVymTN"</span>,
     "created":<span class="token string">"2020-09-28T13:43:10.01129+00:00"</span>,
     "currencyId":<span class="token number">4</span>,
     "address":<span class="token string">"0xbb050a0ab1e6a801ed6d2c7eac775737dea7d11e"</span>,
     "label":<span class="token string">"testcallbacketh"</span>,
     "webhook":{
         "url":<span class="token string">"https://google.com"</span>,
         "nativeCurrencyId":<span class="token number">1</span>
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
        <pre class="language-js"><code class="language-js">{
    "clientId":<span class="token string">"7aa5e7ba45d84d978c5ea7f62498abf4"</span>,
    "currencyId":<span class="token number">4</span>,
    "label":<span class="token string">"testcallbacketh"</span>,
    "webhook":{
        "nativeCurrencyId":<span class="token number">1</span>,
        "url":<span class="token string">"https://google.com"</span>
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
        <pre class="language-js"><code class="language-js">{
    "items":[{
        "id":<span class="token string">"Dv1vDiDmfVrgSkEB2bLcUA"</span>,
        "created":<span class="token string">"2020-09-25T08:36:23.470791+00:00"</span>,
        "completed":<span class="token string">"2020-09-25T08:36:23.470793+00:00"</span>,
        "callbackAddressId":<span class="token string">"JhmojzDdEJA8qJ4fF3zkT9"</span>,
        "address":<span class="token string">"V7dHXKN6jKFXQrV3AKsYiePNezcgf7Cn2h"</span>,
        "currency":{
            "id":<span class="token string">"33"</span>,"symbol":<span class="token string">"VLX"</span>,
            "name":<span class="token string">"Velas"</span>,"decimalPlaces":<span class="token number">18</span>},
            "nativeCurrency":{
                "id":<span class="token string">"1"</span>,
                "symbol":<span class="token string">"BTC"</span>,
                "name":<span class="token string">"Bitcoin"</span>,
                "decimalPlaces":<span class="token number">8</span>
            },
            "amount":{
                "displayValue":<span class="token string">"81.282438450358048310"</span>,
                "value":<span class="token string">"81282438450358048310"</span>,
                "amount":<span class="token string">"81282438450358048310"</span>,
                "currencyId":<span class="token string">"0"</span>
            },
            "coinPaymentsFee":{
                "displayValue":<span class="token string">"0.406412192251790242"</span>,
                "value":<span class="token string">"406412192251790242"</span>,
                "amount":<span class="token string">"406412192251790242"</span>,
                "currencyId":<span class="token string">"0"</span>
            },
            "nativeAmount":{
                "displayValue":<span class="token string">"0.00030505"</span>,
                "value":<span class="token string">"30505"</span>,
                "amount":<span class="token string">"30505"</span>,
                "currencyId":<span class="token string">"1"</span>
            },
            "nativeCoinPaymentsFee":{
                "displayValue":<span class="token string">"0.00000153"</span>,
                "value":<span class="token string">"153"</span>,
                "amount":<span class="token string">"153"</span>,
                "currencyId":<span class="token string">"1"</span>
            },
            "status":<span class="token string">"PaidOut"</span>
        }],
        "paging":{
            "cursors":{
                "before":<span class="token string">"xnPHFS5h2Ag="</span>,
                "after":<span class="token string">"TPRdkbdf2Ag="</span>
            },
            "limit":<span class="token number">100</span>
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
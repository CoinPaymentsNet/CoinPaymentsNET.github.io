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
  <pre><code>{
     "id":1,
     "type":"crypto",
     "symbol":"BTC",
     "name":"Bitcoin",
     "logo":{
        "imageUrl":"https://alpha-api.coinpayments.net/static/img/coins/64x64/1.png",
        "vectorUrl":"https://alpha-api.coinpayments.net/static/img/coins/vector/1.svg"
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
  <pre><code>{
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
  <pre><code>{
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
  <pre><code>{
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
  <pre><code>{
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
  <pre><code>{
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
  <pre><code>{
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
      </div>
    </div>
  </div>
  <div>

</div>
`;
        var contentHtml = `        <div id="section/UseCasesExamples" data-section-id="section/UseCasesExamples" class="sc-ifAKCX dluJDj">          <div class="sc-gzVnrw eesUPo">            <div class="sc-bxivhb cjtbAK">              <h1 class="sc-htoDjs WxWXp"><a class="sc-VigVT kGvRyb" href="#section/UseCasesExamples"></a>Use Cases Examples              </h1>            </div>          </div>          <div id="section/Authentication/oauth2" data-section-id="section/Authentication/oauth2"            class="sc-ifAKCX dluJDj">            <div class="sc-gzVnrw eesUPo">              <div class="sc-bxivhb cjtbAK">                ${tutorialsHtml}                </div>              </div>            </div>          </div>        </div>`;

        var tablist = $("#tabs-list");
        tablist.insertBefore(createElementFromHTML(tabHtml), tablist.firstChild);
        tablist.firstChild.firstChild.addEventListener('click', function () { window.location.hash = "#section/UseCasesExamples"; });
        window.location.hash = "#section/UseCasesExamples";

        var apiContent = $("#apiContent")
        apiContent.insertBefore(createElementFromHTML(contentHtml), apiContent.firstChild.nextSibling);

    }, 1000);
var $ = document.querySelector.bind(document);
$("img").parentElement.style.setProperty('padding', '7%');

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

setTimeout(function () {
    var tabHtml = '<li data-item-id="section/CustomButtons" class="sc-hrWEMg bbViyS"><label type="section" role="menuite" class="sc-eTuwsz iNzLCk -depth1"><span title="Authentication" class="sc-gwVKww fyUykq">Custom Buttons</span></label></li>';

    var tutorialsHtml = `

<div class="sc-gzVnrw sc-ibxdXY bSFXlp" xmlns="http://www.w3.org/1999/html">
<div class="container-fluid">
<div class="sc-bxivhb cjtbAK">
    <div class="row ml-1" style="margin-top: 30px;">
        <div class="col-md-4" style="float: left; width: 50%;">
            <h1>Include JavaScript SDK</h1>
            <p>
                This integration uses the CoinPayments JavaScript SDK to integrate the Payment button into your site without any server side code.
            </p>
            <p>
                Add the CoinPayments JavaScript SDK <code>&lt;script&gt;</code> tag to your page <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code> section as shown in the example.
            </p>
        </div>
        <div id="webhooks-log-container" class="col-md-5" style="float: left; width: 50%;">
                <div id="webhooks-log">
                    <pre class="language-html"><code style="color: rgb(240,240,240);" class="language-html">
  &lt;<span class="token tag">html</span>>
    &lt;<span class="token tag">head</span>>
      &lt;<span class="token tag">script</span> <span class="token attr-name">src</span>=<span class="token attr-value">"https://checkout.coinpayments.net/static/js/checkout.js"</span>>&lt;/<span class="token tag">script</span>>
    &lt;/<span class="token tag">head</span>>
    &lt;<span class="token tag">body</span>>
      <span class="token comment">&lt;!-- ... --></span>
    &lt;/<span class="token tag">body</span>>
  &lt;/<span class="token tag">html</span>>
</pre></code>
            </div>
        </div>
    </div>
</div>
</div>
</div>
<div class="sc-gzVnrw sc-ibxdXY bSFXlp">
<div class="sc-bxivhb cjtbAK">
    <div class="row ml-1" style="margin-top: 30px;">
        <div class="col-md-4" style="float: left; width: 50%;">
            <h1>Simple Button</h1>
            <p>
                Creates a simple CoinPayments button which upon clicking creates an invoice for $1.23 USD and renders the button into a <code>&lt;div&gt;</code> on the page.
            </p>
            <p class="text-muted">
                Note: These samples use client side integration calling the CoinPayments API directly, the <code>createInvoice</code> method can just as well make a call to your server, it just needs to return a <code>Promise&lt;string&gt;</code> that resolves to the CoinPayments invoice <code>id</code>.
            </p>
        </div>
        <div id="webhooks-log-container" class="col-md-5" style="float: left; width: 50%;">
            <div id="webhooks-log" style="margin-bottom: 2vh;">
                    <pre class="language-js"><code style="color: rgb(240,240,240);" class="language-js">
  CoinPayments.<span class="token function">Button</span>({

    <span class="token comment">//
    // the \`createInvoice\` method is called when the user presses the
    // Pay with CoinPayments button.
    //</span>

    <span class="token function">createInvoice</span>: <span class="token keyword">async function</span> (data, actions) {
      <span class="token keyword">const</span> invoiceId = <span class="token keyword">await</span> actions.invoice.<span class="token function">create</span>({
        clientId: <span class="token string">"CoinPaymentsDemoClient"</span>,
        amount: {
          currencyId: <span class="token string">"5057"</span>,    <span class="token comment">// USD</span>
          value: <span class="token string">"123"</span>           <span class="token comment">// $ 1.23 USD  (123 cents)</span>
        },
        requireBuyerNameAndEmail: <span class="token boolean">true</span>,
        buyerDataCollectionMessage: <span class="token string">"Your email and name is collected for customer service purposes such as order fulfillment."</span>
      });
      <span class="token keyword">return</span> invoiceId;
    }

    <span class="token comment">//
    // the button is rendered into a div with id \`cps-button-container-1\`
    //</span>

  }).<span class="token function">render</span>(<span class="token string">"cps-button-container-1"</span>);</code>
</pre></div>
        </div>
    </div>
</div>
<div class="sc-EHOje sc-bZQynM dtUibw">
        <div class="col-md-3 text-center" style = "margin-top: 25%;">
            <h3 class="mb-5">Try it out</h3>
            <div id="cps-button-container-1" ></div>
        </div>
</div>
</div>
<div class="sc-gzVnrw sc-ibxdXY bSFXlp">
<div class="sc-bxivhb cjtbAK">
    <div class="row ml-1" style="margin-top: 30px;">
        <div class="col-md-4" style="float: left; width: 50%;">
            <h1>Customized Style</h1>
            <p>
                The <code>color</code> and <code>style</code> of the button can be customized by specifying an additional style object.  The available colours are <code>white</code> (default), <code>black</code> and <code>blue</code>.  Optionally a <code>width</code> can also be specified, if not provided then the button defaults to <code>225</code> pixels wide.
            </p>
        </div>
        <div id="webhooks-log-container" class="col-md-5" style="float: left; width: 50%;">
            <div id="webhooks-log">
                    <pre class="language-js"><code style="color: rgb(240,240,240);" class="language-js">
  CoinPayments.<span class="token function">Button</span>({
    style: {
      color: <span class="token string">"blue"</span>,
      width: <span class="token number">180</span>
    },
    <span class="token function">createInvoice</span>: function (data, actions) {
      <span class="token comment">// ... see above</span>
    }
  }).<span class="token function">render</span>(<span class="token string">"cps-button-container-2"</span>);</code></pre>
</div>
        </div>
    </div>
    </div>
    <div class="sc-EHOje sc-bZQynM dtUibw">
        <div class="col-md-3 text-center" style = "margin-top: 25%;">
            <h3 class="mb-5">Try it out</h3>
            <div id="cps-button-container-2"></div>
        </div>
    </div>
</div>
<div class="sc-gzVnrw sc-ibxdXY bSFXlp">
    <div class="sc-bxivhb cjtbAK">
        <div class="row ml-1" style="margin-top: 30px;">
            <div class="col-md-4" style="float: left; width: 50%;">
                <h1>Items and details</h1>
                <p>
                    Additional details about the invoice can be provided and they'll appear on the checkout screens and your dashboard.  See the documentation for a full definition of all the properties accepted by the <code>invoice.create</code> method.
                </p>
                <p class="text-muted">
                    Note: When a <code>breakdown</code> and additional prices are specified they must add up to the invoice total.  The <code>subtotal</code> must be the sum of the <code>items</code> amounts and the total the sum of all amounts in the breakdown.
                </p>
                <p class="text-muted">
                    Note: The <code>currencyId</code> can be specified at the level of the invoice, then all monetary amounts are assumed to be in that currency.
                </p>
            </div>
            <div id="webhooks-log-container" class="col-md-5" style="float: left; width: 50%;">
                <div id="webhooks-log">
                        <pre class="language-js"><code style="color: rgb(240,240,240);" class="language-js">
      {
        clientId: <span class="token string">"CoinPaymentsDemoClient"</span>,
        currencyId: <span class="token string">"5057"</span>,  <span class="token comment">// USD</span>
        items: [
        {
          name: <span class="token string">"First test item in the cart"</span>,
          description: <span class="token string">"this is a description of the first test item"</span>,
          quantity: 1,
          amount: <span class="token string">"1000"</span>    <span class="token comment">// $ 10.00 USD</span>
        },
        {
          name: <span class="token string">"There are two of these items"</span>,
          description: <span class="token string">"this is the second item in the shopping cart"</span>,
          quantity: <span class="token number">2</span>,
          amount: <span class="token string">"1234"</span>    <span class="token comment">// $ 12.34 USD</span>
        }
        ],
        amount: {
          breakdown: {
            subtotal: <span class="token string">"2234"</span>, <span class="token comment">// $ 22.34 USD (items 10.00 + 12.34)</span>
            shipping: <span class="token string">"999"</span>,  <span class="token comment">// $ 9.99 USD</span>
            handling: <span class="token string">"100"</span>,  <span class="token comment">// $ 1.00 USD</span>
            taxTotal: <span class="token string">"500"</span>   <span class="token comment">// $ 5.00 USD</span>
          },
          value: <span class="token string">"3833"</span>       <span class="token comment">// $ 31.33 USD total</span>
        }
      }</code></pre>
    </div>
            </div>
        </div>
    </div>
    <div class="sc-EHOje sc-bZQynM dtUibw">
        <div class="col-md-3 text-center" style = "margin-top: 25%; ">
            <h3 class="mb-5">Try it out</h3>
            <div id="cps-button-container-3"></div>
        </div>
    </div>
</div>
<div class="sc-gzVnrw sc-ibxdXY bSFXlp">
    <div class="sc-bxivhb cjtbAK">
        <div class="row ml-1" style="margin-top: 30px;">
            <div class="col-md-4" style="float: left; width: 50%;">
                <h1>Callbacks</h1>
                <p>
                    Implement the <code>onConfirmed</code> method which is called after the invoice has been paid and the payments confirmed on the blockchain.
                    You'll want to validate the payment here on the server side before completing the order in your system.
                </p>
                <p>
                    Likewise implement the <code>onCancelled</code> method which is called when the invoice payment is cancelled.  For example by the user closing
                    the payment window or the invoice expiring before payment is completed.
                </p>
                <p class="text-muted">
                    Note: You can specify the <code>invoiceId</code> and a <code>customData</code> dictionary of strings to store additional data along with the
                    invoice.  These can help with correlating and validating the invoice in your system.
                </p>
                <p class="text-muted">
                    Note: You must validate the invoice data on server-side, client-side only validation is NOT safe.
                    For example, in the <code>onConfirmed</code> method make an AJAX call to your backend to verify the invoice server-side.
                    Validate that the <code>invoiceId</code> and <code>amount</code> match the expected values before completing the order on your side.
                </p>
            </div>
            <div id="webhooks-log-container" class="col-md-5" style="float: left; width: 50%;">
                <div id="webhooks-log">
                        <pre class="language-js"><code style="color: rgb(240,240,240);" class="language-js">
      CoinPayments.<span class="token function">Button</span>({
    
        <span class="token comment">//
        // you can specify the \`invoiceId\` and \`customData\` dictionary of strings to store
        // along with the invoice so that you can correlate the invoice in your system
        //</span>
    
        <span class="token comment">createInvoice</span>: <span class="token keyword">async function</span> (data, actions) {
          <span class="token keyword">const</span> invoiceId = <span class="token keyword">await</span> actions.invoice.<span class="token function">create</span>({
            clientId: <span class="token string">"CoinPaymentsDemoClient"</span>,
            invoiceId: <span class="token string">"YOUR_CUSTOM_INVOICE_ID"</span>,   <span class="token comment">// your internal invoice ID</span>
            customData: {
              foo: <span class="token string">"bar"</span>,
              hello: <span class="token string">"world"</span>
            },
            amount: {
              currencyId: <span class="token string">"5057"</span>,     <span class="token comment">// USD</span>
              value: <span class="token string">"123"</span>            <span class="token comment">// $ 1.23 USD  (123 cents)</span>
            }
          });
          <span class="token keyword">return</span> invoiceId;
        },
        <span class="token function">onConfirmed</span>(data) {
          <span class="token comment">// called when the invoice is paid and confirmed on the blockchain</span>
          <span class="token comment">// the payments may not yet have been transferred to your wallets</span>
          <span class="token function">alert</span>(<span class="token string">"Invoice confirmed: "</span> + data.invoiceId);
        },
        <span class="token function">onCancelled</span>(data) {
          <span class="token comment">// called when the invoice is cancelled and can no longer be paid</span>
          <span class="token comment">// e.g. user closes the payment window or timeout expires</span>
          <span class="token function">alert</span>(<span class="token string">"Invoice cancelled: "</span> + data.invoiceId);
        }
      }).<span class="token function">render</span>("cps-button-container-4");</code>
    </pre>
    </div>
            </div>
        </div>
    </div>
    <div class="sc-EHOje sc-bZQynM dtUibw">
        <div class="col-md-3 text-center" style = "margin-top: 25%;">
            <h3 class="mb-5">Try it out</h3>
            <div id="cps-button-container-4"></div>
        </div>
    </div>
</div>
<div class="sc-gzVnrw sc-ibxdXY bSFXlp">
    <div class="sc-bxivhb cjtbAK">
        <div class="row ml-1" style="margin-top: 30px;">
            <div class="col-md-4" style="float: left; width: 50%;">
                <h1>Webhooks (IPN)</h1>
                <p>
                    Webhook Instant Payment Notifications (IPNs) are sent at various stages of an invoices life-cycle.  For example when an invoice is created, paid and confirmed on the blockchain.
                </p>
                <p>
                    Webhook notification endpoints can be configured in your merchant dashboard and are implemented as <code>POST</code> requests to those endpoints with a <code>JSON</code> body of
                    the invoice and payment details.
                </p>
                <p class="text-muted">
                    Note: all webhook notifications include a <code>X-CoinPayments-Signature</code> header that contains the <code>HMAC SHA256</code> hash of the message body signed with your app <code>secret</code>.
                    You MUST verify the signature to ensure that the notification has not been tampered with.
                </p>
                <p class="text-muted">
                    Note: webhook notifications will be retried up to 10 times if your server responds with an error code and may arrive out of order.
                </p>
            </div>
    
            <div class="col-md-5" style="margin-bottom: 40px; float: left; width: 50%;">
                <div id="webhooks-log-container" style="background: #000000;">
                    <div id="webhooks-log">
                        <p class="log-heading"><span class="log-level" style="color: rgb(115, 230, 140); background: black;">info</span><span class="log-category">Click "Pay with CoinPayments"</span></p>
                        <p class="log-heading"><span class="log-level" style="color: rgb(115, 230, 140); background: black;">info</span><span class="log-category">Webhook IPN notifications will show here</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sc-EHOje sc-bZQynM dtUibw">
        <div class="col-md-3 text-center" style="margin-top: 25%;">
            <h3 class="mb-5">Try it out</h3>
            <div id="cps-button-container-5"></div>
        </div>
    </div>
</div>
`;
    var contentHtml = `        <div id="section/CustomButtons" data-section-id="section/CustomButtons" class="sc-ifAKCX dluJDj">          <div class="sc-gzVnrw eesUPo">            <div class="sc-bxivhb cjtbAK">              <h1 class="sc-htoDjs WxWXp"><a class="sc-VigVT kGvRyb" href="#section/CustomButtons"></a>Custom Buttons             </h1>            </div>          </div>          <div id="section/Authent/oauth2" data-section-id="section/Authentication/oauth2"            class="sc-ifAKCX dluJDj">            ${tutorialsHtml}            </div>          </div>        </div>`;


    var tablist = $("#tabs-list");
    tablist.insertBefore(createElementFromHTML(tabHtml), tablist.firstChild);
    tablist.firstChild.firstChild.addEventListener('click', function () { window.location.hash = "#section/CustomButtons"; });
    window.location.hash = "#section/CustomButtons";

    var apiContent = $("#apiContent")
    apiContent.insertBefore(createElementFromHTML(contentHtml), apiContent.firstChild.nextSibling);
},1)

setTimeout(function () {
    CoinPayments.Button({
        createInvoice: function (data, actions) {
            return actions.invoice.create({
                clientId: "CoinPaymentsDemoClient",
                amount:
                    {
                        currencyId: "5057",    // USD
                        value: "123"         // $ 1.23 USD
                    },
                requireBuyerNameAndEmail: true,
                buyerDataCollectionMessage: "Your email and name is collected for customer service purposes such as order fulfillment."
            });
        }
    }).render("cps-button-container-1");

    CoinPayments.Button({
        style: {
            color: "blue",
            width: 180
        },
        createInvoice: function (data, actions) {
            return actions.invoice.create({
                clientId: "CoinPaymentsDemoClient",
                amount:
                    {
                        currencyId: "4341",    // CAD
                        value: "1000"          // $ 10.00 CAD
                    }
            });
        }
    }).render("cps-button-container-2");

    CoinPayments.Button({
        style: {
            color: "black"
        },
        createInvoice: function (data, actions) {
            return actions.invoice.create({
                clientId: "CoinPaymentsDemoClient",
                currencyId: "5057",   // USD
                items: [
                    {
                        name: "First test item in the cart",
                        description: "this is a description of the first test item",
                        quantity: 1,
                        amount: "1000"    // $ 10.00 USD
                    },
                    {
                        name: "There are two of these items",
                        description: "this is the second item in the shopping cart",
                        quantity: 2,
                        amount: "1234"    // $ 12.34 USD
                    }
                ],
                amount: {
                    breakdown: {
                        subtotal: "2234", // $ 22.34 USD (items 10.00 + 12.34)
                        shipping: "999",  // $ 9.99 USD
                        handling: "100",  // $ 1.00 USD
                        taxTotal: "500"   // $ 5.00 USD
                    },
                    value: "3833"       // $ 31.33 USD total
                }
            });
        }
    }).render("cps-button-container-3");

    CoinPayments.Button({
        createInvoice: function (data, actions) {
            return actions.invoice.create({
                clientId: "CoinPaymentsDemoClient",
                amount:
                    {
                        currencyId: "5057",    // USD
                        value: "123"         // $ 1.23 USD
                    }
            });
        },
        onConfirmed(data) {
            // called when the invoice is paid and confirmed on the blockchain
            // the payments may not yet have been transferred to your wallets
            alert("Invoice confirmed: " + data.invoiceId);
        },
        onCancelled(data) {
            // called when the invoice is cancelled and can no longer be paid
            alert("Invoice cancelled: " + data.invoiceId);
        }
    }).render("cps-button-container-4");

    var webhookSignalRConnectionId = null;

    function getWebhookSignalRConnectionIdAsync() {
        if (!webhookSignalRConnectionId) {
            return Promise.resolve(webhookSignalRConnectionId);
        }

        var connection = new signalR.HubConnectionBuilder()
            .withUrl("/api/v1/hubs/checkout-demo")
            .build();

        return connection.start().then(function() {
            connection.on("ipn", function(body) {
                console.log(body);

                var parsed = JSON.parse(body);

                writeWebhookLog({
                    logLevel: "info",
                    category: "IPN",
                    eventId: {
                        id: parsed.id,
                        name: parsed.type
                    },
                    message: body
                });
            });

            return connection.invoke("GetConnectionId").then(function (id) {
                return webhookSignalRConnectionId = id;
            });
        });
    }

    CoinPayments.Button({
        style: {
            color: "blue"
        },
        createInvoice: function (data, actions) {
            return getWebhookSignalRConnectionIdAsync().then(function(id) {
                return actions.invoice.create({
                    clientId: "CoinPaymentsDemoClient",
                    customData: {
                        demoId: id
                    },
                    amount:
                        {
                            currencyId: "5057", // USD
                            value: "242" // $ 2.42 USD
                        }
                });
            });
        }
    }).render("cps-button-container-5");

    document.getElementById("script-site-origin").innerText = window.location.origin.toString();

    function getLogLevelColor(logLevel) {
        switch (logLevel) {
            case "dbug":
                return { f: "gray", b: "black" };
            case "info":
                return { f: "#73e68c", b: "black" };
            case "warn":
                return { f: "#fefb84", b: "black" };
            case "fail":
                return { f: "black", b: "#ff6673" };
            case "crit":
                return { f: "white", b: "red" };
            default:
                return { f: "lightgray", b: "black" };
        }
    }

    function writeWebhookLog(log) {
        var heading = document.createElement("p");
        var message = document.createElement("p");

        var levelSpan = document.createElement("span");
        var categorySpan = document.createElement("span");
        var levelColor = getLogLevelColor(log.logLevel);

        levelSpan.innerText = log.logLevel;
        levelSpan.style.color = levelColor.f;
        levelSpan.style.background = levelColor.b;
        levelSpan.className = "log-level";

        var eventId = (log.eventId && log.eventId.id) || "";
        var eventName = log.eventId && log.eventId.name;

        categorySpan.innerText = (log.category || "") + (eventId || eventName) ? ("[" + eventId + (eventName ? (", " + eventName) : "") + "]") : "";
        categorySpan.className = "log-category";

        message.innerHTML = log.message.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/ /g, '&nbsp;');
        message.className = "log-message";

        heading.className = "log-heading";
        heading.appendChild(levelSpan);

        if (log.category || eventId || eventName) {
            heading.appendChild(categorySpan);
        }

        var messageList = document.getElementById("webhooks-log");

        messageList.appendChild(heading);
        messageList.appendChild(message);

        if (log.exception) {
            var ex = document.createElement("p");
            ex.innerText = log.exception;
            ex.className = "log-exception";
            messageList.appendChild(ex);
        }

        while (messageList.childNodes.length > 3000) {
            var child = messageList.childNodes.item(0);
            messageList.removeChild(child);
        }

        var container = document.getElementById("webhooks-log-container");
        container.scrollTop = container.scrollHeight;
    }},3000);
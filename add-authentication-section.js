var $ = document.querySelector.bind(document);
$("img").parentElement.style.setProperty('padding', '7%');

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

setTimeout(function () {
    var tabHtml = '<li data-item-id="section/Examples of using Client Id and Client Secret" class="sc-hrWEMg bbViyS"><label type="section" role="menuitem"              class="sc-eTuwsz iNzLCk -depth1"><span title="Authentication" class="sc-gwVKww fyUykq">Examples of using Client Id and Client Secret</span></label></li>';

    var tutorialsHtml = `
<div class="container-fluid">
              <div>
                  <h2 class="sc-dnqmqq ioYTqA">Examples of using Client Id and Client Secret:</h2>
                  <p style="margin-top: 1vh;"><strong>Python example:</strong></p>
                  <div id="webhooks-log-container" style="class="col-md-5">
                    <div id="webhooks-log">
                        <pre class="language-python">
                            <code class="language-python">
<span class="token keyword">import</span> http.client
<span class="token keyword">import</span> json
<span class="token keyword">import</span> email.utils
<span class="token keyword">import</span> hashlib
<span class="token keyword">import</span> base64
<span class="token keyword">import</span> hmac

conn = http.client.<span class="token function">HTTPSConnection</span>( <span class="token string">"api.coinpayments.net"</span>)
payload = json.<span class="token function">dumps</span>({})
clientId =  <span class="token string">"ce765439c6bd426b8533b2d5dbf731ba"</span>;
clientSecret =  <span class="token string">"F42L8rx9wHYz4Bhiz/vuYnrZgKLTTAbP0gosH87sY3g="</span>;
date = email.utils.<span class="token function">formatdate</span>(usegmt=<span class="token boolean">True</span>)
text =  <span class="token string">"GET"</span> +  <span class="token string">"https://api.coinpayments.net"</span> +  <span class="token string">"/api/v1/merchant/wallets"</span> + clientId + date + payload
text =  <span class="token string">'\\ufeff'</span>+text
text = text.<span class="token function">encode</span>(<span class="token string">'utf-8'</span>)
clientSecret = clientSecret.<span class="token function">encode</span>(<span class="token string">'utf-8'</span>)
signature = base64.<span class="token function">b64encode</span>(hmac.<span class="token function">new</span>(clientSecret, text, digestmod=hashlib.sha256).<span class="token function">digest</span>())
headers = {
   <span class="token string">'Content-Type'</span>:  <span class="token string">'application/json'</span>,
   <span class="token string">'X-CoinPayments-Client'</span>: clientId,
   <span class="token string">'X-CoinPayments-Timestamp'</span>: date,
   <span class="token string">'X-CoinPayments-Signature'</span>: signature
}
conn.request( <span class="token string">"GET"</span>,  <span class="token string">"/api/v1/merchant/wallets"</span>, payload, headers)
res = conn.<span class="token function">getresponse()</span>
data = res.<span class="token function">read()</span>
print(data.decode( <span class="token string">"utf-8"</span>))
                    </code>
                  </pre>
                  </div>
                  </div>
                </div> 
                <p style="margin-top: 1vh;"><strong>JavaScript example:</strong></p>
                  <div id="webhooks-log-container" style="margin-top: 1vh;" class="col-md-5">
                    <div id="webhooks-log">
                        <pre class="language-js">
                            <code class="language-js">
<span class="token keyword">var</span> requestOptions = {
    method:  <span class="token string">'GET'</span>,
    redirect:  <span class="token string">'follow'</span>,
};

<span class="token keyword">var</span> headers = <span class="token keyword">new</span> <span class="token function">Headers</span>();
headers.<span class="token function">append</span>(  <span class="token string">'Content-Type'</span>,  <span class="token string">'application/json'</span>);

<span class="token keyword">var</span> clientId =  <span class="token string">"ce765439c6bd426b8533b2d5dbf731ba"</span>;
<span class="token keyword">var</span> clientKey =  <span class="token string">"F42L8rx9wHYz4Bhiz/vuYnrZgKLTTAbP0gosH87sY3g="</span>;
headers.<span class="token function">append</span>( <span class="token string">"X-CoinPayments-Client"</span>, clientId);
<span class="token keyword">var</span> date = <span class="token keyword">new</span> <span class="token function">Date</span>().<span class="token function">toUTCString</span>();
headers.<span class="token function">append</span>( <span class="token string">"X-CoinPayments-Timestamp"</span>, date);

<span class="token keyword">var</span> url =  <span class="token string">"https://api.coinpayments.net/api/v1/merchant/wallets"</span>;
<span class="token keyword">var</span> text = requestOptions.method + url + clientId + date;
<span class="token keyword">var</span> hash = CryptoJS.<span class="token function">HmacSHA256</span>( <span class="token string">"\\ufeff"</span> + text, clientKey);
<span class="token keyword">var</span> hashInBase64 = CryptoJS.enc.Base64.<span class="token function">stringify</span>(hash);
headers.<span class="token function">append</span>( <span class="token string">"X-CoinPayments-Signature"</span>, hashInBase64);
requestOptions.headers=headers;
<span class="token function">fetch</span>(url, requestOptions)
     .<span class="token function">then</span>(response => response.<span class="token function">text</span>())
     .<span class="token function">then</span>(result => console.<span class="token function">log</span>(result))
     .<span class="token function">catch</span>(error => console.<span class="token function">log</span>( <span class="token string">'error'</span>, error));
                    </code>
                  </pre>
                  </div>
                  </div>
                  <p style="margin-top: 1vh;"><strong>PHP example:</strong></p>        
                  <div id="webhooks-log-container" style="margin-top: 1vh;" class="col-md-5">
                    <div id="webhooks-log">
                        <pre class="language-php">
                            <code class="language-php">
$curl = <span class="token function">curl_init</span>();
$method =  <span class="token string">'GET'</span>;
$apiUrl =  <span class="token string">'https://api.coinpayments.net/api/v1/merchant/wallets'</span>;
$date = <span class="token keyword">new</span> <span class="token function">\\Datetime</span>();
$params = <span class="token number">null</span>;
$clientId =  <span class="token string">"ce765439c6bd426b8533b2d5dbf731ba"</span>;
$clientSecret =  <span class="token string">"F42L8rx9wHYz4Bhiz/vuYnrZgKLTTAbP0gosH87sY3g="</span>;
$signatureString = <span class="token function">implode</span>( <span class="token string">''</span>, [
    <span class="token function">chr</span>(239),
    <span class="token function">chr</span>(187),
    <span class="token function">chr</span>(191),
    $method,
    $apiUrl,
    $clientId,
    $date-><span class="token function">format</span>( <span class="token string">'c'</span>),
    $params
]);
$signature = <span class="token function">base64_encode</span>(<span class="token function">hash_hmac</span>( <span class="token string">'sha256'</span>, $signatureString, $clientSecret, <span class="token boolean">true</span>));

$headers = [
     <span class="token string">'Content-Type: application/json'</span>,
     <span class="token string">'X-CoinPayments-Client: '</span> . $clientId,
     <span class="token string">'X-CoinPayments-Timestamp: '</span> . $date->format( <span class="token string">'c'</span>),
     <span class="token string">'X-CoinPayments-Signature: '</span> . $signature,
];

$options = [
    CURLOPT_RETURNTRANSFER => <span class="token boolean">true</span>,
    CURLOPT_HEADER => <span class="token boolean">true</span>,
    CURLOPT_SSL_VERIFYHOST => <span class="token number">0</span>,
    CURLOPT_SSL_VERIFYPEER => <span class="token number">0</span>,
    CURLOPT_URL => $apiUrl,
    CURLOPT_HTTPHEADER => $headers,
];


<span class="token function">curl_setopt_array</span>($curl, $options);

$response = <span class="token function">curl_exec</span>($curl);
<span class="token function">curl_close</span>($curl);
                    </code>
                  </pre>
                  </div>
                  </div>
                  <p style="margin-top: 1vh;"><strong>C# example:</strong></p>
                  <div id="webhooks-log-container" style="margin-top: 1vh;" class="col-md-5">
                    <div id="webhooks-log">
                        <pre class="language-c#">
                            <code class="language-c#">
<span class="token keyword">using</span> System;
<span class="token keyword">using</span> System.Text;
<span class="token keyword">using</span> RestSharp;

<span class="token keyword">namespace</span> c_example
{

    <span class="token keyword">class</span> Program
    {
        <span class="token keyword">static void</span> <span class="token function">Main</span>(string[] args)
        {
            <span class="token keyword">var</span> client = <span class="token keyword">new</span> <span class="token function">RestClient</span>( <span class="token string">"https://api.coinpayments.net/api/v1/merchant/wallets"</span>);
            client.Timeout = <span class="token number">-1</span>;
            <span class="token keyword">var</span> request = <span class="token keyword">new</span> <span class="token function">RestRequest</span>(Method.GET);
            request.<span class="token function">AddHeader</span>( <span class="token string">"Content-Type"</span>,  <span class="token string">"application/json"</span>);

            <span class="token keyword">var</span> clientId =  <span class="token string">"ce765439c6bd426b8533b2d5dbf731ba"</span>;
            <span class="token keyword">var</span> clientSecret =  <span class="token string">"F42L8rx9wHYz4Bhiz/vuYnrZgKLTTAbP0gosH87sY3g="</span>;
            request.<span class="token function">AddHeader</span>( <span class="token string">"X-CoinPayments-Client"</span>, clientId);
            
            <span class="token keyword">DateTime</span> date = DateTime.UtcNow;
            <span class="token keyword">var</span> date_utc = date.<span class="token function">ToString</span>( <span class="token string">"r"</span>);
            request.<span class="token function">AddHeader</span>( <span class="token string">"X-CoinPayments-Timestamp"</span>, date_utc);

            <span class="token keyword">var</span> text = request.Method +  <span class="token string">""</span> + client.BaseUrl + clientId + date_utc;
            <span class="token keyword">var</span> provider = new System.Security.Cryptography.<span class="token function">HMACSHA256</span>(Encoding.UTF8.<span class="token function">GetBytes</span>(clientSecret));
            <span class="token keyword">var</span> hash = provider.<span class="token function">ComputeHash</span>(Encoding.UTF8.<span class="token function">GetBytes</span>( <span class="token string">"\\ufeff"</span> + text));
            <span class="token keyword">var</span> signature = Convert.<span class="token function">ToBase64String</span>(hash);
            request.<span class="token function">AddHeader</span>( <span class="token string">"X-CoinPayments-Signature"</span>, signature);

            IRestResponse response = client.<span class="token function">Execute</span>(request);
            Console.<span class="token function">WriteLine</span>(response.Content);
        }
    }
}
                    </code>
                  </pre>
                  </div>
                  </div>
`;
    var contentHtml = `        <div id="section/Examples of using Client Id and Client Secret" data-section-id="section/Examples of using Client Id and Client Secret" class="sc-ifAKCX dluJDj">          <div class="sc-gzVnrw eesUPo">            <div class="sc-bxivhb cjtbAK">              <h1 class="sc-htoDjs WxWXp"><a class="sc-VigVT kGvRyb" href="#section/Examples of using Client Id and Client Secret"></a>Examples of using Client Id and Client Secret             </h1>            </div>          </div>          <div id="section/Authent/oauth2" data-section-id="section/Authentication/oauth2"            class="sc-ifAKCX dluJDj">            <div class="sc-gzVnrw eesUPo">              <div class="sc-bxivhb cjtbAK">                ${tutorialsHtml}                </div>              </div>            </div>          </div>        </div>`;

    var tablist = $("#tabs-list");
    tablist.insertBefore(createElementFromHTML(tabHtml), tablist.firstChild);
    tablist.firstChild.firstChild.addEventListener('click', function () { window.location.hash = "#section/Examples of using Client Id and Client Secret"; });
    window.location.hash = "#section/Examples of using Client Id and Client Secret";

    var apiContent = $("#apiContent")
    apiContent.insertBefore(createElementFromHTML(contentHtml), apiContent.firstChild.nextSibling);

}, 1000);
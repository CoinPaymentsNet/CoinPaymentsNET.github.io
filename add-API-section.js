var $ = document.querySelector.bind(document);
$("img").parentElement.style.setProperty('padding', '7%');

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

setTimeout(function () {
    var tabHtml = '<li data-item-id="section/Migrating" class="sc-hrWEMg bbViyS"><label type="section" role="menuitem"              class="sc-eTuwsz iNzLCk -depth1"><span title="Authentication" class="sc-gwVKww fyUykq">Migrating from the old API to the new one</span></label></li>';

    var tutorialsHtml = `  <div class="container-fluid">
    <div class="row ml-1" style="margin-top: 30px;">
        <div class="col-md-4">
      <h1>Authentication </h1>
      <h3>Old version</h3>
     <p>The old API uses a SHA-512 HMAC signature generated with your private key. But the new one uses a HmacSHA-256 instead. Our server generates it's own HMAC signature and compares it with the API caller's. If they don't match the API call is discarded. The HMAC signature then encodes with Base64 schemes and is sent as a HTTP header called 'X-CoinPayments-Signature'.
Also you should add two new headers. One of them is '"X-CoinPayments-Timestamp' with current date converting to a string, according to universal time. Another header is called 'X-CoinPayments-Client' preserving information about your clientId.
The HMAC signature is created from the request method, request url, clientId, date and request body. For example if your API secret key was <b>"test"</b> and public key was <b>"your_api_public_key"</b> (both without quotes) and you would like to send request to <b>/api/v1/merchant/callbacks</b> the text for generating HMAC might look like:</p>
        <code>
        GET https://api.coinpayments.net/api/v1/merchant/callbacks7aa5e7ba45d84d978c5ea7f62498abf4Mon, 02 Nov 2020 12:16:38 GMT
        </code>
        </br>
        </br>
        <p>and the hash in Base64 would be:</p>
        <code>
        Gpv0yNiv4zWHukg5peVCPcYTCSVzH6t9QFLzF2Rq49E=
        </code>
        <h1>Requests example</h1>
        <h4>Old Version</h4>
        <p>For getting callback using old API you have to send <strong>HTTP</strong> request(<strong>POST</strong>) <strong>https://www.coinpayments.net/api.php/</strong>
        with such a x-www-form-urlencoded body:
        <ul>
        <li>version: 1</li>
        <li>cmd: get_callback_address</li>
        <li>key: 3765ac71c95e08887f4077e0989bd142ad7c6d818af4353f6452f0eb945bf82b</li>
        <li>currency: BTC</li>
        
        </ul>
        <h4>New version</h4>
        <p>For list all callback addresses sorted descending by the creation date using new API we'll send  <strong>HTTP</strong> request(<strong>GET</strong>) to <strong>/api/v1/merchant/callbacks</strong> with parameters:</p>
        <ul>
          <li>clientId - The merchant client id whose callback address should be listed</li>
          <li>currencyId - The id of the currency the address was receiving</li>
          <li>after - </li>
          <li>limit - </li>
        </ul>
        </p>
        </div>
        </div>
</div>
`;
    var contentHtml = `        <div id="section/Migrating" data-section-id="section/Migrating" class="sc-ifAKCX dluJDj">          <div class="sc-gzVnrw eesUPo">            <div class="sc-bxivhb cjtbAK">              <h1 class="sc-htoDjs WxWXp"><a class="sc-VigVT kGvRyb" href="#section/Migrating"></a>Migrating from the old API to the new one              </h1>            </div>          </div>          <div id="section/Authent/oauth2" data-section-id="section/Authentication/oauth2"            class="sc-ifAKCX dluJDj">            <div class="sc-gzVnrw eesUPo">              <div class="sc-bxivhb cjtbAK">                ${tutorialsHtml}                </div>              </div>            </div>          </div>        </div>`;

    var tablist = $("#tabs-list");
    tablist.insertBefore(createElementFromHTML(tabHtml), tablist.firstChild);
    tablist.firstChild.firstChild.addEventListener('click', function () { window.location.hash = "#section/Migrating"; });
    window.location.hash = "#section/Migrating";

    var apiContent = $("#apiContent")
    apiContent.insertBefore(createElementFromHTML(contentHtml), apiContent.firstChild.nextSibling);

}, 1000);
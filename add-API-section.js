var $ = document.querySelector.bind(document);
$("img").parentElement.style.setProperty('padding', '7%');

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

setTimeout(function () {
    var tabHtml = '<li data-item-id="section/Migrating" class="sc-hrWEMg bbViyS"><label type="section" role="menuitem"              class="sc-eTuwsz iNzLCk -depth1"><span title="Authentication" class="sc-gwVKww fyUykq">Migrating from the old API to the new one</span></label></li>';

    var tutorialsHtml = `  <div class="c-article b13" data-block-id="13">
  <div class="c-article__content max-width-sm">
      <br id="article-body" class="article-body">
      <h3><strong>Authentication</strong></h3>
     <p>The old API uses a SHA-512 HMAC signature generated with your private key. But the new one uses a HmacSHA-256 instead. Our server generates it's own HMAC signature and compares it with the API caller's. If they don't match the API call is discarded. The HMAC signature then encodes with Base64 schemes and is sent as a HTTP header called 'X-CoinPayments-Signature'.
Also you should add two new headers. One of them is '"X-CoinPayments-Timestamp' with current date converting to a string, according to universal time. Another header is called 'X-CoinPayments-Client' preserving information about your clientId.
The HMAC signature is created from the request method, request url, clientId, date and request body. For example if your API secret key was "test" and public key was "your_api_public_key" (both without quotes) and you would like to send request to /api/v1/merchant/callbacks the text for generating HMAC might look like:</p>
        <code>
        GEThttps://orion-api.starhermit.com/api/v1/merchant/callbacks7aa5e7ba45d84d978c5ea7f62498abf4Mon, 02 Nov 2020 12:16:38 GMT
        </code>
        </br>
        </br>
        <p>and the hash in Base64 would be:</p>
        <code>
        Gpv0yNiv4zWHukg5peVCPcYTCSVzH6t9QFLzF2Rq49E=
        </code>
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
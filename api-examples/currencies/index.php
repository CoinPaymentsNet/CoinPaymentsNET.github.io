<?php
if ($_GET['code'] == 'true') {
    $file = __FILE__;
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
}

?>


    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <body>
    <div class="container">
        <br/>
        <a href="/conversion_check.php?code=true">Code sample</a>
        <br/>
        <br/>
        <form>
            <div class="form-group">
                <label for="clientId">Client ID: <span style="color:red">*</span></label>
                <input type="text" class="form-control" id="clientId" name="clientId" value="<?= $_GET['clientId'] ?>">
            </div>

            <div class="form-group">
                <label for="clientSecret">Client Secret: <span style="color:red">*</span></label>
                <input type="text" class="form-control" id="clientSecret" name="clientSecret"
                       value="<?= $_GET['clientSecret'] ?>">
            </div>

            <div class="form-group">
                <label for="action">Action</label>
                <select class="form-control selector" id="action" name="action">
                    <option value="list" <?= $_GET['action'] == 'list' ? 'selected' : '' ?>>Currencies list</option>
                    <option value="find" <?= $_GET['action'] == 'find' ? 'selected' : '' ?>>Find a currency by its ID</option>
                    <option value="get_block" <?= $_GET['action'] == 'get_block' ? 'selected' : '' ?>>Get the latest block number by currency</option>
                    <option value="get_req" <?= $_GET['action'] == 'get_req' ? 'selected' : '' ?>>Get the required confirmations for each currency</option>
                    <option value="icon_retrieve" <?= $_GET['action'] == 'icon_retrieve' ? 'selected' : '' ?>>Retrieve the currency icon</option>
                    <option value="conversions" <?= $_GET['action'] == 'conversions' ? 'selected' : '' ?>>All possible currency conversions</option>
                    <option value="validate" <?= $_GET['action'] == 'validate' ? 'selected' : '' ?>>Validation</option>
                </select>
            </div>

            <div class="form-group form-temp">
            </div>

            <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <script type="text/javascript">
            const selectElement = document.getElementsByClassName("selector")[0];
            var get = document.getElementById("action");
            var list_elem = document.createElement('div');
            list_elem.id = "list";
            list_elem.innerHTML =
                '<div class="form-group">' +
                '<label for="q">Name/code: </label> ' +
                '<input type="text" class="form-control" id="q" name="q" ' +
                'value="<?= $_GET["q"] ?>"> </div>' +

                '<div class="form-group">' +
                '<label for="type">Type:</label>' +
                '<select class="form-control type_selector" id="type" name="type">' +
                '<option value="none" <?= $_GET["type"] == "none" ? "selected" : "" ?>>--</option>' +
                '<option value="crypto" <?= $_GET["type"] == "crypto" ? "selected" : "" ?>>Crypto</option>' +
                '<option value="token" <?= $_GET["type"] == "token" ? "selected" : "" ?>>Token</option>' +
                '<option value="fiat" <?= $_GET["type"] == "fiat" ? "selected" : "" ?>>Fiat</option>' +
                '</select></div>' +

                '<div class="form-group">' +
                '<label for="capability">Capabilities:</label>' +
                '<select class="form-control capabilities_selector" id="capability" name="capability">' +
                '<option value="none" <?= $_GET["capability"] == "none" ? "selected" : "" ?>>--</option>' +
                '<option value="multiSigAccounts" <?= $_GET["capability"] == "multiSigAccounts" ? "selected" : "" ?>>multiSigAccounts</option>' +
                '<option value="sharedAccounts" <?= $_GET["capability"] == "sharedAccounts" ? "selected" : "" ?>>sharedAccounts</option>' +
                '<option value="payments" <?= $_GET["capability"] == "payments" ? "selected" : "" ?>>payments</option>' +
                '<option value="singleSigAccounts" <?= $_GET["capability"] == "singleSigAccounts" ? "selected" : "" ?>>singleSigAccounts</option>' +
                '</select></div>' +

                '<div class="form-group">' +
                '<label for="after">After:</label>' +
                '<input type="text" class="form-control" id="after" name="after"' +
                'value="<?= $_GET["after"] ?>"> </div>' +

                '<div class="form-group"> ' +
                '<label for="limit">Limit:</label> ' +
                '<input type="text" class="form-control" id="limit" name="limit"' +
                'value="<?= $_GET["limit"] ?>"> </div>';

            var find_elem = document.createElement('div');
            find_elem.id = "find";
            find_elem.innerHTML =
                '<div class="form-group"> ' +
                '<label for="currency_id">Currency ID: <span style="color:#ff0000">*</span></label> ' +
                '<input type="text" class="form-control" id="currency_id" name="currency_id"' +
                'value="<?= $_GET["currency_id"] ?>"> </div> ';

            var validate_elem = document.createElement('div');
            validate_elem.id = "validate";
            validate_elem.innerHTML =
                '<div class="form-group"> ' +
                '<label for="currency_id">Currency ID: <span style="color:#ff0000">*</span></label> ' +
                '<input type="text" class="form-control" id="currency_id" name="currency_id"' +
                'value="<?= $_GET["currency_id"] ?>"> </div>' +

                '<div class="form-group"> ' +
                '<label for="address">Address: <span style="color:#ff0000">*</span></label> ' +
                '<input type="text" class="form-control" id="address" name="address"' +
                'value="<?= $_GET["address"] ?>"> </div>';

                window.onload = updateValue;

                var form = document.getElementsByClassName("form-temp")[0];

                selectElement.addEventListener('change', updateValue);
            function updateValue(e) {
                if (get.value === "list")
                {
                    form.innerHTML = "";
                    form.appendChild(list_elem);
                } else if (get.value === "find" || get.value === "get_block" || get.value === "icon_retrieve" )
                {
                    form.innerHTML = "";
                    form.appendChild(find_elem);
                } else if ( get.value === "validate"){
                    form.innerHTML = "";
                    form.appendChild(validate_elem);
                } else {
                    form.innerHTML = "";
                }
            }
        </script>
    </div>
    <?php
    $params = null;
    $date = new \Datetime();

    if (!empty($_GET['action'])) {

        $method = 'GET';
        switch ($_GET['action']) {

            case 'list':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies';
                $is = false;
                if (!(empty($_GET['q']))) {
                    $apiUrl = $apiUrl . '?q=' . $_GET['q'];
                    $is = true;
                }
                if ($_GET['type'] !== "none") {
                    if ($is)
                        $apiUrl = $apiUrl . '&types=' . $_GET['type'];
                    else {
                        $apiUrl = $apiUrl . '?types=' . $_GET['type'];
                        $is = true;
                    }
                }
                if ($_GET['capability'] !== "none") {
                    if ($is)
                        $apiUrl = $apiUrl . '&capabilities=' . $_GET['capability'];
                    else {
                        $apiUrl = $apiUrl . '?capabilities=' . $_GET['capability'];
                        $is = true;
                    }
                }
                if (!(empty($_GET['after']))) {
                    if ($is)
                        $apiUrl = $apiUrl . '&after=' . $_GET['after'];
                    else {
                        $apiUrl = $apiUrl . '?after=' . $_GET['after'];
                        $is = true;
                    }
                }
                if (!(empty($_GET['limit']))) {
                    if ($is)
                        $apiUrl = $apiUrl . '&limit=' . $_GET['limit'];
                    else {
                        $apiUrl = $apiUrl . '?limit=' . $_GET['limit'];
                        $is = true;
                    }
                }
                $params = [];
                break;

            case 'find':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/' . $_GET['currency_id'];
                $params = [];
                break;

            case 'get_block':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/blockchain-nodes/' . $_GET['currency_id'] . '/latest-block-number';
                $params = [];
                break;

            case 'get_req':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/required-confirmations';
                $params = [];
                break;

            case 'icon_retrieve':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/' . $_GET['currency_id'] . '/logo';
                $params = [];
                break;

            case 'conversions':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/conversions';
                $params = [];
                break;

            case 'validate':
                $apiUrl = 'https://api.coinpayments.net/api/v1/currencies/' . $_GET['currency_id'] . "/" . $_GET['address'] . "/validate";
                $params = [];
                break;
        }

        $response = sendRequest($method, $apiUrl, $_GET['clientId'], $_GET['clientSecret'], $date, $params);

        echo "<pre>";
        echo sprintf("%s", $response);
        echo "</pre>";

    }

    ?>
    </body>
<?php


function sendRequest($method, $apiUrl, $clientId, $clientSecret, $date, $params = NULL)
{

    if ($params) {
        $params = json_encode($params);
    }


    $curl = curl_init();
    $signature = signature($method, $apiUrl, $clientId, $date, $clientSecret, $params);

    $headers = [
        'Content-Type: application/json',
        'X-CoinPayments-Client: ' . $clientId,
        'X-CoinPayments-Timestamp: ' . $date->format('c'),
        'X-CoinPayments-Signature: ' . $signature,
    ];

    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_URL => $apiUrl,
        CURLOPT_HTTPHEADER => $headers,
    ];

    if ($method == 'POST') {
        $options[CURLOPT_POST] = true;
        $options[CURLOPT_POSTFIELDS] = $params;
    }

    curl_setopt_array($curl, $options);

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function signature($method, $apiUrl, $clientId, $date, $clientSecret, $params)
{

    $signatureString = implode('', [
        chr(239),
        chr(187),
        chr(191),
        $method,
        $apiUrl,
        $clientId,
        $date->format('c'),
        $params
    ]);

    return base64_encode(hash_hmac('sha256', $signatureString, $clientSecret, true));
}
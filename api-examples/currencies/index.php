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
        <a href="./index.php?code=true">Code sample</a>
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
                <select class="form-control" id="action" name="action">
                    <option>--</option>
                    <option>Currencies list</option>
                    <option>Find a currency by its ID</option>
                    <option>Get the latest block number by currency</option>
                    <option>Get the required confirmations for each currency</option>
                    <option>Retrieve the currency icon</option>
                    <option>Retrieve the currency icon as svg</option>
                    <option>All possible currency conversions</option>
                    <option>Validation</option>
                </select>
                </br>

                <div class="form-group" id="name_code_block" style="display: none;">
                    <label for="name_code">Name/code: </label>
                    <input type="text" class="form-control" id="name_code" name="name_code">
                </div>

                <div class="form-group" id="type_block" style="display: none;">
                    <label for="type">Type:</label>
                    <select class="form-control" id="type" name="type">
                        <option>--</option>
                        <option>Crypto</option>
                        <option>Token</option>
                        <option>Fiat</option>
                    </select>
                </div>

                <div class="form-group" id="capabilities_block" style="display: none;">
                    <label for="capability">Capabilities:</label>
                    <select class="form-control" id="capability" name="capability">
                        <option>--</option>
                        <option>multiSigAccounts</option>
                        <option>sharedAccounts</option>
                        <option>payments</option>
                        <option>singleSigAccounts</option>
                    </select>
                </div>

                <div class="form-group" id="after_block" style="display: none;">
                    <label for="after">After:</label>
                    <input type="text" class="form-control" id="after" name="after">
                </div>

                <div class="form-group" id="limit_block" style="display: none;">
                    <label for="limit">Limit:</label>
                    <input type="text" class="form-control" id="limit" name="limit">
                </div>

                <div class="form-group" id="currency_id_block" style="display: none;">
                    <label for="currency_id">Currency ID: <span style="color:#ff0000">*</span></label>
                    <input type="text" class="form-control" id="currency_id" name="currency_id">
                </div>

                <div class="form-group" id="address_block" style="display: none;>
                    <label for="address">Address: <span style="color:#ff0000">*</span></label>
                <input type="text" class="form-control" id="address" name="address">
            </div>

    </div>
    <script>
        var insertEl =  document.getElementById("insert");
        const selectElement = document.getElementById("action");
        selectElement.addEventListener("change", (event) => {
            document.getElementById('name_code_block').style.display = "none";
            document.getElementById('type_block').style.display = "none";
            document.getElementById('capabilities_block').style.display = "none";
            document.getElementById('after_block').style.display = "none";
            document.getElementById('limit_block').style.display = "none";
            document.getElementById('currency_id_block').style.display = "none";
            document.getElementById('address_block').style.display = "none";
            if (selectElement.value == 'Currencies list'){
                document.getElementById('name_code_block').style.display = "block";
                document.getElementById('type_block').style.display = "block";
                document.getElementById('capabilities_block').style.display = "block";
                document.getElementById('after_block').style.display = "block";
                document.getElementById('limit_block').style.display = "block";
            }
            else if (selectElement.value == 'Find a currency by its ID' || selectElement.value == 'Get the latest block number by currency' ||
                selectElement.value == 'Retrieve the currency icon' || selectElement.value == 'Retrieve the currency icon as svg'){
                document.getElementById('currency_id_block').style.display = "block";
            }
            else if (selectElement.value == 'Validation'){
                document.getElementById('currency_id_block').style.display = "block";
                document.getElementById('address_block').style.display = "block";
            }
        });
    </script>

    <button type="submit" class="btn btn-default">Submit</button>
    </form>
    </div>
    <?php
    $params = null;
    $date = new \Datetime();

    if (!empty($_GET['action'])) {

        $apiUrl = 'https://api.coinpayments.net/api/v1/currencies';
        $method = 'GET';
        $params = [];
        $query_builder = [];

        switch ($_GET['action']) {

            case 'Currencies list':

                if (!(empty($_GET['name_code']))) {
                    $query_builder['q'] = $_GET['name_code'];
                }
                if ($_GET['type'] !== "--") {
                    $query_builder['types'] = $_GET['type'];
                }
                if ($_GET['capability'] !== "--") {
                    $query_builder['capabilities'] = $_GET['capability'];
                }
                if (!(empty($_GET['after']))) {
                    $query_builder['after'] = $_GET['after'];
                }
                if (!(empty($_GET['limit']))) {
                    $query_builder['limit'] = $_GET['limit'];
                }
                if (count($query_builder) > 0) {
                    $apiUrl .= '?' . http_build_query($query_builder);
                }
                break;

            case 'Find a currency by its ID':
                $apiUrl .= '/' . $_GET['currency_id'];
                break;

            case 'Get the latest block number by currency':
                $apiUrl .= '/' . $_GET['currency_id'] . '/latest-block-number';
                break;

            case 'Get the required confirmations for each currency':
                $apiUrl .= '/required-confirmations';
                break;

            case 'Retrieve the currency icon':
                $apiUrl .= '/' . $_GET['currency_id'] . '/logo';
                break;

            case 'Retrieve the currency icon as svg':
                $apiUrl .= '/' . $_GET['currency_id'] . '/logosvg';
                break;

            case 'conversions':
                $apiUrl .= '/conversions';
                break;

            case 'validate':
                $apiUrl .= '/' . $_GET['currency_id'] . "/" . $_GET['address'] . "/validate";
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

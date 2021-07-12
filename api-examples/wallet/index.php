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
                <label for="clientId">Client ID:</label>
                <input type="text" class="form-control" id="clientId" name="clientId" value="<?= $_GET['clientId'] ?>">
            </div>
            <div class="form-group">
                <label for="clientSecret">Client Secret:</label>
                <input type="text" class="form-control" id="clientSecret" name="clientSecret"
                       value="<?= $_GET['clientSecret'] ?>">
            </div>
            <div class="form-group">
                <label for="action">Action</label>
                <select class="form-control" id="action" name="action">
                    <option>Choose option</option>
                    <option>Create a new merchant wallet</option>
                    <option>List all</option>
                    <option>Find by id</option>
                    <option>List transactions</option>
                </select>
                </br>

                <div class="form-group" id="currencyId_block" style="display: none;">
                    <label for="currencyId">Currency ID:</label>
                    <input type="text" class="form-control" id="currencyId" name="currencyId">
                </div>

                <div class="form-group" id="label_block" style="display: none;">
                    <label for="label">Label:</label>
                    <input type="text" class="form-control" id="label" name="label">
                </div>

                <div class="form-group" id="webhookUrl_block" style="display: none;">
                    <label for="webhookUrl">Webhook url:</label>
                    <input type="text" class="form-control" id="webhookUrl" name="webhookUrl">
                </div>

                <div class="form-group" id = "idForFinding_block" style="display: none;">
                    <label for="idForFinding">Id for finding:</label>
                    <input type="text" class="form-control" id="idForFinding" name="idForFinding">
                </div>

            </div>
            <script>
                var insertEl =  document.getElementById("insert");
                const selectElement = document.getElementById("action");
                selectElement.addEventListener("change", (event) => {
                    document.getElementById('currencyId_block').style.display = "none";
                    document.getElementById('label_block').style.display = "none";
                    document.getElementById('webhookUrl_block').style.display = "none";
                    document.getElementById('idForFinding_block').style.display = "none";
                    if (selectElement.value == 'Create a new merchant wallet'){
                        document.getElementById('currencyId_block').style.display = "block";
                        document.getElementById('label_block').style.display = "block";
                        document.getElementById('webhookUrl_block').style.display = "block";
                    }
                    else if (selectElement.value == 'Find by id' || selectElement.value == 'List transactions'){
                        document.getElementById('idForFinding_block').style.display = "block";
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

        $apiUrl = 'https://api.coinpayments.net/api/v1/merchant/wallets';

        switch ($_GET['action']) {

            case 'Create a new merchant wallet':
                $method = 'POST';
                $params = [
                    "currencyId" => $_GET['currencyId'],
                    "label" => $_GET['label'],
                    "webhookUrl" => $_GET['webhookUrl'],
                ];
                break;
            case 'Find by id':
                $method = 'GET';
                $apiUrl .= '/' . $_GET['idForFinding'];
                break;
            case 'List all':
                $method = 'GET';
                break;
            case 'List transactions':
                $method = 'GET';
                $apiUrl .= '/' . $_GET['idForFinding'] . '/transactions';
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


function sendRequest($method, $apiUrl, $clientId, $clientSecret, $date, $params=NULL)
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


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
                    <option value="estimate" <?= $_GET['action'] == 'estimate' ? 'selected' : '' ?>>Estimate
                    </option>
                    <option value="create" <?= $_GET['action'] == 'create' ? 'selected' : '' ?>>Create</option>
                </select>
            </div>


            <div class="form-group">
                <label for="fromId">From currency ID:</label>
                <input type="text" class="form-control" id="fromId" name="fromId" value="<?= $_GET['fromId'] ?>">
            </div>

            <div class="form-group">
                <label for="toId">To currency ID:</label>
                <input type="text" class="form-control" id="toId" name="toId" value="<?= $_GET['toId'] ?>">
            </div>

            <div class="form-group">
                <label for="fromContact">From contact address:</label>
                <input type="text" class="form-control" id="fromContact" name="fromContact"
                       value="<?= $_GET['fromContact'] ?>">
            </div>

            <div class="form-group">
                <label for="toContact">To contact address:</label>
                <input type="text" class="form-control" id="toContact" name="toContact"
                       value="<?= $_GET['toContact'] ?>">
            </div>

            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" id="address" name="address" value="<?= $_GET['address'] ?>">
            </div>

            <div class="form-group">
                <label for="amount">Amount:</label>
                <input type="text" class="form-control" id="amount" name="amount" value="<?= $_GET['amount'] ?>">
            </div>

            <div class="form-group">
                <label for="refundAddress">Refund address:</label>
                <input type="text" class="form-control" id="refundAddress" name="refundAddress"
                       value="<?= $_GET['refundAddress'] ?>">
            </div>


            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
    <?php
    $params = null;
    $date = new \Datetime();

    if (!empty($_GET['action'])) {

        switch ($_GET['action']) {

            case 'estimate':
                $method = 'POST';
                $apiUrl = 'https://api.coinpayments.net/api/v1/externalconversions/estimate';
                $params = [
                    "fromCurrencyId" => $_GET['fromId'],
                    "toCurrencyId" => $_GET['toId'],
                    "fromContractAddress" => $_GET['fromContact'],
                    "toContractAddress" => $_GET['toContact'],
                    "address" => $_GET['address'],
                    "amount" => $_GET['amount'],
                ];
                break;

            case 'create':
                $method = 'POST';
                $apiUrl = 'https://api.coinpayments.net/api/v1/externalconversions/create';
                $params = [
                    "fromCurrencyId" => $_GET['fromId'],
                    "toCurrencyId" => $_GET['toId'],
                    "fromContractAddress" => $_GET['fromContact'],
                    "toContractAddress" => $_GET['toContact'],
                    "address" => $_GET['address'],
                    "refundAddress" => $_GET['refundAddress'],
                ];
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


function sendRequest($method, $apiUrl, $clientId, $clientSecret, $date, $params)
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


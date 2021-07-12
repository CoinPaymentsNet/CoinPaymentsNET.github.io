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
                <label for="action">Action</label>
                <select class="form-control" id="action" name="action">
                    <option value="lists the current conversion rates between currencies">lists the current conversion rates between currencies</option>
                </select>
            </div>


            <div class="form-group">
                <label for="from">From:</label>
                <input type="text" class="form-control" id="from" name="from">
            </div>

            <div class="form-group">
                <label for="to">To:</label>
                <input type="text" class="form-control" id="to" name="to">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
    <?php
    $params = null;
    $date = new \Datetime();

    if (!empty($_GET['action'])) {

        switch ($_GET['action']) {
            case 'lists the current conversion rates between currencies':
                $method = 'GET';
                $params = array(
                    "from" => $_GET['from'],
                    "to" => $_GET['to']
                );
                $apiUrl = 'https://api.coinpayments.net/api/v2/rates?' . http_build_query($params);
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


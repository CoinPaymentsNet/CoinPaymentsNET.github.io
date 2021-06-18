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
                    <option value="create" <?= $_GET['action'] == 'create' ? 'selected' : '' ?>>Create a new invoice
                    </option>
                    <option value="update" <?= $_GET['action'] == 'update' ? 'selected' : '' ?>>Update buyer information on an invoice</option>
                    <option value="find" <?= $_GET['action'] == 'find' ? 'selected' : '' ?>>Find an invoice by its ID</option>
                </select>
            </div>

            <div class="form-group form-temp">
            </div>

            <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <script type="text/javascript">
            const selectElement = document.getElementsByClassName("selector")[0];
            var get = document.getElementById("action");
            var create_elem = document.createElement('div');
            create_elem.id = "create";
            create_elem.innerHTML =
                '<div class="form-group">' +
                '<label for="currency_id">Currency ID: <span style="color:red">*</span></label> ' +
                '<input type="text" class="form-control" id="currency_id" name="currency_id" ' +
                'value="<?= $_GET["currency_id"] ?>"> </div>' +
                '<div class="form-group">' +
                '<label for="amount">Price:</label>' +
                '<input type="text" class="form-control" id="amount" name="amount"' +
                'value="<?= $_GET["amount"] ?>"> </div>' +
                '<div class="form-group">' +
                '<label for="notes_to_recipient">Notes to recipient:</label>' +
                '<input type="text" class="form-control" id="notes_to_recipient" name="notes_to_recipient"' +
                'value="<?= $_GET["notes_to_recipient"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="description">Description:</label> ' +
                '<input type="text" class="form-control" id="description" name="description"' +
                'value="<?= $_GET["description"] ?>"> </div>';

            var update_elem = document.createElement('div');
            update_elem.id = "update";
            update_elem.innerHTML =
                '<div class="form-group"> ' +
                '<label for="company">Company name:</label> ' +
                '<input type="text" class="form-control" id="company" name="company"' +
                'value="<?= $_GET["company"] ?>"> </div> ' +
                '<div class="form-group"> ' +
                '<label for="first_name">First name:</label> ' +
                '<input type="text" class="form-control" id="first_name" name="first_name" ' +
                'value="<?= $_GET["first_name"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="last_name">Last name:</label>' +
                '<input type="text" class="form-control" id="last_name" name="last_name" ' +
                'value="<?= $_GET["last_name"] ?>"></div>' +
                '<div class="form-group"> ' +
                '<label for="email">Email address: <span style="color:red">*</span></label> ' +
                '<input type="text" class="form-control" id="email" name="email" ' +
                'value="<?= $_GET["email"] ?>"> </div> ' +
                '<div class="form-group"> ' +
                '<label for="phone">Phone number:</label> ' +
                '<input type="text" class="form-control" id="phone" name="phone"' +
                'value="<?= $_GET["phone"] ?>"> </div> ' +
                '<div class="form-group"> ' +
                '<label for="address_1">Address 1:</label> ' +
                '<input type="text" class="form-control" id="address_1" name="address_1"' +
                'value="<?= $_GET["address_1"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="address_2">Address 2:</label> ' +
                '<input type="text" class="form-control" id="address_2" name="address_2" ' +
                'value="<?= $_GET["address_2"] ?>"> </div> ' +
                '<div class="form-group"> ' +
                '<label for="address_3">Address 3:</label> ' +
                '<input type="text" class="form-control" id="address_3" name="address_3" ' +
                'value="<?= $_GET["address_3"] ?>"> </div> ' +
                '<div class="form-group"> ' +
                '<label for="province_state">Province or state:</label> ' +
                '<input type="text" class="form-control" id="province_state" name="province_state"' +
                'value="<?= $_GET["province_state"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="city">City:</label> ' +
                '<input type="text" class="form-control" id="city" name="city"' +
                'value="<?= $_GET["city"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="suburb_district">Suburb or district:</label> ' +
                '<input type="text" class="form-control" id="suburb_district" name="suburb_district"' +
                'value="<?= $_GET["suburb_district"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="country_code">Country code: <span style="color:red">*</span></label> ' +
                '<input type="text" class="form-control" id="country_code" name="country_code"' +
                'value="<?= $_GET["country_code"] ?>"> </div>' +
                '<div class="form-group"> ' +
                '<label for="postal_code">Postal code:</label> ' +
                '<input type="text" class="form-control" id="postal_code" name="postal_code"' +
                'value="<?= $_GET["postal_code"] ?>"> </div>';

                var find_elem = document.createElement('div');
                find_elem.id = "find";
                find_elem.innerHTML = '<div class="form-group"> ' +
                    '<label for="invoice_id">Invoice ID: <span style="color:#ff0000">*</span></label> ' +
                    '<input type="text" class="form-control" id="invoice_id" name="invoice_id"value="<?= $_GET["invoice_id"] ?>"> </div>';

                window.onload = updateValue;

                var form = document.getElementsByClassName("form-temp")[0];

                selectElement.addEventListener('change', updateValue);
            function updateValue(e) {
                if (get.value === "create")
                {
                    form.innerHTML = "";
                    form.appendChild(create_elem);
                    form.appendChild(update_elem);
                } else if (get.value === "update")
                {
                    form.innerHTML = "";
                    form.appendChild(update_elem);
                } else {
                    form.innerHTML = "";
                    form.appendChild(find_elem);
                }
            }
        </script>
    </div>
    <?php
    $params = null;
    $date = new \Datetime();

    if (!empty($_GET['action'])) {

        switch ($_GET['action']) {

            case 'create':
                $method = 'POST';
                $apiUrl = 'https://api.coinpayments.net/api/v1/invoices';
                $params = [
                    "clientId" => $_GET['clientId'],
                    "currencyId" => $_GET['currency_id'],
                    "buyer" => [
                        "companyName" => $_GET['company'],
                        "name" => [
                                "firstName" => $_GET['first_name'],
                                "lastName" => $_GET['last_name']
                        ],
                        "emailAddress" => $_GET['email'],
                        "phoneNumber" => $_GET['phone'],
                        "address" => [
                            "address1" => $_GET['address_1'],
                            "address2" => $_GET['address_2'],
                            "address3" => $_GET['address_3'],
                            "provinceOrState" => $_GET['province_state'],
                            "city" => $_GET['city'],
                            "suburbOrDistrict" => $_GET['suburb_district'],
                            "countryCode" => $_GET['country_code'],
                            "postalCode" => $_GET['postal_code']
                        ]
                    ],
                    "description" => $_GET['description'],
                    "amount" => [
                            "currencyId" => $_GET['currency_id'],
                            "displayValue" => $_GET['amount'],
                            "value" => $_GET['amount']
                    ],
                    "notesToRecipient" => $_GET['notes_to_recipient']
                ];
                break;

            case 'update':
                $method = 'PUT';
                $apiUrl = 'https://api.coinpayments.net/api/v1/invoices/' . $_GET['invoice_id'];
                $params = [
                    "buyer" => [
                        "companyName" => $_GET['company'],
                        "name" => [
                            "firstName" => $_GET['first_name'],
                            "lastName" => $_GET['last_name']
                        ],
                        "emailAddress" => $_GET['email'],
                        "phoneNumber" => $_GET['phone'],
                        "address" => [
                            "address1" => $_GET['address_1'],
                            "address2" => $_GET['address_2'],
                            "address3" => $_GET['address_3'],
                            "provinceOrState" => $_GET['province_state'],
                            "city" => $_GET['city'],
                            "suburbOrDistrict" => $_GET['suburb_district'],
                            "countryCode" => $_GET['country_code'],
                            "postalCode" => $_GET['postal_code']
                        ]
                    ]
                ];
                break;

            case 'find':
                $method = 'PUT';
                $apiUrl = 'https://api.coinpayments.net/api/v1/invoices/' . $_GET['invoice_id'];
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
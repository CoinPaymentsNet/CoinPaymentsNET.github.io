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
                    <option>Create a new invoice</option>
                    <option>Update buyer information on an invoice</option>
                    <option>Find an invoice by its ID</option>
                </select>
                </br>

                <div class="form-group" id="company_block" style="display: none;">
                    <label for="company">Company name:</label>
                    <input type="text" class="form-control" id="company" name="company">
                </div>

                <div class="form-group" id="first_name_block" style="display: none;">
                    <label for="first_name">First name:</label>
                    <input type="text" class="form-control" id="first_name" name="first_name">
                </div>

                <div class="form-group" id="last_name_block" style="display: none;">
                    <label for="last_name">Last name:</label>
                    <input type="text" class="form-control" id="last_name" name="last_name">
                </div>

                <div class="form-group" id="email_block" style="display: none;">
                    <label for="email">Email address: <span style="color:red">*</span></label>
                    <input type="text" class="form-control" id="email" name="email">
                </div>

                <div class="form-group" id="phone_block" style="display: none;">
                    <label for="phone">Phone number:</label>
                    <input type="text" class="form-control" id="phone" name="phone">
                </div>

                <div class="form-group" id="address_1_block" style="display: none;">
                    <label for="address_1">Address 1:</label>
                    <input type="text" class="form-control" id="address_1" name="address_1">
                </div>

                <div class="form-group" id="address_2_block" style="display: none;">
                    <label for="address_2">Address 2:</label>
                    <input type="text" class="form-control" id="address_2" name="address_2">
                </div>

                <div class="form-group" id="address_3_block" style="display: none;">
                    <label for="address_3">Address 3:</label>
                    <input type="text" class="form-control" id="address_3" name="address_3">
                </div>

                <div class="form-group" id="province_state_block" style="display: none;">
                    <label for="province_state">Province or state:</label>
                    <input type="text" class="form-control" id="province_state" name="province_state">
                </div>

                <div class="form-group" id="city_block" style="display: none;">
                    <label for="city">City:</label>
                    <input type="text" class="form-control" id="city" name="city">
                </div>

                <div class="form-group" id="suburb_district_block" style="display: none;">
                    <label for="suburb_district">Suburb or district:</label>
                    <input type="text" class="form-control" id="suburb_district" name="suburb_district">
                </div>

                <div class="form-group" id="country_code_block" style="display: none;">
                    <label for="country_code">Country code: <span style="color:red">*</span></label>
                    <input type="text" class="form-control" id="country_code" name="country_code">
                </div>

                <div class="form-group" id="postal_code_block" style="display: none;">
                    <label for="postal_code">Postal code:</label>
                    <input type="text" class="form-control" id="postal_code" name="postal_code">
                </div>

                <div class="form-group" id="description_block" style="display: none;">
                    <label for="description">Description:</label>
                    <input type="text" class="form-control" id="description" name="description">
                </div>

                <div class="form-group" id="currency_id_block" style="display: none;">
                    <label for="currency_id">Currency ID: <span style="color:red">*</span></label>
                    <input type="text" class="form-control" id="currency_id" name="currency_id">
                </div>

                <div class="form-group" id="amount_block" style="display: none;">
                    <label for="amount">Price:</label>
                    <input type="text" class="form-control" id="amount" name="amount">
                </div>

                <div class="form-group" id="notes_to_recipient_block" style="display: none;">
                    <label for="notes_to_recipient">Notes to recipient:</label>
                    <input type="text" class="form-control" id="notes_to_recipient" name="notes_to_recipient">
                </div>

                <div class="form-group" id="invoice_id_block" style="display: none;">
                    <label for="invoice_id">Invoice ID: <span style="color:#ff0000">*</span></label>
                    <input type="text" class="form-control" id="invoice_id" name="invoice_id">
                </div>
            </div>
            <script>
                var insertEl =  document.getElementById("insert");
                const selectElement = document.getElementById("action");
                selectElement.addEventListener("change", (event) => {
                    let elements = document.getElementsByClassName('form-group');
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].id.includes('block')) {
                            elements[i].style.display = "none";
                        }
                    }
                    if (selectElement.value == 'Create a new invoice'){
                        for (let i = 0; i < elements.length; i++) {
                            if (elements[i].id.includes('block')) {
                                if (elements[i].id === "invoice_id_block")
                                    continue;
                                elements[i].style.display = "block";
                            }
                        }
                    }
                    else if (selectElement.value == 'Update buyer information on an invoice'){
                        document.getElementById('company_block').style.display = "block";
                        document.getElementById('first_name_block').style.display = "block";
                        document.getElementById('last_name_block').style.display = "block";
                        document.getElementById('email_block').style.display = "block";
                        document.getElementById('phone_block').style.display = "block";
                        document.getElementById('address_1_block').style.display = "block";
                        document.getElementById('address_2_block').style.display = "block";
                        document.getElementById('address_3_block').style.display = "block";
                        document.getElementById('province_state_block').style.display = "block";
                        document.getElementById('city_block').style.display = "block";
                        document.getElementById('suburb_district_block').style.display = "block";
                        document.getElementById('country_code_block').style.display = "block";
                        document.getElementById('postal_code_block').style.display = "block";
                        document.getElementById('invoice_id_block').style.display = "block";
                    }
                    else if (selectElement.value == 'Find an invoice by its ID'){
                        document.getElementById('invoice_id_block').style.display = "block";
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

        $apiUrl = 'https://api.coinpayments.net/api/v1/invoices';
        switch ($_GET['action']) {

            case 'Create a new invoice':
                $method = 'POST';
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
                        "breakdown" => [
                            "subtotal" => [
                                "currencyId" => $_GET['currency_id'],
                                "displayValue" => $_GET['amount'],
                                "value" => $_GET['amount']
                            ],
                        ],
                        "currencyId" => $_GET['currency_id'],
                        "displayValue" => $_GET['amount'],
                        "value" => $_GET['amount']
                    ],
                    "notesToRecipient" => $_GET['notes_to_recipient']
                ];
                break;

            case 'Update buyer information on an invoice':
                $method = 'PUT';
                $apiUrl .= '/' . $_GET['invoice_id'];
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

            case 'Find an invoice by its ID':
                $method = 'PUT';
                $apiUrl .= '/' . $_GET['invoice_id'];
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
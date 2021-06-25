function createCallbackAddress() {
    var customerId = document.getElementById("customerId_for_create_callbacks").value;
    var secretId = document.getElementById("secretId_for_create_callbacks").value;
    var currencyId = document.getElementById("currencyId_for_create_callbacks").value;
    var nativeCurrencyId = document.getElementById("native-currencyId_for_create_callbacks").value;
    var label = document.getElementById("label_for_create_callbacks").value;
    document.getElementById("createCallback_alert").style.display="none";
    document.getElementById("for_output").style.visibility="hidden";

    if (secretId=='' || customerId=='' || label == '') {
        output_error("createCallback_alert", "Please enter a customer id, secret id, label, currency and native currency");
        return false;
    }
        
var Data = 
`{\r
"clientId": "${customerId}",\r
"currencyId": ${currencyId},\r
"label": "${label}",\r
"webhook": {\r
"nativeCurrencyId": ${nativeCurrencyId},\r
"url": "https://google.com"\r
}\r
}`;
        var date = new Date().toUTCString();
        var text = "POST"+ alphaApi + "/api/v1/merchant/callbacks"  + customerId + date + Data;
        var hash = CryptoJS.HmacSHA256("\ufeff" + text, secretId);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        var Myheaders = new Headers();
        Myheaders.append("X-CoinPayments-Client", customerId);
        Myheaders.append("X-CoinPayments-Timestamp",  date);
        Myheaders.append("X-CoinPayments-Signature", hashInBase64);
        Myheaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: Myheaders,
            body: Data,
            redirect: 'follow'
        };

        return fetch(alphaApi + "/api/v1/merchant/callbacks", requestOptions)
        .then(response => response.text())
        .then(result => outputAboutCreatedCallback(result))
        .catch(error => { console.log('error', error); output_error("createCallback_alert", "Data are incorrect. Please, change them and try again!");});
}
function viewCallbacks(){
    var customerId = document.getElementById("customerId_for_view_callbacks").value;
    var secretId = document.getElementById("secretId_for_view_callbacks").value;

    document.getElementById("viewCallbacks_alert").style.display="none";
    document.getElementById("for_output").style.visibility="hidden";
    
    if (secretId=='' || customerId=='') {
        output_error("viewCallbacks_alert", "Please enter customer id and secret id");
        return false;
    }

    var date = new Date().toUTCString();
    var text = "GET"+ alphaApi + "/api/v1/merchant/callbacks"  + customerId + date;
    console.log(text);
    var hash = CryptoJS.HmacSHA256("\ufeff" + text, secretId);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    var Myheaders = new Headers();
    Myheaders.append("X-CoinPayments-Client", customerId);
    Myheaders.append("X-CoinPayments-Timestamp",  date);
    Myheaders.append("X-CoinPayments-Signature", hashInBase64);
    Myheaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: Myheaders,
        redirect: 'follow'
    };

    return fetch(alphaApi + "/api/v1/merchant/callbacks", requestOptions)
    .then(response => response.text())
    .then(result => output_callbacks(result))
    .catch(error => { console.log('error', error); output_error("viewCallbacks_alert", "Data are incorrect. Please, change them and try again!");});
}

function viewTransactions(){
    var customerId = document.getElementById("customerId_for_view_transactions").value;
    var secretId = document.getElementById("secretId_for_view_transactions").value;

    document.getElementById("viewTransactions_alert").style.display="none";
    document.getElementById("for_output").style.visibility="hidden";

    if (secretId=='' || customerId=='') {
        output_error("viewTransactions_alert", "Please enter an customer and secret id");
        return false;
    }
        
    var date = new Date().toUTCString();
    var text = "GET"+ alphaApi + "/api/v1/merchant/callbacks/deposits"  + customerId + date;
    var hash = CryptoJS.HmacSHA256("\ufeff" + text, secretId);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    var Myheaders = new Headers();
    Myheaders.append("X-CoinPayments-Client", customerId);
    Myheaders.append("X-CoinPayments-Timestamp",  date);
    Myheaders.append("X-CoinPayments-Signature", hashInBase64);
    Myheaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: Myheaders,
        redirect: 'follow'
    };

    return fetch(alphaApi + "/api/v1/merchant/callbacks/deposits", requestOptions)
    .then(response => response.text())
    .then(result => output_transactions(result))
    .catch(error => { console.log('error', error); output_error("viewTransactions_alert", "Data are incorrect. Please, change them and try again!");});
}

function parseIsoDatetime(dtstr) {
    var dt = dtstr.split(/[: T-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
}

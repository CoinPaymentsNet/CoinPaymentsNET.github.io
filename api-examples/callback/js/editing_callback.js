function editFunction(callback_id){
    var newLabel = document.getElementById("callbacksLabel").value;
    if (newLabel == ''){
        return false;
    }

    var customerId = document.getElementById("customerId_for_view_callbacks").value;
    var secretId = document.getElementById("secretId_for_view_callbacks").value;
   
    if (secretId=='' || customerId=='') {
        output_error("viewCallbacks_alert", "Please enter an customer id and secret id");
        return false;
    }
        
var Data = 
`{\r
"label": "${newLabel}"\r
}\r
}`;
        var date = new Date().toUTCString();
        var text = "PUT"+ alphaApi + "/api/v1/merchant/callbacks"+ `/${callback_id}` + customerId + date + Data;
        var hash = CryptoJS.HmacSHA256("\ufeff" + text, secretId);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        var Myheaders = new Headers();
        Myheaders.append("X-CoinPayments-Client", customerId);
        Myheaders.append("X-CoinPayments-Timestamp",  date);
        Myheaders.append("X-CoinPayments-Signature", hashInBase64);
        Myheaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'PUT',
            headers: Myheaders,
            body: Data,
            redirect: 'follow'
        };

        return fetch(alphaApi + "/api/v1/merchant/callbacks"+`/${callback_id}`, requestOptions)
        .then(response => response.text())
        .then(result => alert("Label has been changed"))
        .catch(error => { console.log('error', error);});

}

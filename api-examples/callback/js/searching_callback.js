function search_callback(){
    var id = document.getElementById("callback_id_for_searching").value;
    
    var customerId = document.getElementById("customerId_for_view_callbacks").value;
    var secretId = document.getElementById("secretId_for_view_callbacks").value;
   
    if (secretId=='' || customerId=='') {
        output_error("viewCallbacks_alert", "Please enter an customer id and secret id");
        return false;
    }

    var date = new Date().toUTCString();
    var text = "GET"+ alphaApi + "/api/v1/merchant/callbacks" + `/${id}` + customerId + date;
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

    return fetch(alphaApi + "/api/v1/merchant/callbacks"+`/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => output_callback_for_edit(result))
    .catch(error => {console.log('error', error); output_searching_error()});
}

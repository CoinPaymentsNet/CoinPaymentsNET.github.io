var alphaApi="https://api.coinpayments.net";

var globalCurrenciesList = [];
var globalCurrenciesById = {};

(function () {
    window.fetch(alphaApi + "/api/v1/currencies", { method: "GET" }).then(response => {
        response.json().then(currenciesPage => {
        console.log(currenciesPage);

        var currencies = globalCurrenciesList = currenciesPage.items;

        var currenciesHtml = '<label for="currencyId_for_create_callbacks">Currency</label>';
        currenciesHtml += "<select class='custom-select' id='currencyId_for_create_callbacks'>" + currencies.filter(i => i.status === "active").reduce((p, c) => {
            globalCurrenciesById[c.id] = c;
            return p + "<option value='" + c.id + "'>" + c.name + " (" + c.symbol + ")</option>";
        }, "") + "</select>";
        document.getElementById("currency-selector").innerHTML = currenciesHtml;
        document.getElementById("currencyId_for_create_callbacks").setAttribute("disabled", true);

        var native_currenciesHtml = '<label for="native-currencyId_for_create_callbacks">Native Currency</label>';
        native_currenciesHtml += "<select class='custom-select' id='native-currencyId_for_create_callbacks'>" + currencies.filter(i => i.status === "active").reduce((p, c) => {
            globalCurrenciesById[c.id] = c;
            return p + "<option value='" + c.id + "'>" + c.name + " (" + c.symbol + ")</option>";
        }, "") + "</select>";
        document.getElementById("native-currency-selector").innerHTML = native_currenciesHtml;
        document.getElementById("native-currencyId_for_create_callbacks").setAttribute("disabled", true);
        });
    });
})();  

function currency_id_togler(){
    var customerId = document.getElementById("customerId_for_create_callbacks").value;
    var secretId = document.getElementById("secretId_for_create_callbacks").value;
    var label = document.getElementById("label_for_create_callbacks").value;
    if (customerId && secretId && label){
        document.getElementById("currencyId_for_create_callbacks").disabled = false;
        document.getElementById("native-currencyId_for_create_callbacks").disabled = false;
    }
    else{
        document.getElementById("currencyId_for_create_callbacks").disabled = true;
        document.getElementById("native-currencyId_for_create_callbacks").disabled = true;
    }
}

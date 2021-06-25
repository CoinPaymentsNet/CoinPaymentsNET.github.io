function outputAboutCreatedCallback(result){
    var callback = JSON.parse(result);
    alert("Callback was created successfully!");
    var callbackHTML = '<div>';
    
    callbackHTML += '<div class = "input-group">';
    callbackHTML += '<label for="newCallbackId">Callback ID</label>'; 
    callbackHTML += '</br>';
    callbackHTML += `<input type="text" id="newCallbackId" class="form-control" value = "${callback.id}" readonly style="width: 70%; margin-bottom: 2vh">`;
    callbackHTML += '<div class = "input-group-append">';
    callbackHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('newCallbackId')">Copy</button>`;
    callbackHTML += '</div>';
    callbackHTML += '</div>';

    callbackHTML += '</br>';

    callbackHTML += '<div class = "input-group">';
    callbackHTML += '<label for="newCallbackAddr">Callback address</label>'; 
    callbackHTML += '</br>';
    callbackHTML += `<input type="text" id="newCallbackAddr" class="form-control" value = "${callback.address}" readonly style="width: 70%; margin-bottom: 2vh">`;
    callbackHTML += '<div class = "input-group-append">';
    callbackHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('newCallbackAddr')">Copy</button>`;
    callbackHTML += '</div>';
    callbackHTML += '</div>';

    callbackHTML += '</br>';
    callbackHTML += '<p><strong>Currency</strong></p>';
    callbackHTML += `<p>${globalCurrenciesById[callback.currencyId].name}</p>`;

    callbackHTML += '</div>';
    var for_output = document.getElementById("for_output");
    for_output.style.visibility = "visible";
    for_output.innerHTML = callbackHTML;
    return result;
}

function output_search_pannel(id){
    var search = '<div class="input-group">';
    search +=`<input type="text" id = "${id}" class="form-control" placeholder="Search..." style="width: 40%; margin-bottom: 1vh;">`;
    search +='<div class="input-group-append">'
    search +='<button class="btn btn-secondary" type="button" onclick = "search_callback()">';
    search +='<i class="fa fa-search"></i>';
    search +='</button>';
    search +='</div>';
    search +='</div>';
    return search;
}

function output_callbacks(result){
    var callbacks_list = JSON.parse(result).items;
    var counter = 0;

    var callbacksHTML = output_search_pannel("callback_id_for_searching");

    callbacksHTML += '<div class="list-group">';
    callbacks_list.filter(element => {
        callbacksHTML += `<a class="list-group-item border-right-0 border-left-0" data-toggle="collapse" data-target="#detail_information${counter}">`;
        callbacksHTML += '<div class="row">';
        callbacksHTML += '<div class="col-sm">';
        var splits = parseIsoDatetime(element.created).toString().split(' ');
        callbacksHTML += splits[1];
        callbacksHTML += ' ';
        callbacksHTML += splits[2];
        callbacksHTML += '</br>';
        callbacksHTML += splits[4];
        callbacksHTML += '</div>';

        callbacksHTML += '<div class="col-sm">';
        callbacksHTML += globalCurrenciesById[element.currencyId].name;
        callbacksHTML += '</div>';

        callbacksHTML += '<div class="col-sm">';
        if (element.address.length > 70){
            for (var i = 0; i<=50; i++){
                callbacksHTML += element.address[i];
            }
            callbacksHTML += '...';
            for (var i = 1; i<=20; i++){
                callbacksHTML += element.address[element.address.length-i];
            }
        }
        else{
            callbacksHTML += element.address;
        }
        callbacksHTML += '</div>';
        callbacksHTML += '</div>';


        callbacksHTML += '</a>';
        callbacksHTML += `<div id="detail_information${counter}" class="collapse" style="margin-top: 2vh; margin-left: 2vw;">`;
        callbacksHTML += '<div class = "input-group">';
        callbacksHTML += '<label for="callbacksId">Callback ID</label>';
        callbacksHTML += '</br>'; 
        callbacksHTML += `<input type="text" id="callbacksId${counter}" class="form-control" value = "${element.id}" readonly style = "width: 70%; margin-bottom: 2vh">`;
        callbacksHTML += '<div class = "input-group-append">';
        callbacksHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('callbacksId${counter}')">Copy</button>`;
        callbacksHTML += '</div>';
        callbacksHTML += "</div>"; 

        callbacksHTML += '<div class = "input-group">';
        callbacksHTML += '<label for="callbacksAddr">Address</label>';
        callbacksHTML += '</br>'; 
        callbacksHTML += `<input type="text" id="callbacksAddr${counter}" class="form-control" value = "${element.address}" readonly style = "width: 70%; margin-bottom: 2vh">`;
        callbacksHTML += '<div class = "input-group-append">';
        callbacksHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('callbacksAddr${counter}')">Copy</button>`;
        callbacksHTML += '</div>';
        callbacksHTML += "</div>"; 

        callbacksHTML += `</div>`;
        counter++;
    });
    callbacksHTML += '</div>';
    var for_output = document.getElementById("for_output");
    for_output.style.visibility = "visible";
    for_output.innerHTML = callbacksHTML; 
    return result;
}

function output_transactions(result){
    var transactions_list = JSON.parse(result).items;
    var counter = 0;

    var transactionsHTML = '<div class="list-group">';
    transactions_list.filter(element => {
        transactionsHTML += `<a class="list-group-item border-right-0 border-left-0" data-toggle="collapse" data-target="#detail_information${counter}">`;
        transactionsHTML += '<div class="row">';
        transactionsHTML += '<div class="col-sm">';
        var splits = parseIsoDatetime(element.created).toString().split(' ');
        transactionsHTML += splits[1];
        transactionsHTML += ' ';
        transactionsHTML += splits[2];
        transactionsHTML += '</br>';
        transactionsHTML += splits[4];
        transactionsHTML += '</div>';

        transactionsHTML += '<div class="col-sm">';
        transactionsHTML += element.currency.name;
        transactionsHTML += '</div>';

        transactionsHTML += '<div class="col-sm">';
        transactionsHTML += element.amount.displayValue;
        transactionsHTML += '</div>';

        transactionsHTML += '<div class="col-sm">';
        transactionsHTML += element.status;
        transactionsHTML += '</div>';

        transactionsHTML += '</div>';

        transactionsHTML += '</a>';
        transactionsHTML += `<div id="detail_information${counter}" class="collapse" style="margin-top: 2vh; margin-left: 2vw;">`;
        transactionsHTML += '<div class = "input-group">';
        transactionsHTML += '<label style="margin-bottom: 1vh">Amount</label>';
        transactionsHTML += `<p>${element.amount.displayValue} ${element.currency.symbol}</p>`;
        transactionsHTML += `<label for="suportId${counter}">Support ID</label>`; 
        transactionsHTML += '</br>';
        transactionsHTML += `<input type="text" id="suportId${counter}" class="form-control" value = "${element.id}" readonly style="width: 70%; margin-bottom: 2vh">`;
        transactionsHTML += '<div class = "input-group-append">';
        transactionsHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('suportId${counter}')">Copy</button>`;
        transactionsHTML += '</div>';
        transactionsHTML += "</div>"; 
        transactionsHTML += '</div>';
        counter++;
    });

    transactionsHTML += '</div>';
    var for_output = document.getElementById("for_output");
    for_output.style.visibility = "visible";
    for_output.innerHTML = transactionsHTML;
    return result;
}

function copyFunction(id_for_copy) {
    var copyText = document.getElementById(`${id_for_copy}`);
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function output_callback_for_edit(result){

    var callback = JSON.parse(result);
    var callbackHTML = output_search_pannel("callback_id_for_searching");

    callbackHTML += '<div class="list-group">';
    callbackHTML += `<a class="list-group-item border-right-0 border-left-0" data-toggle="collapse" data-target="#detail_information">`;
    callbackHTML += '<div class="row">';
    callbackHTML += '<div class="col-sm">';
    var splits = parseIsoDatetime(callback.created).toString().split(' ');
    callbackHTML += splits[1];
    callbackHTML += ' ';
    callbackHTML += splits[2];
    callbackHTML += '</br>';
    callbackHTML += splits[4];
    callbackHTML += '</div>';

    callbackHTML += '<div class="col-sm">';
    callbackHTML += globalCurrenciesById[callback.currencyId].name;
    callbackHTML += '</div>';

    callbackHTML += '<div class="col-sm">';
    if (callback.address.length > 70){
        for (var i = 0; i<=50; i++){
            callbackHTML += callback.address[i];
        }
        callbackHTML += '...';
        for (var i = 1; i<=20; i++){
            callbackHTML += callback.address[callback.address.length-i];
        }
    }
    else{
        callbackHTML += callback.address;
    }
    callbackHTML += '</div>';
    callbackHTML += '</div>';


    callbackHTML += '</a>';
    callbackHTML += `<div id="detail_information" class="collapse" style="margin-top: 2vh; margin-left: 2vw;">`;
    callbackHTML += '<div class = "input-group">';
    callbackHTML += '<label for="callbacksId">Callback ID</label>';
    callbackHTML += '</br>'; 
    callbackHTML += `<input type="text" id="callbacksId" class="form-control" value = "${callback.id}" readonly style = "width: 70%; margin-bottom: 2vh">`;
    callbackHTML += '<div class = "input-group-append">';
    callbackHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('callbacksId')">Copy</button>`;
    callbackHTML += '</div>';
    callbackHTML += "</div>"; 

    callbackHTML += '<div class = "input-group">';
    callbackHTML += '<label for="callbacksAddr">Address</label>';
    callbackHTML += '</br>'; 
    callbackHTML += `<input type="text" id="callbacksAddr" class="form-control" value = "${callback.address}" readonly style = "width: 70%; margin-bottom: 2vh">`;
    callbackHTML += '<div class = "input-group-append">';
    callbackHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="copyFunction('callbacksAddr')">Copy</button>`;
    callbackHTML += '</div>';
    callbackHTML += "</div>";
    
    callbackHTML += '<div class = "input-group">';
    callbackHTML += '<label for="callbacksLabel">Label</label>';
    callbackHTML += '</br>'; 
    callbackHTML += `<input type="text" id="callbacksLabel" class="form-control" value = "${callback.label}" placeholder="Enter new label" style = "width: 70%; margin-bottom: 2vh">`;
    callbackHTML += '<div class = "input-group-append">';
    callbackHTML += `<button class="btn btn-outline-secondary active" type="button" onclick="editFunction('${callback.id}')">Edit</button>`;
    callbackHTML += '</div>';
    callbackHTML += "</div>"; 

    callbackHTML += `</div>`;

    var for_output = document.getElementById("for_output");
    for_output.style.visibility = "visible";
    for_output.innerHTML = callbackHTML; 
    return result;
}
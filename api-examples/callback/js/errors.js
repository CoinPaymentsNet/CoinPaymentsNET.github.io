function output_error(type_of_alert, text){
    var alert = document.getElementById(type_of_alert);
    alert.style.display = "block";
    var alertHTML = `<p><strong>!<strong>${text}</p>`;
    alert.innerHTML = alertHTML;
}

function output_searching_error(){
    var error = document.getElementById("for_output");
    var errorHTML = output_search_pannel("callback_id_for_searching") + `<p>No results</p>`;
    error.innerHTML = errorHTML;
}
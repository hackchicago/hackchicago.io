var ref;
var conversationalForm

window.onload = function() {
    fillRef(getParam("ref"));
    $( "#signup" ).sisyphus();
    console.log("Form data saved.");

    // disable autocomplete completely
    $("input, select, textarea").on("focus click", function() {
      $(this).attr("autocomplete", "new-" + Math.random().toString(36).replace(/[^a-z]+/g, ''));
    });
};

var emailCheck = function(dto, success, error){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(dto.text.toLowerCase()))
    return success();
    return error();
};

//Get Parameter
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fillRef(code) {
    if (code != "" && code != null) {
        $("#ref-fill").html('<input type="hidden" name="REF" id="refcode">');
        $("#refcode").val(code);
    } else {
        $("#ref-fill").html('<label for="refcode">Who did you hear about Hack Chicago from? <span class="desc">First and last name</span></label><input type="text" id="REF" name="REF" cf-questions="Just by chance, who told you about Hack Chicago? Simply reply with their full name.<br />If you were not referred by anyone, simply reply “no”."/>');
    }
}

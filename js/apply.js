var ref;

window.onload = function() {
    var conversationalForm = window.cf.ConversationalForm.startTheConversation({
        formEl: document.getElementById("signup"),
        context: document.getElementById("cf-context"),
        robotImage: "/img/orpheus.png",
        preventAutoFocus: true,
        userInterfaceOptions: { 
            controlElementsInAnimationDelay: 250, 
            robot: { 
                robotResponseTime: 500,   
                chainedResponseTime: 400 
            }, 
            user:{ 
                showThinking: false, 
                showThumb: false 
            } 
        } 
    });

    fillRef(getParam("ref"));
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

    $("#refcode").val(code);

}
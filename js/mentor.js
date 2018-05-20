var ref;
var conversationalForm

window.onload = function() {
  loadForm();
};

var emailCheck = function(dto, success, error){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(dto.text.toLowerCase()))
    return success();
    return error();
};

var urlCheck = function(dto, success, error){
    var re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if(re.test(dto.text.toLowerCase()))
    return success();
    return error();
};

function loadForm() {
  conversationalForm = window.cf.ConversationalForm.startTheConversation({
    formEl: document.getElementById("signup"),
    context: document.getElementById("cf-context"),
    robotImage: "/img/orpheus.png",
    preventAutoFocus: false,
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
}

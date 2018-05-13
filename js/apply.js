window.onload = function() {
    var conversationalForm = window.cf.ConversationalForm.startTheConversation({
        formEl: document.getElementById("signup"),
        context: document.getElementById("cf-context"),
        submitCallback: function() {
            conversationalForm.addRobotChatResponse("Amazing! Your application has been submitted - we'll follow up with you via email as soon as possible! Meanwhile... Wanna check out our <a href=\"/onboard\">Ambassador Program</a>?"); 
        },
        robotImage: "/img/orpheus.png",
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
};

var emailCheck = function(dto, success, error){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(dto.text.toLowerCase()))
    return success();
    return error();
};


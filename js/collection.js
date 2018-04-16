// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZ27ppM3SAiKEYTRbDtohZHcWkBujBFAc",
  databaseURL: "https://hackchicago-emails.firebaseio.com",
  projectId: "hackchicago-emails"
};
firebase.initializeApp(config);

var database = firebase.database();

function pushData(){
  var data = document.getElementById("emails").value;
  if(validate(data)) {
    var dataRef = database.ref('/').push();//Generates a new child location with a randomly generated id.
    dataRef.set({ value: data })
    .then(function() {
      success();
    })
    .catch(function(error) {
      console.log('Synchronization failed');
    });
  }else{
    failure();
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate(email) {
  console.log('test')
  if (validateEmail(email)) {
    console.log("working");
    return true;
  } else {
    console.log("wrong")
    return false;
  }
}

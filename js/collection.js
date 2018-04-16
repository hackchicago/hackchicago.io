// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZ27ppM3SAiKEYTRbDtohZHcWkBujBFAc",
  databaseURL: "https://hackchicago-emails.firebaseio.com",
  projectId: "hackchicago-emails"
};
firebase.initializeApp(config);

var database = firebase.database();

function pushData(){
  var data = document.getElementById("email").value;
  var dataRef = database.ref('/').push();//Generates a new child location with a randomly generated id.
  dataRef.set({
    value: data
  });
}

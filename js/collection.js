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
  var dataRef = database.ref('/').push();//Generates a new child location with a randomly generated id.
  dataRef.set({ value: data })
  .then(function() {
    success();
  })
  .catch(function(error) {
    console.log('Synchronization failed');
  });
}

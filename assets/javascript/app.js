
//Initialize Firebase
var config = {
  apiKey: "AIzaSyDkpN_boZUSgi-ZCWSidlDNN4s59JcRnAU",
    authDomain: "trainschedule-50e3c.firebaseapp.com",
    databaseURL: "https://trainschedule-50e3c.firebaseio.com",
    projectId: "trainschedule-50e3c",
    storageBucket: "trainschedule-50e3c.appspot.com",
    messagingSenderId: "442291950871"
};

firebase.initializeApp(config);

var database = firebase.database();
// Current Time
/*  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));*/

//Button for adding train
$("#submit-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  //alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});


//Create Firebase event for adding train to the database and add a row to html 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);


//Calculate the Next Arrival based on current time

//Difference in current time from start time
var trainArrival = moment().diff(moment.unix(trainTime), "minutes");

//find remainder between the difference in start 
var remainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;
var minLeft = trainFrequency - remainder;

//Prettify trainArrival
var trainArrivalPretty = moment.unix(trainArrival).format("hh:mm A");

//Calculate minutes away 
var trainAway = moment().add(minLeft, "m").format("X");

console.log(trainArrival);
console.log (remainder);
console.log (minLeft);
console.log (trainArrivalPretty);
console.log(trainAway);

// Add each train's data into the table
  $("#currentTrain > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainArrivalPretty + "</td><td>" + trainAway + "</td></tr>");

});



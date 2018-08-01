// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyB6yF_7bMgO0cr0hYf1wLrvQLE3I9Z6FJ8",
  authDomain: "rps-multiplayer-8a6ac.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-8a6ac.firebaseio.com",
  projectId: "rps-multiplayer-8a6ac",
  storageBucket: "rps-multiplayer-8a6ac.appspot.com",
  messagingSenderId: "50392520770"
};

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref();

var usersRef = ref.child("users");

ref.on("value", function(snapshot) {


    console.log("YOU ARE HERE NOW");
    usersRef.set({
      one: {
        name:"",
       
      },
      two: {
       name:"",
      }
    });

    ref.child("turn").set({
      value: 1});

  
  console.log(snapshot.val());
  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});






// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref().set()
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
/*database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


});*/

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

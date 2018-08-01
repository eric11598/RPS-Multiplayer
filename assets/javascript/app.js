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

$("#playerOneButtonContainer").hide();
$("#playerTwpButtonContainer").hide();

var usersRef = ref.child("users");
var turnRef = ref.child("users");

var playerOne = false;
var playerTwo = false;
var gameMode = 0; //1 when game is playing
var turn = 1; //swaps between 1 and 2 for whos turn it is 




ref.on("value", function(snapshot) {

var usersRef = ref.child("users");
console.log(usersRef);

//Checks to see if players are in game by pulling the name object

if(snapshot.val().users.one.name==="")
  {
    playerOne = false;
    $("#playerOneName").text("Waiting for player 1");
  }

if(snapshot.val().users.two.name==="")
  {

    playerTwo = false
    $("#playerTwoName").text("Waiting for player 2");
    
  }

if(snapshot.val().users.one.name)
  {
    playerOne = true;
    $("#playerOneName").text(snapshot.val().users.one.name);
    
  }

if(snapshot.val().users.two.name)
  {
    playerTwo = true;
    $("#playerTwoName").text(snapshot.val().users.two.name);
   
  }

//If both players exist, game mode starts
if(snapshot.val().users.one.name && snapshot.val().users.two.name)
{
  console.log("HURRRRRRR");

  if(turn===1)
  {
    console.log("1");
    $("#playerOneButtonContainer").show();
    $("#playerTwoButtonContainer").hide();
  }
  if(turn===2)
  {
    console.log("2");
    $("#playerOneButtonContainer").hide();
    $("#playerTwoButtonContainer").show();

  }

  /*
  var buttonArray = ['playerOneRock', 'playerOnePaper', 'playerOneScissor', 'playerTwoRock', 'playerTwoPaper', 'playerTwoScissor'];
  
  for(var i = 0; i<buttonArray.length; i++)
  {
    var container;
    var player;
    gameMode = 1;

    if(i>2)
    {
      container = '#playerTwoButtonContainer';
      player = 'playerTwo';
    }
    else
    {
      container = '#playerOneButtonContainer';
      player = 'playerOne';
    }

      $('<button/>', {
        id: buttonArray[i],
        class: 'btn btn-secondary btn-sm',
        value: buttonArray[i],
        player: player,
        text: buttonArray[i],  
        }).appendTo(container);
    
}*/


}
  

  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


function test() {
  usersRef.set({
    one: {
      name:"",
     
    },
    two: {
     name:"",
    }
  });

}

//test();
$(document).on("click", ".btn-secondary", runGame);

function runGame(){
  console.log("LOOL");
  var moveTemp = this.value
  var player = (this.value).substring(0, 9);

  console.log(player+"  "+moveTemp);
  
  if(player === "playerOne")
  {
    firebase.database().ref('users/one/').update({
      move: moveTemp,
    });
    turn = 2;
  }
  

}

// 2. Button for adding Employees
$("#add-user").on("click", function(event) {
  event.preventDefault();
  

  // Grabs user input
  var name = $("#name-input").val().trim();
  
  if(!playerOne)
    usersRef.update({
      one: {
        name: name,
        wins: 0,
        losses: 0,
        move: '',
      }});

  else if(!playerTwo)
    usersRef.update({
      two: {
        name: name,
        wins: 0,
        losses: 0,
        move:'',
      }});
  
});



// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  

});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

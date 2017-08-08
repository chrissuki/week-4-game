var playerone = 0;
var playertwo = 0;
var isplayerone = true;
var playerOneHealth = 0;
var playerOneAttack = 0;      
var playerTwoHealth = 0;
var playerTwoAttack = 0;
var enemiesLeft = 3;
var firstAttack = true;

var player = {

    // variables and arrays for each character mega = 0, wolverine = 1, ......
    name : ["MEGA MAN", "WOLVERINE", "MARIO", "RYU"],
    hitpoints : [5,15,10,10],
    counterpoints : [10,20,25,25],
    health : [120,100,150,180],
    image: ["assets/images/megamanright2.gif", "assets/images/wolverine.png","assets/images/mario.png","assets/images/ryu.png"],
    imageleft: ["assets/images/megaman4.gif","assets/images/wolverine.png"],
    imageright: ["assets/images/megamanright.gif"],
    imagefight: ["assets/images/megaman_left_attack.gif", "assets/images/wolverineLeft.gif"],
    ids : ["megaman", "wolverine", "mario", "ryu"],
    imagewins: ["assets/iamges/megaman4.png", "assets/images/wolverinewins.", "assets/images/mariowins.jpg","assets/images/ryuwins.jpg"],

    // removes image at top and places new pic in versus section
    playerBoard:function(characterIndex){
      $("#player").attr("src", this.imageleft[characterIndex]);
      //vs image
      $("#vs").attr("src","assets/images/vs.png");
      // player is false so that next character click will goto computer
      isplayerone = false;
      $(".pick").html("Pick an enemy");
      console.log(playerone + "-playerone");
      //created hitpoints for character... in this function because hitpowers increase throughout the program
      playerOneAttack = player.hitpoints[characterIndex];
    },
    // takes in 0 - 3 depending on click, sets up images and points 
    computerBoard:function(characterIndex){
      //makes playertwo = to 0 - 3
      playertwo = characterIndex;
      //makes health and counter points for character
      playerTwoHealth = this.health[characterIndex];
      playerTwoAttack = this.counterpoints[characterIndex];
      //display computer image
      $('#computer').attr("src", this.image[characterIndex]);
      //used to reset playerone and playertwo points 
      firstAttack = true;
      $(".pick").html("");
    }

};

//attack button
function attack(){
      //removes <-- pick player 
      $(".pick").html("");
      //removes vs
      $("#vs").attr("src","");
      // make player stats
      console.log(playerone + "-playerone");
      console.log(playertwo + "-playertwo");
      //resets player health, player2 health, player2 attack
      if (firstAttack === true){
        playerOneHealth = player.health[playerone];      
        playerTwoHealth = player.health[playertwo];
        playerTwoAttack = player.counterpoints[playertwo];
        firstAttack = false;
      }
      //playerone attack gif
      $("#player").attr("src",player.imagefight[playerone]);
      
      //attack procedures
            console.log("player1 health - " + playerOneHealth);
            console.log("player2 heath - " + playerTwoHealth);
            //playerone attack
            playerOneHealth = playerOneHealth - playerTwoAttack;
            //playertwo attack
            playerTwoHealth = playerTwoHealth - playerOneAttack;
            //increase playerone HP each attack button
            playerOneAttack += 5;
            console.log("player1 new health - " + playerOneHealth);
            console.log("player2 new heath - " + playerTwoHealth);

      //game over playerone dies      
      if (playerOneHealth <=0) {
        $("#vs").attr("src", "assets/images/gameover.jpg");

        //delay and then resets board
        var delayMillis = 2500; 
        setTimeout(function() {
           console.log("DELAY");
            location.reload();
         }, delayMillis);
      }
      //If playerone wins 
      else if (playerTwoHealth <= 0 ) {
        //computer display gone
        $("#computer").attr("src","");
        //display pick new player
        $(".pick").html("Click on an enemy from above.");
        //decrease enemiesLeft for each defeat... if goes to 0.. end game -> win 
        enemiesLeft-- ;
        console.log("enemies left - " + enemiesLeft);

      //Payer one wins  
      if (enemiesLeft === 0){
          //display wins
          $("#vs").attr("src",player.imagewins[playerone]);
          var imageCrystal = $("<img>");
          imageCrystal.addClass("you-win");
          imageCrystal.attr("src", "assets/images/red.png");
          $("#vs").append(imageCrystal);
          //delay and reset
          var delayMillis = 2500; 
          setTimeout(function() {
           console.log("DELAY");
            location.reload();
         }, delayMillis);

        } // end if statement

      }//end else if statement

} // attack function ends

//if dom is loaded run jquery
$(document).ready(function() {
  //if click megaman  
  $("#megaman").on("click", function() {
    // if player one... run playerboard function and change player image to playerone icon
    if (isplayerone === true){
      playerone = 0;
      player.playerBoard(playerone);
      $("#megaman").attr("src","assets/images/playerone.jpg");
    }
    //if playertwo.... hide image and hide numbers 
      else if (playerone != 0) {
        player.computerBoard(0);
        $("#megaman").hide();
        $(".megaman-box").attr("class","resetBox");
        $("#name-megaman").empty();
        $("#healthPT-megaman").empty();
      }  
  });
  
  $("#wolverine").on("click", function() {
    // if player one... run playerboard function and change player image to playerone icon
    if (isplayerone === true){
      playerone = 1;
      player.playerBoard(playerone);
      $("#wolverine").attr("src","assets/images/playerone.jpg");
    }
    //if playertwo.... hide image and hide numbers 
       else if (playerone != 1){
        player.computerBoard(1);
        $("#wolverine").hide();
        $(".wolverine-box").attr("class","resetBox");
        $("#name-wolverine").empty();
        $("#healthPT-wolverine").empty();
      }  
  });

  $("#mario").on("click", function() {
    // if player one... run playerboard function and change player image to playerone icon
    if (isplayerone === true){
      playerone = 2;
      player.playerBoard(playerone);
      $("#mario").attr("src","assets/images/playerone.jpg");
    }
    //if playertwo.... hide image and hide numbers 
       else if (playerone != 2){
        player.computerBoard(2);
        $("#mario").hide();
        $(".mario-box").attr("class","resetBox");
        $("#name-mario").empty();
        $("#healthPT-mario").empty();
        // ? $("#mario").addclass("resetBox"); ? is it because I already had a class 
      }  
  });

  $("#ryu").on("click", function() {
    // if player one... run playerboard function and change player image to playerone icon
    if (isplayerone === true){
      playerone = 3;
      player.playerBoard(playerone);
      $("#ryu").attr("src","assets/images/playerone.jpg");
    }
    //if playertwo.... hide image and hide numbers 
       else if (playerone != 3){
        player.computerBoard(3);
        $("#ryu").hide();
        $(".ryu-box").attr("class","resetBox");
        $("#name-ryu").empty();
        $("#healthPT-ryu").empty();
      }  
  });

}); // end document redy function





// $(".crystal-image").on("click", function() {

//     // Clicking the button triggers an alert message.
//     alert("You clicked a crystal!");

//   });


// var targetNumber = 50;

//   // Here we set the "number-to-guess" header to match the "targetNumber".
//   // Eventually this will allow us to change the HTML to match the value in the JavaScript.
//   $("#number-to-guess").text(targetNumber);

//   if (counter === targetNumber) {

//       // If the numbers match we'll celebrate the user's win.
//       alert("You win!");
//     }


//     for (var i = 0; i < numberOptions.length; i++) {

//     // For each iteration, we will create an imageCrystal
//     var imageCrystal = $("<img>");

//     // First each crystal will be given the class ".crystal-image".
//     // This will allow the CSS to take effect.
//     imageCrystal.addClass("crystal-image");

//     // Each imageCrystal will be given a src link to the crystal image
//     imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

//     // Each imageCrystal will be given a data attribute called data-crystalValue.
//     // This data attribute will be set equal to the array value.
//     imageCrystal.attr("data-crystalvalue", numberOptions[i]);

//     // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
//     $("#crystals").append(imageCrystal);
//   }
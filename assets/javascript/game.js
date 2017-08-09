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
    imageleft: ["assets/images/megaman4.gif","assets/images/wolverine.png","assets/images/marioleft.png","assets/images/rye_left.gif"],
    imageright: ["assets/images/megamanright.gif","assets/images/wolverine.png","assets/images/rightright.png","assets/images/ryuright.gif"],
    imagefight: ["assets/images/megaman_left_attack.gif", "assets/images/wolverineLeft.gif", "assets/images/marioattack.gif", "assets/images/ryu_left.gif"],
    ids : ["megaman", "wolverine", "mario", "ryu"],
    imagewins: ["assets/iamges/megaman4.png", "assets/images/wolverinewins.", "assets/images/mariowins.jpg","assets/images/ryuwins.jpg"],

    // removes image at top and places new pic in versus section
    playerBoard:function(characterIndex){
      $("#player").attr("src", this.imageleft[characterIndex]);
      //vs image
      $("#vs").attr("src","assets/images/vs.png");
      // player is false so that next character click will goto computer
      isplayerone = false;
      $(".pick").html("Pick an enemy.");
      console.log(playerone + "-playerone");
      //created hitpoints for character... in this function because hitpowers increase throughout the program
      playerOneAttack = player.hitpoints[characterIndex];
    },
    // takes in 0 - 3 depending on click, sets up images and points 
    computerBoard:function(characterIndex){
      //makes playertwo = to 0 - 3
      playertwo = characterIndex;
      // player one health is reset
      playerOneHealth = player.health[playerone];
      //makes health and counter points for character
      playerTwoHealth = this.health[characterIndex];
      playerTwoAttack = this.counterpoints[characterIndex];
      //display computer image
      $('#computer').attr("src", this.imageright[characterIndex]);
      //used to reset playerone and playertwo points 
      firstAttack = true;
      $(".pick").html("Hit attack button until there is a winner.");
      //display health      
      $("#playeroneTitle").html("Health = " + playerOneHealth);
      $("#playertwoTitle").html("Health = " + playerTwoHealth);
    }

};

//attack button
function attack(){
      //changes <-- pick player 
      $(".pick").html("Keep hitting attack button.");
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
      // attack sound
      var audio = new Audio("assets/images/fight.mp3");
      audio.play();


      if (playerone === 3){
      	//$("#player").animate({ height: "1000px", width: "200px"});
      	//$("#player").css("float","left");
      	$("#player").attr("src","assets/images/ryu.png");
      	$("#player").animate({ height: "+=10px" }, "fast");
      	$("#player").animate({ height: "-=10px" }, "fast");
      }
      $("#player").animate({ left: "+=400px" }, "slow");
      $("#player").animate({ left: "-=400px" }, "slow");

      var delayMillis = 1500; 
          setTimeout(function() {
           console.log("DELAY");
             $("#player").attr("src",player.imageleft[playerone]);
         }, delayMillis);

      
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
      //display health      
      $("#playeroneTitle").html("Health = " + playerOneHealth);
      $("#playertwoTitle").html("Health = " + playerTwoHealth);

       //counter attack
      if (playerTwoHealth > 0){
      var delayMillis = 2500; 
          setTimeout(function() {
           console.log("DELAY 2" + playertwo);
            $("#computer").attr("src",player.imageright[playertwo]);
            $("#computer").animate({ left: "-=400px" }, "slow");
            $("#computer").animate({ left: "+=400px" }, "slow");
         }, delayMillis);
        }

      //game over playerone dies      
      if (playerOneHealth <=0) {
      	//change css and image to giant game over
        $("#vs").attr("src", "assets/images/gameover2.jpg");
        $("#vs").css("position","fixed");
        $("#vs").css("top","0");
        $("#vs").css("left","0");
        $("#vs").css("width","800px");
        $("#vs").css("height","500px");
        $("#vs").css("margin-right","200px");
        $("#vs").css("z-index","6");
       // var gameover = $("<img>");
       // gameover.addClass("gameover");
       // gameover.attr("src","assets/images/gameover2.gif");
       // $("#player").append(gameover);

        //delay and then resets board
        var delayMillis = 2000; 
        setTimeout(function() {
           console.log("DELAY");
            location.reload();
         }, delayMillis);
      }
      //If playerone wins 
      else if (playerTwoHealth <= 0 ) {
        //computer display gone
        var delayMillis = 2000; 
        setTimeout(function() {
           console.log("DELAY");
            $("#computer").attr("src","assets/images/rip.png");
         }, delayMillis);
        $("#computer").attr("src","assets/images/rip.png");
        $(".pick").html("Pick another enemy");
        //decrease enemiesLeft for each defeat... if goes to 0.. end game -> win 
        enemiesLeft-- ;
        console.log("enemies left - " + enemiesLeft);

        var delayMillis = 2000; 
          setTimeout(function() {
           console.log("DELAY");
           $("#computer").attr("src","");
         }, delayMillis);


      //Player one wins  
      if (enemiesLeft === 0){
          //display wins
 			//change image         
        	$("#vs").attr("src",player.imagewins[playerone]);
        	//change css for vs
          	$("#vs").css("position","fixed");
        	$("#vs").css("top","0");
        	$("#vs").css("left","0");
        	$("#vs").css("width","800px");
        	$("#vs").css("height","500px");
        	$("#vs").css("margin-right","200px");
        	$("#vs").css("z-index","6");
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
    // if player one... run playerboard function and change player image to player one icon
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


/*Documentation of the Color Game:

    The point of the color game is to guess the RGB color that is presented in the game title banner by clicking the square color box that matches. The callenge occurs because the colors and the squares are randomized. When the correct color is picked, all of the squares and the title banner match the color. When the incorrect color is picked, the clicked box "disappears."

    Upon clicking the correct color, the player is asked if he/she wants to play again. If clicked, the game resets and the colors are again randomized. 
    
    There are two modes: Easy and Hard. Easy has only three squares to choose from, while Hard has six.

*/


    //Setup. 
var numSquares = 12;//Every time we add a new mode, the new mode's number of squares becomes the default numSquares
var squares = document.querySelectorAll(".square");

var colorDisplay = document.getElementById("colorDisplay");

    //Front Strip
var message = document.getElementById("message");
var reset = document.getElementById("reset");


//Colors array represent the colors of each box
var colors = genRandColors(numSquares);

var picked = colors[roulette()]; 

    //Initial Text Display
colorDisplay.textContent = picked;
var h1 = document.querySelector("h1");
h1.style.backgroundColor = "deepskyblue";



    //Reset Button ("New Colors"):

reset.addEventListener("click", function(){
   resetCommon();
});

    //Modes (Easy vs Hard)
var modeButtons = document.getElementsByClassName("mode");


    //Modes Logic
for(var i = 0; i < modeButtons.length; i++){
  modeButtons[i].addEventListener("click", function(){
       
       modeButtons[0].classList.remove("selected");//Easy
       modeButtons[1].classList.remove("selected");//Medium
       modeButtons[2].classList.remove("selected");//Hard
       modeButtons[3].classList.remove("selected");//Extra Hard<--To add another mode, add new.
       
       this.classList.add("selected");
      
      //Ternary Operator: Sets condition, if condition is met-execute A. If not, execute B. If you want to add a mode, simply go back to if-else format, and add a new numSquares value
      
      /*this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //Same thing as: (until you add new modes)*/
      if(this.textContent === "Easy"){
          numSquares = 3;
      }
      else if(this.textContent === "Medium"){
          numSquares = 6;
      }
      else if(this.textContent === "Hard"){
          numSquares = 9;
      }
      else {
          numSquares = 12;
      }
      
      resetCommon();
  });        
} 


        //Main Game Logic
for(var i = 0; i < squares.length; i++) {
        //Add initial colors. The initial colors are random colors from the genRandColors array.
    squares[i].style.backgroundColor = colors[i];  
        //Add event listeners
    squares[i].addEventListener("click", function(){
        //grab color of picked square
        var userClicked = this.style.backgroundColor;
            //compare color to var picked
            if(userClicked === picked){
                    message.textContent = "Correct!";    
                    changeColors(userClicked);//<-- Test: if bug occurs, pass userClicked into this function
                    h1.style.backgroundColor = userClicked;
                    reset.textContent = "Play again?"
                }    
            else {
                    this.style.backgroundColor = "#182929";
                    message.textContent = "Incorrect. Try again!";
                }    
        });
}

  //Changing all squares after Correct is Chosen
function changeColors(){
        //Loop through squares
    for(var i = 0; i < squares.length; i++) {
        //change colors
        squares[i].style.backgroundColor = picked;  
    }
}        

    //Chooses random color from  within the color array
function roulette(){
    var i = Math.floor(Math.random() * colors.length); //(random whole number between one and length of difficulty)
    return i;
}

function genRandColors(num) {
    //create an array
 var randArray = [];    
    
    //add num random colors to array
  for(var i = 0; i < num; i++){
      
       //Get random color and push into array
      randArray.push(randomColor());
  }  
    
    //return array
    
return randArray;
};

    //Creates random color
function randomColor() {
    //pick a "red" from 0-255;
    var red = Math.floor(Math.random() * 256);
    
    //pick a "green" from 0-255;
    var green = Math.floor(Math.random() * 256);
    
    //pick a "blue" from 0-255;
    var blue = Math.floor(Math.random() * 256);
    
    var rgbString = "rgb("+red+", "+green+", "+blue+")";
    
    return rgbString;
    
}

    //Every time we reset the game (switching modes nad pressing "play again"), we do the same thing. This can effect how we implement DRY code. So, we reduce the process down to one function:
function resetCommon (){
        //Cosmetics:
    message.textContent = "";
    reset.textContent = "New Colors";
    h1.style.backgroundColor = "deepskyblue";
    
    //reset all colors
    colors = genRandColors(numSquares);  
    
    //pick random color from array
    picked = colors[roulette()];
    
    //Change title rgb
    colorDisplay.textContent = picked;
    
    //change color of squares and Restart Game
  for(var i = 0; i < squares.length; i++) {
    //Every time we resart the game, present square colors
    squares[i].style.display = "block";
      
      //Ternary again:
    colors[i] ? squares[i].style.backgroundColor = colors[i]: squares[i].style.display = "none";  
  }    
}

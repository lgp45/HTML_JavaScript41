//This is for the racegame.html page

/*
var cars = ["Honda", "Chevy", "Buick", "Tesla", "Porche"];

//change an item in an array
cars[2] = "Toyota";

//add an item to an array
cars[5] = "Ford";

for(var i = 0; i < cars.length; i++)
{
    console.log(cars[i]);
}

*/

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var timer = requestAnimationFrame(main);

var cars = [];
var numCars = 3;

//background image for the canvas
var bkg = new Image();
bkg.src = "image/Background.png";

//variable for current state of the game
var currentState = 0;
var state = [];
var winner; 
var choice = 1;
function GameObject()
{
    this.x = 50;
    this.y = 50;
    this.w = 50;
    this.h = 50;
    this.color;
    this.speed = 1;
    this.fuel = 100;
    

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.move = function(){
        this.x += this.speed;
    }
}

for (var i = 0; i < numCars; i++)
{
    cars[i] = new GameObject();
    cars[i].x = 40;
    cars[i].speed = randomRange(10,1);
    
    
}

var startLine = new GameObject();
startLine.x = 100;
startLine.y = 100;
startLine.w = 10;
startLine.h = 400;
startLine.color = "darkgreen";

var finishLine = new GameObject();
finishLine.x = 700;
finishLine.y = 100;
finishLine.w = 10;
finishLine.h = 400;
finishLine.color = "darkred";


//set the y position of the cars
cars[0].y = 150;
cars[1].y = 250; 
cars[2].y = 350;

//set the color of the cars
cars[0].color = 'gold';
cars[1].color = 'yellow';
cars[2].color = 'blue';



//Game States
state[0] = function(){
    //player picks winner
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0 , c.width, c.height);
    //draw some text
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Choose the winner!', c.width/2, c.height/2 - 100);
    ctx.fillText('Use Keys 1, 2, or 3.', c.width/2, c.height/2 + 100);
    
}
state[1] = function(){
    //the race happens
    for (var i = 0; i < cars.length; i++){
        cars[i].move();
            if(cars[i].x > finishLine.x){
                console.log("The Winner is " + (cars[i].color).toString());
                winner = cars.indexOf(cars[i]);
                currentState = 2;
            }
        }
}
state[2] = function(){
    //the winner is declared  here
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0 , c.width, c.height);
    //draw some text
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    if(winner === choice){
        ctx.fillText('The winner is!: ' + (winner+1).toString(), c.width/2, c.height/2 - 100);
        ctx.fillText('YOU WIN 50 SCHMECKLES', c.width/2, c.height/2 + 100);
        ctx.font = '30px Arial';
        ctx.fillText('Press Spacebar to try again.', c.width/2, c.height/2 + 200);
        
    }
    else{
        ctx.fillText('The winner is!: ' + (winner+1).toString(), c.width/2, c.height/2 - 100);
        ctx.fillText('Haha!! WRONGH BUD', c.width/2, c.height/2 + 100);
        ctx.font = '30px Arial';
        ctx.fillText('Press Spacebar to try again.', c.width/2, c.height/2 + 200);
    }

    
}


//add an event listener
document.addEventListener("keydown", chooseWinner);

function chooseWinner(e){
    //keyboard logic goes here
    if(currentState ==0){
        if(e.keyCode === 49){
            choice = 0;
            currentState =1;
        }
        if(e.keyCode === 50){
            choice = 1;
            currentState =1;
        }
        if(e.keyCode === 51){
            choice = 2;
            currentState = 1;
        }
        
    }
    if(currentState == 2){
        if(e.keyCode === 32)
        {
            location.reload();
        }
    }
}

//MAIN
function main()
{
    ctx.clearRect(0,0,c.width,c.height);
    startLine.draw();
    finishLine.draw();
    

    for (var i = 0; i < cars.length; i++){
    cars[i].draw();
    }
    state[currentState]();
    timer = requestAnimationFrame(main);

}
//END MAIN

function randomRange(high, low)
{
    return Math.round(Math.random()*(high-low)+low);
}


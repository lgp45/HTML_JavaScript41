//JavaScript goes here!

//this stores our HTML Canvas in our variable c
var c = document.querySelector('canvas');

//this gives our variable a 2 dimensional context
var ctx = c.getContext('2d');


//load an image to the canvas
var mario = new Image();
mario.src = 'images/mario.png';

var yoshi = new Image(); 
yoshi.src = 'images/yoshi.png';

//variable X for our drawBox function
var x = 0;

//variable Y for our verticalBox function
var y = 0;

//timer
var timer = requestAnimationFrame(main);

//starting and finish line variables
var start = 110;
var finish = 700;

//fuel variables
var startFuel = 300;
var fuel = startFuel;
var barFullWidth = 300;

//start timer stuff dude
var sec = 3;
var fps = 60;
var frames = fps;

var car = new GameObject();
car.y = c.height/2;
car.color = 'yellowgreen';

var car2 = new GameObject();
car2.y = c.height/2 + 100;
car2.color = 'gold';


var car3 = new GameObject();
car3.y = c.height/2 + 200;
car3.color = "tomato";
//start main
function main(){
    timer = requestAnimationFrame(main);
    //clears the canvas
    ctx.clearRect(0,0 , 800,600);

    //draw game objects
    
    
    //draw start line
    
    drawBox("red", start, 100, 10, 400);
    drawSprite();
    drawBox("green", finish, 100, 10, 400);
    
    //drawFinishLine();
    
    drawFuelBar();
    drawFuelText();
    

    if(sec > 0)
    {
        runStartTimer();
        drawStartTimer();
    }
    else
    {
        if(fuel > 0)
        {   
        //update x 
        x += 1;
        fuel -= 1;
        }
    }
    
    
    //fuel set up
    if(fuel <= 0 || x + 100 > finish)
    {
        drawResults();
    }
    car.x +=;
    car.draw();
    car2.x +=1;
    car2.draw();
    car3.x +=1;
    car3.draw();

}
//end main

/*
function drawBox(){
    //this draws a box or shape
    ctx.fillStyle = 'green';
    ctx.fillRect(x, c.height/2, 100, 50);
}



function drawStartLine(){
    ctx.fillStyle = 'yellowgreen';
    ctx.fillRect(start, 100, 10, 400);
}

function drawFinishLine(){
    ctx.fillStyle = 'tomato';
    ctx.fillRect(finish, 100, 10, 400);
}
*/
function drawSprite(){
    ctx.drawImage(yoshi, x, 250, 100, 100);
}
function drawBox(color, x, y, w, h){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function drawFuelBar(){
    var barCurrentWidth = barFullWidth * getFuelPercentage();

    ctx.fillStyle = 'orange';
    ctx.fillRect(start, 80, barCurrentWidth, 10);
}

function drawFuelText(){
    ctx.fillStyle = 
    'black';
    ctx.font = '30px Arial';
    ctx.fillText(fuel, start, 50);
}

function getFuelPercentage(){
    return fuel/startFuel;
}

function drawResults(){
    if(x + 100 > finish)
    {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("You Won!", c.width/2, c.height/2);
    }
    else
    {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("You LOSE!", c.width/2, c.height/2);
    }
}


function runStartTimer(){
    frames -= 1;
    if(frames < 0)
    {
        frames = fps;
        sec -= 1;
    }
}

function drawStartTimer(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(sec, c.width/2, c.height/2);
}
//JavaScript goes here!

//this stores our HTML Canvas in our variable c
var c = document.querySelector('canvas');

//this gives our variable a 2 dimensional context
var ctx = c.getContext('2d');


//load an image to the canvas
var mario = new Image();
mario.src = 'images/mario.png';

var yoshi = new Image(); 
yoshi.src = 'images/carYoshi.png';

//variable X for our drawBox function
var x = 0;

//variable Y for our verticalBox function
var y = 0;

//timer
var timer = requestAnimationFrame(main);

//starting and finish line variables
var start = 58;
var finish = 956;

//fuel variables
var startFuel = 890;
var fuel = startFuel;
var barFullWidth = 512;

//start timer stuff dude
var sec = 3;
var fps = 60;
var frames = fps;

//attempting to add a sound 
var mySound;
mySound.src = mySound('sounds/musica.mpg');


//start main
function main(){
    timer = requestAnimationFrame(main);
    
    //clears the canvas
    ctx.clearRect(0,0 , 1024,768);
    //draw game objects
    
    
    //draw start line
    drawStartLine();
    drawFinishLine();
    drawSprite();
    drawFuelBarOutline();
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
        x += 2;
        fuel -= 2;
        }
    }
    
    //Draw some Text
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.font = "50px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Car Game", c.width / 2, 50);
    ctx.strokeText("Car Game", c.width / 2, 50);

    
    //fuel set up
    if(fuel <= 0 || x + 100 > finish)
    {
        drawResults();
    }

    music();
    
}
//end main
function music(){
    mySound.play();
}

function drawBox(){
    //this draws a box or shape
    ctx.fillStyle = 'green';
    ctx.fillRect(x, c.height/2+60, 90, 40);
}

function drawSprite(){
    ctx.drawImage(yoshi, x, 380, 150, 150);
}

function drawStartLine(){
    ctx.fillStyle = 'yellowgreen';
    ctx.fillRect(start, 100, 70, 650);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Start", 90, 410, 200);
}

function drawFinishLine(){
    ctx.fillStyle = 'tomato';
    ctx.fillRect(finish, 100, 70, 650);
    ctx.fillStyle = 'black';
    ctx.font = '25px Arial';
    ctx.fillText("Finish", 990, 410, 200);
}
function drawFuelBarOutline(){
    ctx.fillStyle = 'grey';
    ctx.fillRect(start - 2, 78, 516, 14);
}

function drawFuelBar(){
    var barCurrentWidth = barFullWidth * getFuelPercentage();
    ctx.fillStyle = 'yellow';
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
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Winner, Winner. Chicken Dinner.", c.width/2, c.height/2);
    }
    else
    {
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Sorry Bud, Try again.", c.width/2, c.height/2);
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
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(sec, c.width/2, c.height/2);
}


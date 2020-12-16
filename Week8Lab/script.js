var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 0.5;
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = true;
var score = 0;
var highScore = 0;

//gamestate manager
var gameStates = [];
var currentState = 0;
var ship;

function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

//asteroids gameobject class
function Asteroid(){
    this.radius = randomRange(15, 5);
    this.x = randomRange(0 + this.radius, c.width - this.radius);
    this.y = randomRange(0 + this.radius, c.height - this.radius) - c.height;
    this.vx = randomRange(-5, -10);
    this.vy = randomRange(10, 5);
    this.color = 'white';
    


    this.draw = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    
}



//class for player ship
function PlayerShip(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.w = 20;
    this.h = 20;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.left = false;
    this.right = false;
    this.flameLength = 30;


    this.draw = function(){
        ctx.save();
        ctx.translate(this.x, this.y);

        //draws afterburner flame for ship
        if(this.up == true){
            ctx.save();
            //animate flame - flicker the afterburner
            if(this.flameLength == 30){
                this.flameLength = 10;
            }
            else{
                this.flameLength = 30;
            }
            ctx.beginPath();
            ctx.fillStyle = 'orange';
            ctx.moveTo(0, this.flameLength);
            ctx.lineTo(4, 4);
            ctx.lineTo(-4, -4);
            ctx.lineTo(0, this.flameLength);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height-10){
            this.y = c.height-10;
            this.vy = 0;
        }
        if(this.x > c.width - 10){
            this.x = c.width - 10;
            this.vx = 0
        }
        if(this.x < 0 + 10){
            this.x = 0+10;
            this.vx = 0;
        }
        if(this.y < 0+10){
            this.y = 0 + 10;
            this.vy = 0;
        }
        

    }
}

function gameStart(){
        //for loop to create all instances of asteroids
    for(var i = 0; i < numAsteroids; i++){
        asteroids[i] = new Asteroid();

    }
    //this creates an instance of the ship
    ship = new PlayerShip();
}



//adding in event listeners for button presses
document.addEventListener("keydown", keyPressDown);
document.addEventListener("keyup", keyPressUp);

function keyPressUp(e){
    //console.log("Key Released: " + e.keyCode);
    if(gameOver == false){
        if(e.keyCode === 38)
        {
            ship.up = false;
        }
        if(e.keyCode === 37){
            ship.left = false;
        }

        if(e.keyCode === 39){
            ship.right = false;
        } 
    }
   
}

function keyPressDown(e){
    //console.log("Key Pressed: " + e.keyCode);
    if(gameOver == false){
        if(e.keyCode === 38)
        {
            ship.up = true;
        }
        if(e.keyCode === 37){
            ship.left = true;
        }

        if(e.keyCode === 39){
            ship.right = true;
        } 
    }
    if(gameOver == true){
        if(e.keyCode === 13){

            if(currentState == 2){
                currentState = 0;
                score = 0;
                numAsteroids = 10;
                asteroids = [];  //setting the asteroids array to a blank array resets it.
                gameStart();
                main();
            }
            else{
                gameStart();
                gameOver = false;
                currentState = 1;
                main();
                scoreTimer();
            }
        }
    }
}



//GameStates state machine
gameStates[0] = function(){
    ctx.save();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Asteroid Avoidance", c.width/2, c.height/2 - 20);
    ctx.font = '15px Arial';
    ctx.fillText("Press Enter to Begin", c.width/2, c.height/2 + 30);
    ctx.restore();
}

gameStates[1] = function(){
    //draws Score to the HUD
    ctx.save();
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + score.toString(), c.width - 150, 30);
    ctx.restore();
    
    //ship.vy += gravity;

    //key presses move the ship
    if(ship.up == true){
        ship.vy = -3;
        
    }
    else{
        ship.vy = 3;
    }

    if(ship.left == true){
        ship.vx = -3;
    }

    else if(ship.right == true){
        ship.vx = 3;
    }

    else{
        ship.vx = 0;
    }

    //loops through asteroid instances in array and draws them to the screen
    for(var i = 0; i<asteroids.length; i++){

        var dX = ship.x - asteroids[i].x;
        var dY = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dX*dX) +(dY*dY));

        //checks for collision between asteroid and ship
        if(detectCollision(dist, (ship.h/2 + asteroids[i].radius))){
            console.log("Colliding with asteroid " + i);
            
            currentState = 2;
            gameOver = true;
            //document.removeEventListener("keydown", keyPressDown);
            //document.removeEventListener("keyup", keyPressUp);
            
        }

        //recycles asteroids
        if(asteroids[i].y > c.height + asteroids[i].radius){
            asteroids[i].y = randomRange(c.height - asteroids[i].radius, asteroids[i].radius) - c.height;
            asteroids[i].x = randomRange(c.width + asteroids[i].radius, asteroids[i].radius);
        }
        //move the asteroids
        if(gameOver == false){
            asteroids[i].y += asteroids[i].vy;
        }
        
        asteroids[i].draw();
    }
    ship.draw();
    if(gameOver == false)
    {
        ship.move();
    }

    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroid());
    }
    
}

gameStates[2] = function(){

    if(score > highScore){
        highScore = score;
        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your NEW High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.fillText("NEW RECORD!", c.width/2, c.height/2);
        ctx.font = '15px Arial';
        ctx.fillText("Press Enter to Play Again", c.width/2, c.height/2 + 30);
        ctx.restore();
    
    }
    else{
        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.font = '15px Arial';
        ctx.fillText("Press Enter to Play Again", c.width/2, c.height/2 + 30);
        ctx.restore();
    }

}

function main(){
    ctx.clearRect(0,0, c.width, c.height);

    /* 
        old game code was here 
    */
    

    if(gameOver == false){
        timer = requestAnimationFrame(main);
    }
    
    gameStates[currentState]();
    

}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function scoreTimer(){
    if(gameOver == false){
        score++;

        //if score devided by 5 returns a remainder of zero, spawn more asteroids
        if(score % 10 == 0){
            numAsteroids += 3;
            console.log(numAsteroids);
        }
        console.log(score);
        setTimeout(scoreTimer, 1000);
    }
}


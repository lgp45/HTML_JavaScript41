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

//background image - using seamless texture for better loop!
var backgroundImage = new Image();
backgroundImage.src = "images/seamlessBackground.jpg";




//asteroid sprite setup
var asteroidSprite = new Image();
asteroidSprite.src = "images/asteroid1.png"

//ship sprite setup
var shipSprite = new Image();
shipSprite.src = "images/shipSprite.png";

//store and load our menu button images
//play button
var playButton = new Image();
playButton.src = "images/playButton.png";

var playAgainButton = new Image();
playAgainButton = "images/playAgain.png";

//powerUp
var healthPack = new Image();
healthPack.src = "images/unnamed.png";
var buffs = new Array();
var numBuffs = 4;

function runBG(){
    ctx.drawImage(backgroundImage, 0, 0);
}

function drawPlayButton(){
    ctx.drawImage(playButton ,c.width/2 - 85, c.height/2 + 30);
}

function drawPlayButton(){
    ctx.drawImage(playAgainButton ,c.width/2 - 85, c.height/2 + 30);
}






function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

function PowerUp(){
    this.image = healthPack;
    this.w = 50;
    this.h = 50;
    this.x = randomRange(0 + this.w, c.width - this.w);
    this.y = randomRange(0 + this.h, c.height - this.h) - c.height;
    this.vx = randomRange(-5, -10);
    this.vy = randomRange(2, 1);
    this.heal = 50;

    this.draw = function(){
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
    }   
}

/*
function runBG(){
    var imgWidth = 0;
    var scrollSpeed = 10;

    function scroll(){
        
        ctx.drawImage(backgroundImage, imgWidth, 0);

        ctx.drawImage(backgroundImage, imgWidth+c.width, 0);

        ctx.drawImage(backgroundImage, imgWidth+ (c.width * 2), 0);
        

        imgWidth += scrollSpeed;

        if(imgWidth == c.width){
            imgWidth = 0;
    
        }

        requestAnimationFrame(scroll);
    }
    scroll();
    
}
*/

//asteroids gameobject class
function Asteroid(){
    this.radius = randomRange(15, 5);
    this.x = randomRange(0 + this.radius, c.width - this.radius) - c.width;
    this.y = randomRange(0 + this.radius, c.height - this.radius);
    this.vx = randomRange(10, 5);
    this.vy = randomRange(-5, -10);
    this.color = 'white';
    


    this.draw = function(){
        ctx.save();
        //ctx.beginPath();
        //ctx.fillStyle = this.color;
        //ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        //ctx.closePath();
        //ctx.fill();
        ctx.drawImage(asteroidSprite, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }
    

    
}



//class for player ship
function PlayerShip(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.image = shipSprite;
    this.w = 25;
    this.h = 25;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.left = false;
    this.right = false;
    this.down = false;
    this.flameLength = 30;
    this.innerFlameLength = 18;
    this.health = 100;
    this.shield = Math.abs(0);


    this.draw = function(){
        ctx.save();
        ctx.translate(this.x, this.y);

        //draws afterburner flame for ship
        if(this.right == true){
            ctx.save();
            //animate flame - flicker the afterburner
            if(this.flameLength == 30){
                this.flameLength = 10;
                
            }
            else{
                this.flameLength = 30;
                
            }
            ctx.beginPath();
            ctx.fillStyle = 'darkorange';
            ctx.strokeStyle = 'orange';
            ctx.lineWidth = 0.5;
            ctx.moveTo(-this.flameLength, 0);
            ctx.lineTo(-3, -4);
            ctx.lineTo(4, 4);
            ctx.lineTo(-this.flameLength, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        if(this.right == true){
            ctx.save();
            //animate inner flicker
            if(this.innerFlameLength == 18){
                this.innerFlameLength = 6;
            }
            else{
                this.innerFlameLength = 18;
            }
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.moveTo(-this.innerFlameLength, 0);
            ctx.lineTo(-4, -4);
            ctx.lineTo(4, 4);
            ctx.lineTo(-this.innerFlameLength, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        /*
        ctx.fillStyle = 'red';
        ctx.moveTo(-10, 10);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.lineTo(-10, 10);
         
        ^--old ship code */
        ctx.drawImage(this.image, 0 - 7, 0 - this.h);
        
       
        ctx.closePath();
        //ctx.fill();
        ctx.restore();

    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height-25){
            this.y = c.height-25;
            this.vy = 0;
        }
        if(this.x > c.width - 25){
            this.x = c.width - 25;
            this.vx = 0
        }
        if(this.x < 0 + 25){
            this.x = 0+25;
            this.vx = 0;
        }
        if(this.y < 0+25){
            this.y = 0 + 25;
            this.vy = 0;
        }
        

    }
}

function gameStart(){
        //for loop to create all instances of asteroids
    for(var i = 0; i < numAsteroids; i++){
        asteroids[i] = new Asteroid();

    }

    for(var i = 0; i < numBuffs; i++){
        buffs[i] = new PowerUp();
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
        if(e.keyCode === 40)
        {
            ship.down = false;
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
        if(e.keyCode === 40){
            ship.down = true;
        }

    }
    if(gameOver == true){
        if(e.keyCode === 13){

            if(currentState == 2){
                currentState = 0;
                score = 0;
                numAsteroids = 10;
                numImages = 3;
                asteroids = [];  //setting the asteroids array to a blank array resets it.
                bgImages = [];
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
    ctx.font = '30px Do Hyeon';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Asteroid Avoidance", c.width/2, c.height/2 - 20);
    ctx.restore();
}

gameStates[1] = function(){
    
    //draws Score to the HUD
    ctx.save();
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.lineWidth = 0.25;
    ctx.font = '20px Do Hyeon';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'yellow';
    ctx.fillText("Score: " + score.toString(), c.width - 100, 30);
    ctx.strokeText("Score: " + score.toString(), c.width - 100, 30);
    ctx.fillText("Ship HP: " + ship.health.toString(), c.width - 150, 50);
    ctx.fillText("Ship Shield: " + ship.shield.toString(), c.width - 150, 70);
    ctx.restore();

    

    
    
    
    
    //ship.vy += gravity;

    //key presses move the ship
    if(ship.right == true){
        ship.vx = 3;
        
    }
    else{
        ship.vx = -3;
    }

    if(ship.up == true){
        ship.vy = -3;
    }
    else if(ship.down == true){
        ship.vy = 3;
    }
    else{
        ship.vy = 0;
    }

    //loops throuigh buff images
    for(var i = 0; i < buffs.length; i++){
        var dX = ship.x - buffs[i].x;
        var dY = ship.y - buffs[i].y;
        var dist = Math.sqrt((dX*dX)+(dY*dY));
        if(detectCollision(dist, (ship.h/2 + buffs[i].w))){
            console.log("Ship collided with healthpack" + i);
            buffs[i].y = (c.height - i.h, i.h) - c.height;
            buffs[i].x = (c.width + i.w, i.w);
            ship.health+= buffs[i].heal;
            console.log("Ship HP: " + ship.health);
            if(ship.health >= 100){
                ship.health - 100 == ship.health;
                ship.shield += 10;
                ship.health = 100;
                console.log("You have max health!...HP: " + ship.health);
            }
            if(ship.shield >= 100){
                ship.shield = 100;
            }
        }
         //recycles the buffs
         if(buffs[i].y > c.height + buffs[i].h){
            buffs[i].y = randomRange(c.height - buffs[i].h, buffs[i].h) - c.height;
            buffs[i].x = randomRange(c.width + buffs[i].w, buffs[i].w);
        }

        if(gameOver == false){
            buffs[i].y += buffs[i].vy;
        }
        buffs[i].draw();
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
        if(asteroids[i].x < 0 + asteroids[i].radius){
            asteroids[i].y = randomRange(c.height - asteroids[i].radius, asteroids[i].radius);
            asteroids[i].x = randomRange(c.width + asteroids[i].radius, asteroids[i].radius) + c.width;
            
        }
        //move the asteroids
        if(gameOver == false){
            asteroids[i].x -= asteroids[i].vx;
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

    while(buffs.length < numBuffs){
        buffs.push(new PowerUp());
    }
    
    
    
}

gameStates[2] = function(){

    if(score > highScore){
        highScore = score;
        
        ctx.save();
        ctx.font = '30px Do Hyeon';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your NEW High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.fillText("NEW RECORD!", c.width/2, c.height/2);
        ctx.font = '15px Do Hyeon';
        ctx.drawImage(playAgainButton, c.width/2 - 85, c.height/2 + 30);
        ctx.restore();
    
    }
    else{
        ctx.save();
        ctx.font = '30px Do Hyeon';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.drawImage(playAgainButton, c.width/2 - 85, c.height/2 + 30);
        ctx.font = '15px Do Hyeon';
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
            numBuffs +=1;
            console.log(numAsteroids);
        }
        
        setTimeout(scoreTimer, 1000);
    }
}



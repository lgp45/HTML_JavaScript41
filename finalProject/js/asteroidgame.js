//I left the collision a bit forgiving so that the game was a bit more fun and you can actually make it farther.  
//background image was strangely the most difficult part i felt. I believe I took a far more complex approach initially than I needed too

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 0.5;
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = true;
var score = 0;
var highScore = 0;

//background image - using seamless texture for better loop!
var backgroundImage = new Image();
backgroundImage.src = "images/seamlessBackground.jpg";
backgroundImage.onload = function(){
    main();
}

var bgImages = new Array();
var numImages = 3;


//gamestate manager
var gameStates = [];
var currentState = 0;
var ship;
var bg;



//asteroid sprite setup
var asteroidSprite = new Image();
asteroidSprite.src = "images/asteroid1.png"

//ship sprite setup
var shipSprite = new Image();
shipSprite.src = "images/shipSprite.png";

//begin game screen
var startScreen = new Image();
startScreen.src = "images/Asteroid_Field.png";
startScreen.onload = function(){
    main();
}

//end game screen
var endScreen = new Image();
endScreen.src = "images/endScreen.png";
endScreen.onload = function(){
    main();
}

//powerUp pack - was originally set up to add Health and when overflow of HP you gain armor, tested the idea on my experimtental page 2.  
var healthPack = new Image();
healthPack.src = "images/unnamed.png";
var buffs = new Array();
var numBuffs = 0;

function backgroundMove(){
    this.image = backgroundImage;
    
    this.w = 1000;
    this.h = 800;
    this.zero = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 2;
    this.vy = 0;
    this.draw = function(){
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x + 1000, this.y);
    }

   
    
}









function randomRange(high, low){
    return Math.random() * (high - low) + low;
}



function PowerUp(){
    this.image = healthPack;
    this.w = 50;
    this.h = 50;
    this.x = randomRange(0 + this.w, c.width - this.w) - c.width;
    this.y = randomRange(0 + this.h, c.height - this.h);
    this.vx = randomRange(2, 1);
    this.vy = randomRange(-5, -10);
    this.blockDamage = 5;
    this.resetTimer = 10;

    this.draw = function(){
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        console.log("drawing power up");
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
    this.shieldTimer = 0;


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
        if(this.x > c.width - 35){
            this.x = c.width - 35;
            this.vx = 0
        }
        if(this.x < 0 + 10){
            this.x = 0+10;
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
    
    for(var i = 0; i < numImages; i++){
        bgImages[i] = new backgroundMove();
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
                numBuffs = 0;
                asteroids = [];  //setting the asteroids array to a blank array resets it.
                buffs = [];
                numImages = [];
                gameStart();
                main();
            }
            else{
                gameStart();
                score = 0;
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
    ctx.drawImage(startScreen, 0, 0, c.width, c.height);
}

gameStates[1] = function(){
    
    
    for(var i = 0; i < bgImages.length; i++){
        if(bgImages[i].x < 0 - 1000){
            bgImages[i].x = bgImages[i].zero;
            bgImages[i].draw();
            console.log("cylcing BG")
        }

        if(gameOver == false){
            bgImages[i].x -= bgImages[i].vx;
        }
        bgImages[i].draw();
    }
    //ctx.drawImage(backgroundImage, 0, 0, c.width, c.height);
    ctx.save();
    
    ctx.lineWidth = 0.25;
    ctx.font = '20px Do Hyeon';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'yellow';
    ctx.fillText("Score: " + score.toString(), c.width - 100, 30);
    ctx.strokeText("Score: " + score.toString(), c.width - 100, 30);
    ctx.fillText("Ship Shield: " + ship.shieldTimer.toString(), c.width - 150, 70);
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
            buffs[i].y = (c.height + i.h, i.h);
            buffs[i].x = (c.width - i.w, i.w) - c.width;
            ship.shieldTimer += 5;
            
            
        }
         //recycles the buffs
         if(buffs[i].x < 0 - buffs[i].w){
            buffs[i].y = randomRange(c.height - buffs[i].h, buffs[i].h);
            buffs[i].x = c.width + buffs[i].w;
            console.log("recycling powerups");
        }

        if(gameOver == false){
            buffs[i].x -= buffs[i].vx;
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
            if(ship.shieldTimer > 0){
                asteroids[i].y = randomRange(c.height - asteroids[i].radius, asteroids[i].radius);
                asteroids[i].x = randomRange(c.width + asteroids[i].radius, asteroids[i].radius) + c.width;
            }
            else{
                currentState = 2;
                gameOver = true;
            }
            
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
        ctx.drawImage(endScreen, 0, 0, c.width, c.height);
        ctx.save();
        ctx.font = '30px Do Hyeon';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your NEW High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.fillText("NEW RECORD!", c.width/2, c.height/2);
        ctx.font = '15px Do Hyeon';
        ctx.restore();
    
    }
    else{
        
        ctx.save();
        ctx.drawImage(endScreen, 0, 0, c.width, c.height);
        ctx.font = '30px Do Hyeon';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over. Your Score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        
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
        if(ship.shieldTimer > 0)
        {
            ship.shieldTimer--;
        }
        

        //if score divided by 5 returns a remainder of zero, spawn more asteroids
        if(score % 10 == 0){
            numAsteroids += 3;
            numBuffs++;
            console.log(numAsteroids);
        }
        
        
        setTimeout(scoreTimer, 1000);
    }
}



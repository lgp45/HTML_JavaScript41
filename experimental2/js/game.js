var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 0.5;
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = false;
var score = 0;


//powerUp
//var healthPack = new Image();
//healthPack.src = "images/unnamed.png";



function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

//powerup gameobject class
/*
function PowerUp(){
    this.image = healthPack;
    this.x = randomRange(800 + 10, 0 - 10);
    this.y = randomRange(0 + 10, c.height - 10);
    this.h = 10;
    this.w = 10;
    this.vx = randomRange(-5, -10);
    this.vy = randomRange(2, 1);
    this.heal = 50;

    this.draw = function(){
        ctx.drawImage(healthPack, this.x, this.y);
    }   
}
*/

//asteroids gameobject class
function Asteroid(){
    this.radius = randomRange(15, 5);
    this.x = randomRange(0 + this.radius, c.width - this.radius);
    this.y = randomRange(0 + this.radius, c.height - this.radius) - c.height;
    this.vx = randomRange(-5, -10);
    this.vy = randomRange(10, 5);
    this.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)} )`;
    this.damage = Math.floor(this.radius * 2);
    


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

//for loop to create all instances of asteroids
for(var i = 0; i < numAsteroids; i++){
    asteroids[i] = new Asteroid();
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
    this.health = 100;


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

//this creates an instance of the ship
var ship = new PlayerShip();

//var hpBoost = new PowerUp();

//adding in event listeners for button presses
document.addEventListener("keydown", keyPressDown);
document.addEventListener("keyup", keyPressUp);

function keyPressDown(e){
    //console.log("Key Pressed: " + e.keyCode);
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

function keyPressUp(e){
    //console.log("Key Released: " + e.keyCode);

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

function main(){
    ctx.clearRect(0,0, c.width, c.height);

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
            asteroids[i].y = (c.height - i.radius, i.radius) - c.height;
            asteroids[i].x = (c.width + i.radius, i.radius);
            ship.health -= asteroids[i].damage;
            console.log("Ship HP: " + ship.health);
            if(ship.health <= 0)
            {
                console.log("You have died...Asteroid #: " + i + " killed you.");
                gameOver = true;
                document.removeEventListener("keydown", keyPressDown);
                document.removeEventListener("keyup", keyPressUp);
            }
        }

        
        
        //recycles asteroids
        if(asteroids[i].y > c.height + asteroids[i].radius){
            asteroids[i].y = randomRange(c.height - asteroids[i].radius, asteroids[i].radius) - c.height;
            asteroids[i].x = randomRange(c.width + asteroids[i].radius, asteroids[i].radius);
        }
        /*
        //recycle power ups
        if(hpBoost.y > c.height + hpBoost.h){
            hpBoost.y = randomRange(c.height - hpBoost.y, hpBoost.y) - c.height;
            hpBoost.x = randomRange(c.width + hpBoost.x, hpBoost.x);
            console.log('print hp');
        }
        */
        //move the asteroids and power ups
        if(gameOver == false){
            asteroids[i].y += asteroids[i].vy;
           // hpBoost.y += hpBoost.vy;
        }
        asteroids[i].draw();
        //hpBoost.draw();
    }
    ship.draw();
    
    if(gameOver == false)
    {
        ship.move();
    }
    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroid());
    }
    timer = requestAnimationFrame(main);
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

scoreTimer();
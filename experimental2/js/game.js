var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 0.5;
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = false;
var score = 0;


//powerUp
var healthPack = new Image();
healthPack.src = "images/unnamed.png";
var buffs = new Array();
var numBuffs = 4;



function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

//powerup gameobject class

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

for(var i = 0; i < numBuffs; i++){
    buffs[i] = new PowerUp();
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
    this.shield = Math.abs(0);



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
    ctx.fillText("Ship HP: " + ship.health.toString(), c.width - 150, 50);
    ctx.fillText("Ship Shield: " + ship.shield.toString(), c.width - 150, 70);
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
            asteroids[i].y = (c.height - i.radius, i.radius) - c.height;
            asteroids[i].x = (c.width + i.radius, i.radius);
            
            if(ship.health >= 0 && ship.shield <= 0){
                ship.shield = 0;
                ship.health -= asteroids[i].damage;
            }
            else{
                ship.shield -= asteroids[i].damage;
            }
            
        
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
        
        //move the asteroids and power ups
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

    while(buffs.length < numBuffs){
        buffs.push(new PowerUp());
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
            numBuffs +=1;
            console.log(numBuffs);
            console.log(numAsteroids);
        }
        setTimeout(scoreTimer, 1000/2);
    }
}

scoreTimer();
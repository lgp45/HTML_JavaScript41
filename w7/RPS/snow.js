//this grabs out html canvas and applies a 2d Context to it to allow us to draw on top
var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

//timer 
var timer = requestAnimationFrame(main);

function randomRange(high, low){
    return Math.random() * (high - low) + low;
}


function GameObject(){
    this.radius = randomRange(8, 1);
    this.color = 'white'; //`rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)} )`;
    this.x = Math.random() * c.width;  //c.width is the canvas width
    this.y = Math.random() * c.height;  //c.height is the canvas height
    this.vx = 0;
    this.vy = this.radius;

    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height + this.radius){
            this.y = 0 - this.radius;
        }
    }
}

var particles = [];
var numberOfParticles = 150;

for (var i = 0; i < numberOfParticles; i++){
    particles[i] = new GameObject();
    particles[i].drawCircle();
}

function drawArrow(){
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    ctx.moveTo(500, 350); 
    ctx.lineTo(500, 100);
    ctx.moveTo(475, 175);
    ctx.lineTo(475, 175);
    ctx.lineTo(525, 175);
    ctx.lineTo(500, 100);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

}

function main(){
    ctx.clearRect(0,0, c.width, c.height);
    for(var i = 0; i<particles.length; i++){
        particles[i].move();
        particles[i].drawCircle();
    }
    drawArrow();
    ctx.fillStyle = 'blue';
    ctx.font = "50px Arial";
    ctx.fillText("Click the button above to begin!", c.width/2 - 325, c.height/2);
    timer = requestAnimationFrame(main);
}

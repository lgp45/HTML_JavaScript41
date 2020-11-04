//JavaScript goes here!

//this stores our HTML Canvas in our variable c
var c = document.querySelector('canvas');

//this gives our variable a 2 dimensional context
var ctx = c.getContext('2d');

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



//start
function main(){
    timer = requestAnimationFrame(main);
    //clears the canvas
    ctx.clearRect(0,0 , 800,600);

    //calls our Function - drawBox - which draws a box
    drawBox();
    verticalBox();
    //update x
    x++;
    y++;

    //provides the animation parameters and limits.
    if(x > c.width){
        x = 0;
        
    }
    console.log('animating....');

    if(y > c.height){
        y = 0;
        
    }
    
    
    /*
    //example of a line
    ctx.moveTo(0,0);
    ctx.lineTo(800,600);
    ctx.stroke();

    ctx.moveTo(800,0);
    ctx.lineTo(0, 600);
    ctx.stroke();

    //this styles the box with a color
    ctx.fillStyle = 'purple';

    //this draws a box or shape
    ctx.fillRect(c.width/4, c.height/4, c.width/2, c.height/2);


    //draw a circle.
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 50, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();

    //Draw some text
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText('Week 4 Lab', c.width/2 - 150, 100);
    ctx.strokeText('Week 4 Lab', c.width/2 - 150, 100);
*/

    //draw an image
    drawMario();
    drawYoshi();

}
//end


function drawBox(){
    //this draws a box or shape
    ctx.fillStyle = 'green';
    ctx.fillRect(x, c.height/2, 100, 50);
}

function verticalBox()
{
    ctx.fillStyle = 'red';
    ctx.fillRect(c.width/2, y, 50, 100);
}

function drawMario(){
    ctx.drawImage(mario, x, 0, 100, 100);
}

function drawYoshi(){
    ctx.drawImage(yoshi, 40, y, 100, 100);
}

//main();

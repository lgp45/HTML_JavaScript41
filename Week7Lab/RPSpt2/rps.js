window.onload = function(){
var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var rock = new Image();
var paper = new Image();
var scissors = new Image();

var hrock = new Image();
var hpaper = new Image();
var hscissors = new Image();

rock.src = "images/rock.jpg";
paper.src = "images/paper.jpg";
scissors.src = "images/scissors.jpg";

hrock.src = "images/rock2.jpg";
hpaper.src = "images/paper2.jpg";
hscissors.src = "images/scissors2.jpg";

hscissors.onload = function(){
    draw();
}


var rps = [];
rps[0] = "Rock";
rps[1] = "Paper";
rps[2] = "Scissors";

//array of buttons
var btn = document.querySelectorAll('a');
//assign event listeners to the buttons
btn[0].addEventListener('click', function(e){play(0)});
btn[1].addEventListener('click', function(e){play(1)});
btn[2].addEventListener('click', function(e){play(2)});



function play(playersChoice){
    var cpuChoice = Math.floor(Math.random() * 2.999);
    alert("Your Choice: " + rps[playersChoice] + " vs " + "Computer: " + rps[cpuChoice]);

    switch(playersChoice){
        case 0: 
            if(cpuChoice === 0){
                alert("TIE");
            }
            else if(cpuChoice === 1){
                alert("Computer Wins...play again")
            }
            else{
                alert("Player Wins!")
            }
            break;
        case 1: 
            if(cpuChoice === 0){
            alert("Player Wins.");
            }
            else if(cpuChoice === 1){
            alert("TIE!")
            }
            else{
            alert("Computer Wins!")
            }
            break;
        case 2: 
            if(cpuChoice === 0){
            alert("Computer Wins...Player Again!");
            }
            else if(cpuChoice === 1){
            alert("Player Wins!")
            }
            else{
            alert("TIE")
            }
            break;

    }
}
function draw(){
    ctx.clearRect(0,0, c.width, c.height);
    ctx.fillRect(0,0, c.width, c.height);

    ctx.save();
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Player Choice', c.width/2, 100);
    ctx.drawImage(rock, c.width/2 - 100, 150);
    ctx.drawImage(paper, c.width/2, 150);
    ctx.drawImage(scissors, c.width/2 + 100, 150);

    ctx.fillText('Computer Choice', c.width/2, 325);
    ctx.drawImage(rock, c.width/2 - 100, 375);
    ctx.drawImage(paper, c.width/2, 375);
    ctx.drawImage(scissors, c.width/2 + 100, 375);

    ctx.fillText('Pick a Button from above', c.width/2, 525);

    ctx.restore();


}


}
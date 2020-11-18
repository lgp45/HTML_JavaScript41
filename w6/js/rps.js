var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

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
    
    
    

    switch(playersChoice){
        case 0: 
            if(cpuChoice === 0){
                
                
                Tie();
                ctx.fillStyle = 'yellow';
                ctx.strokeStyle = 'black';
                ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
                ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            else if(cpuChoice === 1){
                
                Lose();
                ctx.fillStyle = 'red';
                ctx.strokeStyle = 'black';
                ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
                ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
                
            }
            else{
                Win();
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = 'black';
                ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
                ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            break;
        case 1: 
            if(cpuChoice === 0){
            Win();
            ctx.fillStyle = 'blue';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            else if(cpuChoice === 1){
            Tie();
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            else{
            Lose();
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            break;
        case 2: 
            if(cpuChoice === 0){
            Lose();
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            else if(cpuChoice === 1){
            Win();
            ctx.fillStyle = 'blue';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            else{
            Tie();
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.fillText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
            ctx.strokeText("You Chose: " + rps[playersChoice] + " vs " + "CPU Chose: " + rps[cpuChoice], 500, 200);
               
            }
            break;

    }
}


function Tie(){
    ctx.clearRect(0,0, 1000, 600);
    ctx.lineWidth = 1;
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.font = '50px Arial';
    ctx.textAlign='center';
    ctx.fillText('Tie!',  500, c.height/2);
    ctx.strokeText('Tie!',  500, c.height/2);
}

function Win(){
    ctx.clearRect(0,0, 1000, 600);
    ctx.lineWidth = 1;
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'black';
    ctx.font = '50px Arial';
    ctx.textAlign='center';
    ctx.fillText('You Win!',  500, c.height/2);
    ctx.strokeText('You Win!',  500, c.height/2);
    
}

function Lose(){
    ctx.clearRect(0,0, 1000, 600);
    ctx.lineWidth = 1;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.font = '50px Arial';
    ctx.textAlign='center';
    ctx.fillText('You Lose!', 500, c.height/2);
    ctx.strokeText('You Lose!', 500, c.height/2);
}
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
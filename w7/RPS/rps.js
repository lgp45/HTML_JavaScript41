window.onload = function(){
    var c = document.querySelector("canvas");
    var ctx = c.getContext("2d");
    
    //regular images
    var rock = new Image();
    var paper = new Image();
    var scissor = new Image();
    var snowball = new Image();

    //highlighted images
    var hrock = new Image();
    var hpaper = new Image();
    var hscissor = new Image();
    var hsnowball = new Image();

    //score variables
    var playerScore = 0;
    var computerScore = 0;
    
    //regular images link
    rock.src = "images/rock.jpg";
    paper.src = "images/paper.jpg";
    scissor.src = "images/scissors.jpg";
    snowball.src = "images/Snowball.png";
    
    //highlighted images link
    hrock.src = "images/rock2.jpg";
    hpaper.src = "images/paper2.jpg";
    hscissor.src = "images/scissors2.jpg";
    hsnowball.src = "images/snowball2.jpg";
    
    //call function on load to draw items to screen for game
    hscissor.onload = function(){
        draw(rock, paper,scissor, snowball, rock, paper,scissor, snowball);
    }
    
    //Our results/choices displayed per case.
    var results = "Pick an option from the buttons above."
    var outcome = "Player  vs  CPU";
    
    //array of choices
    var rps = [];
    rps[0] = "Rock";
    rps[1] = "Paper";
    rps[2] = "Scissors";
    rps[3] = "Snowball";
    
    //Array of Buttons
    var btn = document.querySelectorAll('a');
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function(e){play(0)});
    btn[1].addEventListener('click', function(e){play(1)});
    btn[2].addEventListener('click', function(e){play(2)});
    btn[3].addEventListener('click', function(e){play(3)});
    
    function play(playersChoice){
        var cpuChoice = Math.floor(Math.random() * 3.999);
       // alert("Player Choice: " + rps[playersChoice] + " vs. Computer Choice: " + rps[cpuChoice]);
    
        switch(playersChoice){
            case 0:
                if(cpuChoice === 0){
                    //alert("It's a tie!");
                    outcome = "Rock  vs  Rock";
                    results = "Its a tie!";
                    draw(hrock, paper, scissor, snowball, hrock, paper, scissor, snowball);
                }
                else if(cpuChoice === 1){
                    //alert("You Lost!");
                    outcome = "Rock  vs  Paper";
                    results = "You Lost!";
                    computerScore += 1;
                    draw(hrock, paper, scissor, snowball, rock, hpaper, scissor, snowball);
                    computerScore + 1 == computerScore;
                } 
                else if(cpuChoice === 2){
                    //alert("You Win!");
                    outcome = "Rock  vs  Scissors";
                    results = "You Win";
                    playerScore += 1;
                    draw(hrock,paper,scissor,snowball, rock,paper,hscissor,snowball);
                }
                else{
                    outcome = "Rock  vs  Snowball";
                    results = "You punch the snowball then the Computer. Its a tie, I guess...?";
                    draw(hrock, paper, scissor,snowball, rock, paper, scissor, hsnowball);
                }
                break;
            case 1:
                if(cpuChoice === 0){
                   // alert("You Win!");
                   outcome = "Paper  vs  Rock";
                    results = "You Win!";
                    playerScore+=1;
                    draw(rock,hpaper,scissor, snowball,hrock,paper,scissor,snowball);
                }
                else if(cpuChoice === 1){
                    //alert("It's a tie!");
                    outcome = "Paper  vs  Paper";
                    results = "It's a tie!";
                    draw(rock,hpaper,scissor,snowball, rock,hpaper,scissor,snowball);
                } 
                else if(cpuChoice === 2){
                    //alert("You Lost!");
                    outcome = "Paper  vs  Scissors";
                    results = "You Lost!";
                    computerScore += 1;
                    draw(rock,hpaper,scissor,snowball,rock,paper,hscissor,snowball);
                } 
                else{
                    outcome = "Paper  vs  Snowball";
                    results = "You get hit with a snowball. And your paper is soggy! You lost.";
                    computerScore += 1;
                    draw(rock, hpaper, scissor, snowball, rock, paper, scissor, hsnowball);
                }
                break;
            case 2: 
                if(cpuChoice === 0){
                    //alert("You Lose!");
                    outcome = "Scissors  vs  Rock";
                    results = "You Lost!";
                    computerScore += 1;
                    draw(rock,paper,hscissor,snowball,hrock,paper,scissor,snowball);
                }
                else if(cpuChoice === 1){
                    //alert("You Win!");
                    outcome = "Scissors  vs  Paper";
                    results = "You Win!";
                    playerScore +=1;
                    draw(rock,paper,hscissor,snowball,rock,hpaper,scissor,snowball);
                } 
                else if(cpuChoice === 2){
                    //alert("It's a tie!");
                    outcome = "Scissors  vs  Scissors";
                    results = "It's a tie!";
                    draw(rock,paper,hscissor,snowball,rock,paper,hscissor,snowball);
                }
                else{
                    outcome = "Scissors  vs  Snowball";
                    results = "You chop the snowball in half. Impressive, you win!";
                    playerScore += 1;
                    draw(rock, paper, hscissor, snowball, rock, paper, scissor, hsnowball);
                }
                break;
            
                case 3:
                    if(cpuChoice === 0){
                        outcome = "Snowball  vs  Rock";
                        results = "Computer punches snowball then you. Its a tie, I guess...?";
                        draw(rock, paper, scissor, hsnowball, hrock, paper, scissor, snowball);
                    }
                    else if(cpuChoice === 1){
                        outcome = "Snowball  vs  Paper";
                        results = "Computer gets hit with a snowball. Hopefully he doesn't short out. You win."
                        playerScore+=1;
                        draw(rock, paper, scissor, hsnowball, rock, hpaper, scissor, snowball);
                    }
                    else if(cpuChoice === 2){
                        outcome = "Snowball  vs  Scissors";
                        results = "Computer chops the snowball in half. Impressive...for a computer. You lose."
                        computerScore += 1;
                        draw(rock, paper, scissor, hsnowball, rock, paper, hscissor, snowball);
                    }
                    else{
                        outcome = "Snowball  vs  Snowball";
                        results = "You both hit eachother with a snowball.  Congrats you're both winners...!"
                        computerScore += 1;
                        playerScore += 1;
                        draw(rock, paper, scissor, hsnowball, rock, paper, scissor, hsnowball);
                    }
        }
    }
    
    function draw(rock, paper, scissor, snowball, crock, cpaper, cscissor, csnowball){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.fillRect(0,0,c.width,c.height);
    
        ctx.save();
        ctx.font = "25px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "blue";
        ctx.fillText("Player Choice" , c.width/2, 100);
        ctx.drawImage(rock, c.width/2 - rock.width/2 -150, 150);
        ctx.drawImage(paper, c.width/2 - paper.width/2 -50, 150);
        ctx.drawImage(scissor, c.width/2 - scissor.width/2 + 50, 150);
        ctx.drawImage(snowball, c.width/2-snowball.width/2 + 150, 150);
    
        ctx.fillStyle = "red";
        ctx.fillText("Computer Choice", c.width/2, 525);
        ctx.drawImage(crock, c.width/2 - rock.width/2 - 150, 575);
        ctx.drawImage(cpaper, c.width/2 - paper.width/2 - 50, 575);
        ctx.drawImage(cscissor, c.width/2 - scissor.width/2 + 50, 575);
        ctx.drawImage(csnowball, c.width/2 - snowball.width/2 + 150, 575);
        
        //displays results and outcomes
        ctx.fillStyle = 'white';
        ctx.fillText(outcome, c.width/2, 325);
        ctx.fillText(results, c.width/2, 375);  
        //displays score
        ctx.fillText("Player: " + playerScore + "  vs  CPU: " + computerScore, c.width/2, 425);

    
        ctx.restore();
    }
    
    }
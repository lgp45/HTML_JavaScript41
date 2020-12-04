window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');
    
    drawShapes();


    function drawShapes(){
        drawSquare();

        drawCircle();

        drawPentagon();

        drawStar();

        drawLine();
    }

    function drawSquare(){
        
        //draw square
        ctx.lineWidth = 5;
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'black';
        ctx.fillRect(85, 302, 100, 100);
        ctx.strokeRect(85, 302, 100, 100);
        
    }
    function drawCircle(){
        //draw circle
        ctx.lineWidth = 5;
        ctx.fillStyle = '#ffff00';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(385, 441, 66, 0, 360);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function drawPentagon(){
          //draw pentagon
       
          ctx.beginPath();
          ctx.moveTo(557, 308);
          ctx.lineTo(667, 285);
          ctx.lineTo(724, 380);
          ctx.lineTo(650, 465);
          ctx.lineTo(548, 420);
          ctx.lineTo(557, 308);
          ctx.fillStyle = '#ff00ff';
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 5;
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
    }

    function drawStar(){
        ctx.beginPath();
        ctx.moveTo(635, 496);
        ctx.lineTo(668, 554);
        ctx.lineTo(733, 567);
        ctx.lineTo(689, 615);
        ctx.lineTo(696, 681);
        ctx.lineTo(636, 654);
        ctx.lineTo(576, 681);
        ctx.lineTo(583, 615);
        ctx.lineTo(538, 567);
        ctx.lineTo(604, 554);
        ctx.lineTo(635, 496);
        ctx.fillStyle = '#ffff00';
        ctx.strokeStyle = 'rgb(32, 32, 32)';
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function drawLine(){
        ctx.beginPath();
        ctx.moveTo(85, 682);
        ctx.lineTo(279, 549);
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}
window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');
    
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    var drawing = false;

    //slider
    var sX = 0;
    var sY = 0;
    var sW = 0;
    var tH = 0;
    var pct = 0;

    function startPosition(){
        drawing = true;
        ctx.stroke();
    }

    function finishedPosition(){
        drawing = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!drawing){
            return;
        }
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        
    }

    c.addEventListener("mousedown", startPosition);
    c.addEventListener("mouseup", finishedPosition);
    c.addEventListener("mousemove", draw);


}
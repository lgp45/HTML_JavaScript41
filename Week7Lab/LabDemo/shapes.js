window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');
    var deg = 25;
    var x= 10;

    var timer = requestAnimationFrame(draw);

    function randomRange(high, low){
        return Math.random() * (high - low) + low;
    }

    function GameObject(){
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = this.w;
        this.deg = 45;
        this.vx = 1;
        this.vy = 1;
        this.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)} )`;

        this.drawBox = function(){
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.restore();
        }

        this.drawRotateBox = function(){
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.deg += this.vx * Math.PI/180);
            ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
            ctx.restore();
        }
    }

    var box = new GameObject();
    box.x = 100;
    box.y = 100;
    var rotatingBox = new GameObject();
    rotatingBox.x = c.width/2;
    rotatingBox.y = c.height/2;
    function draw(){
        /*
        ctx.clearRect(0,0 , c.width, c.height);
        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.translate(c.width/2, c.height/2);
        ctx.rotate(deg += 1 * Math.PI/180);
        ctx.fillRect(0 - 100, 0 - 100, 200, 200);
        ctx.restore();
        ctx.fillRect(x+= 1, 10, 20, 20);
        
        

        //draw a line
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.moveTo(20, 20);
        ctx.lineTo(200, 200);
        ctx.stroke();
        ctx.restore();

        //draw a shape
        ctx.save();
        ctx.strokeStyle = "green";
        ctx.fillStyle = "red";
        ctx.moveTo(500, 100);
        ctx.lineTo(550, 200);
        ctx.lineTo(450, 150);
        ctx.lineTo(475, 120);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore

        */
       ctx.clearRect(0,0 , c.width, c.height);
       box.drawBox();
       rotatingBox.drawRotateBox();

        timer = requestAnimationFrame(draw);
    }
    draw();
}
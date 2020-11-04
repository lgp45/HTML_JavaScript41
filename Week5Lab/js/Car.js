//var randomNumber = Math.round(Math.random() * (10 - 1)+1);
var randomNumber = randomRange(1, 100);
//Math.random() * (high-low) + low   <-- this will generate a random value from the high number to the low number
//Math.random() * (10-1)+1  would give us 1-10, to keep it at whole numbers, ROUND the entire operation.
alert(randomNumber);

//example of an autonomous range function -- gives us a random range of numbers based on presets
function randomRange(high, low){
    return Math.round(Math.random()*(high-low)+low);
}


function GameObject(){
    this.x = 50;
    this.y = 100;
    this.w = 50;
    this.h = 50;
    this.color = 'purple';

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}



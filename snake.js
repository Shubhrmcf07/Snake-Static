function init(){
    canvas = document.getElementById('mycanvas')

    w = canvas.width = 1000;
    h = canvas.height = 800;
    cs = 25;
    food = new getRandomFood();
    game_over = false;
    score = 0;

    pen = canvas.getContext('2d');

    rect = {
        init_len : 5,
        color : "red",
        cells : [], 
        direction : "right", 
        createSnake : function(){
            for(var i=this.init_len ; i>0 ; i--)
                this.cells.push({x:i, y:0});
        }, 

        drawSnake : function(){

            for(var i = 0 ; i < this.cells.length ; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
            }
        },

        updateSnake : function(){
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;


            if(headx==food.x && heady == food.y){   
                food = getRandomFood();
                score++;
            }
        
            else
                this.cells.pop();

            if(this.direction=="right")
            {
                nextX = headx+1;
                nextY = heady;
            }

            else if(this.direction=="left")
            {
                nextX = headx - 1;
                nextY = heady;  
            }

            else if(this.direction=="Up")
            {
                nextX = headx;
                nextY = heady - 1;
            }

            else if(this.direction=="Down")
            {
                nextX = headx;
                nextY = heady + 1;
            }

        
            this.cells.unshift({x : nextX, y : nextY})


            var lastx = Math.round(w/cs);
            var lasty = Math.round(h/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastx || this.cells[0].y > lasty)
                game_over = true;
        }
    }

    rect.createSnake();

    function keypress(e){
        if(e.key=="ArrowRight")
        {
            rect.direction="right";
        }

        else if(e.key=="ArrowLeft")
        {
            rect.direction="left";
        }

        else if(e.keyCode==38)
        {
            rect.direction="Up";
        }

        else if(e.key = "ArrowDown")
        {
            rect.direction="Down";
        }

        console.log(rect.direction);
    }

    document.addEventListener('keydown', keypress);

}

function draw(){
    pen.clearRect(0,0,w,h);
    rect.drawSnake();
    pen.fillRect(food.x*cs, food.y*cs, cs, cs);
    pen.font = "30px roboto";
    pen.fillText(score, 50,50);
}

function update() {
    rect.updateSnake();
}

function getRandomFood(){
    var foodx = Math.round(Math.random()*(w-cs)/cs);
    var foody = Math.round(Math.random()*(h-cs)/cs);

    food = {
        x : foodx,
        y : foody,
        color : "red"
    }

    return food;
}

function gameloop(){

    if(game_over == true)
    {
        clearInterval(f);
        alert("Game Over!");
    }

    draw();
    update();
}

init();
gameloop();
var f = setInterval(gameloop, 100);


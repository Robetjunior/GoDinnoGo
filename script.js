window.onload = () => {
 

  let topScore = [];
  let jumpCount = 0;
  let frames = 0;
  let id = null;
  

  //CORES DOS OBSTACULOS
  const colors = ['#2ca8c2', '#980000', '#f76d3c', '#f15f74','#5481e6'];
  
  
  //ARRAY DE OBSTACULOS
  let myObstacles = [];


  //CRIACAO CANVAS
  const canvas = document.getElementById('canvas');
  const ctx = this.canvas.getContext('2d');



  // IMAGENS
  const roadImg = new Image();
  roadImg.src = './images/mato.jpg';
 

  const myGameArea = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),
    poins: 0,
    start: function () {
      this.interval = requestAnimationFrame(updateGameArea);
    },
    clear: function () {
      this.context.clearRect(0, 0, 700, 400);
    },

    stop: function () {
      cancelAnimationFrame(this.interval);
      this.clear();
    },

    score: function () {
      this.points = Math.floor(frames / 9);

      if (this.points > topScore) {
        topScore[0] = this.points;
      }
      
      this.context.beginPath();
      this.context.font = "30px sans-serif";
      this.context.fillStyle = "#fff";
      this.context.fillText(`Score: ${this.points}`, 30, 40);
      this.context.fillText(`Top Score: ${topScore}`, 450, 40);
    },

    gravity : function(){
      player.speedY += 1.26; //gravidade
      player.x += player.speedX;
      player.y += player.speedY;
      player.speedX *= 0.9; //atrito
      player.speedY *= 0.9; //atrito
      
      // se o retangulo estiver caindo no chao
      if (player.y > 350 - 50 - 32){
        player.y = 350 - 50 - 32;
        player.speedY = 0;
        jumpCount = 2;
      }  
    },
  }


  //Construcao do background e Parallax
  const backgroundImage = {
    canvas: document.getElementById('canvas'),
    ctx: this.canvas.getContext('2d'),
    roadImg: roadImg,
    x: 0,
    speed: -4,

    move: function(){
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function(){
      this.ctx.drawImage(this.roadImg, this.x, 0, 700, 400);
      if(this.speed < 0){
        this.ctx.drawImage(this.roadImg, this.x + 700, 0, 700, 400);
      } else{
        this.ctx.drawImage(this.roadImg, this.x - this.roadImg, 0, 700, 400);
      }
    },
  };
  startGame();
  document.getElementById('start-button').onclick = () => {
    document.getElementById('start-button').style.visibility = 'hidden';
      
  };

  class Objects {
    constructor (width, height, x, y,color){

      this.canvas = document.getElementById('canvas'),
      this.ctx = this.canvas.getContext('2d'),
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = color;

      this.width = width;
      this.height = height;
      
      this.x = x;
      this.y = y;

      
      this.speedY = 0;
      this.speedX = 0;

      this.source = new Image();
      this.source.src = './images/teste1.jpg'
    }
      draw(){
          
          this.ctx.drawImage(this.source, this.x, this.y, this.width, this.height);
        }

        left() {
          return this.x;
        }
        right() {
          return this.x + this.width;
        }
        top() {
          return this.y;
        }
        bottom() {
          return this.y + this.height;
        }
  
      jump(value) {
        this.speedY -= value;

        if(this.source.src === './images/teste1.jpg'){
          this.source.src = './images/mato.jpg'
          return;
        }

        if(this.source.src === '/images/mato.jpg'){
          this.source.src = './images/teste1.jpg'
          return;
        }

      }

      crashWith(obstacle) {
         return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
       }
}


    class Player extends Objects {
      constructor (width, height, x, y, color, ctx) {
          super (width, height, x, y, color, ctx)
        }
        
}

  //=== Construcao do Obstaculo ===
  class Obstaculo extends Objects {
    constructor(width, height, x, y, color, ctx) {
      super(width, height, x, y, color, ctx)
    }
    move(){
      this.speedX = -4;
      this.x += this.speedX;
      this.x %= canvas.width;
    }
  }

  //Create new Player/Rectangle
  //console.log('valor do ctx' + backgroundImage.ctx);
  const player = new Player(30, 30, 100, 50, 'blue', backgroundImage.ctx);
 const objeto = new Obstaculo(30, 30, 500, 265, 'blue', backgroundImage.ctx);
  function startGame() {
    myGameArea.start();
  }

  // UPDATE GAME
  function updateGameArea() {
    // myGameArea.frames += 1;
    frames += 1;
    myGameArea.clear();

    //parallax-bg
    backgroundImage.move();
    backgroundImage.draw();

    //gravity &  obstacles
    myGameArea.gravity();

    player.draw();

    objeto.move();
    objeto.draw();
    
    //updateObstacles();

     //animation start
     id = requestAnimationFrame(updateGameArea);

    checkGameOver();
    myGameArea.score();
  }

  
  
  //Controle & Permissao para pular apenas se jumpCount for > 0
  document.addEventListener('keydown', (e) => {
    if((jumpCount <= 2 && jumpCount > 0)){
      switch (e.keyCode) {
        case 38: // up arrow
          player.jump(25);
          jumpCount--;
        break;
  
     }
    }
  });
  

  function updateObstacles() {
    if(frames <= 4000){
      for (let i = 0; i < myObstacles.length; i++) {
        console.log(myObstacles[i].speedX)
        myObstacles[i].speedX += -7;
         checkGameOver();
        myObstacles[i].draw();
      }
    } else if(frames > 4000){
      for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].speedX += -7.5;
        checkGameOver();
       myObstacles[i].draw();
      }
    }



    const colorR = Math.floor(Math.random() * colors.length);
    const frameR = Math.floor(Math.random() * 70);
    //console.log(frames);

    const x = myGameArea.canvas.width;
    //Frequencia de Obstaculos

    if(myObstacles.length < 1) myObstacles.push(new Obstaculo(30, 30, 60, 50, 'blue', backgroundImage.ctx));
    // myObstacles.push(new Obstaculo(30, 30, Math.random(), 268, 'blue', ''));
  }


  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });

    if (crashed) {
      myGameArea.stop();
      cancelAnimationFrame(id);
      window.location.reload();
    
    }
  }


};
window.onload = () => {
 
  let jumpCount = 0;
  let frames = 0;
  let requestId = null;
  let startG = false;

  //ARRAY DE OBSTACULOS
  let myObstacles = [];

  // IMAGES
  const roadImg = new Image();
  roadImg.src = './images/mato.jpg';


  //SONGS 
  const mainM = new Audio();
  mainM.src = './audio/mainM.mp3';
  const jump = new Audio();
  jump.src = './audio/jump.wav';
 

  const myGameArea = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),
    points: 0,

    start: function () {
      resquestId = window.requestAnimationFrame(updateGameArea);
    },

    clear: function () {
      this.context.clearRect(0, 0, 700, 400);
    },

    stop: function () {
      mainM.pause();
      
      myGameArea.clear();
      myGameArea.context.beginPath();
      myGameArea.context.textAlign = "center";
      myGameArea.context.font = "100px 'Fredoka One', cursive";
      myGameArea.context.fillStyle = "#f2e8cf";
      myGameArea.context.fillText("GAME OVER", 350, 200);
      // localStorage.setItem(this.topScore);
   
      myGameArea.context.font = "40px 'Fredoka One', cursive";
      myGameArea.context.fillText(`Your Score: ${this.points}`, 350, 300);

      window.cancelAnimationFrame(requestId);
    },

    score: function () {
      
      this.points = Math.floor(frames / 3);
      if(this.points <=500){
      this.context.beginPath();
      this.context.font = "35px 'Fredoka One', cursive";
      this.context.fillStyle = "#f2e8cf";
      this.context.fillText(`Score: ${this.points}`, 260, 45);
      }
      if(this.points> 500){
        this.context.fillStyle = "#F00";
        this.context.fillText(`Score: ${this.points}`, 260, 45);
      }
    },

    gravity : function(){
      player.speedY += 1.26; //gravidade
      player.x += player.speedX;
      player.y += player.speedY;
      player.speedX *= 0.9; //atrito
      player.speedY *= 0.9; //atrito
      
      // se o retangulo estiver caindo no chao
      if (player.y > 350 - 135 - 32){
        player.y = 350 - 135 - 32;
        player.speedY = 0;
        jumpCount = 2;
      }  
    },
  }

  //Create background & Parallax
  const backgroundImage = {
    canvas: document.getElementById('canvas'),
    ctx: this.canvas.getContext('2d'),
    roadImg: roadImg,
    x: 0,
    speed: -6.5,

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

    }

    draw(){
      this.ctx.drawImage(this.source, this.x, this.y, this.width, this.height);
    }

    left() {
      return this.x;
    }
    right() {
      return this.x + this.width - 85;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height - 5;
    }
   
    crashWith(obstacle) {
      return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }   
  }

  class Player extends Objects {
    constructor (width, height, x, y, color, ctx) {
        super (width, height, x, y, color, ctx)

      this.spriteCount = 0;
      this.run1 = new Image();
      this.run1.src = './images/Run (1).png'
      this.run2 = new Image();
      this.run2.src = './images/Run (2).png'
      this.run3 = new Image();
      this.run3.src = './images/Run (3).png'
      this.run4 = new Image();
      this.run4.src = './images/Run (4).png'
      this.run5 = new Image();
      this.run5.src = './images/Run (5).png'
      this.run6 = new Image();
      this.run6.src = './images/Run (6).png'
      this.run7 = new Image();
      this.run7.src = './images/Run (7).png'
      this.run8 = new Image();
      this.run8.src = './images/Run (8).png'
      }

      draw(){
          if(this.spriteCount < 5){
            this.ctx.drawImage(this.run1, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 10) {
            this.ctx.drawImage(this.run2, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 15){
            this.ctx.drawImage(this.run3, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 20){
            this.ctx.drawImage(this.run4, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 25){
            this.ctx.drawImage(this.run5, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 30){
            this.ctx.drawImage(this.run6, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 35){
            this.ctx.drawImage(this.run7, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 40){
            this.ctx.drawImage(this.run8, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else {
            this.ctx.drawImage(this.run1, this.x, this.y, this.width, this.height);
            this.spriteCount = 0;
          }

      }
      jump(value) {
        this.speedY -= value;
      }
  }

  class Obstaculo extends Objects {
    constructor(width, height, x, y, color, ctx) {
      super(width, height, x, y, color, ctx)
      this.source = new Image();
      this.source.src = './images/box.png'
      }
      draw(){
        this.ctx.drawImage(this.source, this.x, this.y, this.width, this.height);
      }
      move(){
        this.speedX = -4;
        this.x += this.speedX;
      }
  }

  //Create new Player/Rectangle
  const player = new Player(130, 100, 100, 50, 'blue', backgroundImage.ctx);

  document.getElementById('start-button').onclick = () => {
      if(!startG){
        mainM.play();
        myGameArea.start();
        startG = true;
      } else {
        window.location.reload();
      }
  };

  // UPDATE GAME
  function updateGameArea() {
    frames += 1;
    myGameArea.clear();
    console.log(frames);

    //parallax-bg
    backgroundImage.move();
    backgroundImage.draw();

    //gravity &  obstacles
    myGameArea.gravity();

    player.draw();

    //Create & moving obstacles
    updateObstacles();
    
     //animation start
    requestId = requestAnimationFrame(updateGameArea);

    myGameArea.score();
    checkGameOver();
  }

  function updateObstacles(){
    for (let i=0; i < myObstacles.length; i += 1){
      myObstacles[i].x += -5.5;
      myObstacles[i].move();
      myObstacles[i].draw();
      if(myObstacles[i].x < -80){
        myObstacles.splice(i,1);
      }
    }

    if(frames <= 1500){
      if (frames % (105) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }

    } else if (frames <= 1500){
        if (frames % (100) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (170) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
        }

    } else if (frames <= 2500){
        if (frames % (95) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (150) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }

    } else if (frames <= 3500){
        if (frames % (92) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (145) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
        }
        
    } else if (frames <= 4500){
      if (frames % (88) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (140) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }

    } else if (frames <= 5500){
      if (frames % (80) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (130) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }

    } else if (frames > 5500){
      if (frames % (70 - randomFrame) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (130) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
    }
}
  
  //Controle & Permissao para pular apenas se jumpCount for > 0
  document.addEventListener('keydown', (e) => {
    if((jumpCount <= 2 && jumpCount > 0)){
      switch (e.keyCode) {
        case 38: // up arrow
          player.jump(30);
          jumpCount--;
          jump.play();
        break;
     }
    }
  });

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
    if (crashed) {
      myGameArea.stop();   
     
    }
  }
};
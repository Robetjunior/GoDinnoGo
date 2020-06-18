window.onload = () => {
  
  let frames = 0;
  let requestId = null;
  let startG = false;

  let points = 0;
  let extraPoints = 0;

  let lifePoints = 3;

  let jumpCount = 0;

  //OBSTACLES ARRAY
  let myObstacles = [];
  
  //POINTS ARRAY
  let myPoints = [];

  //LIFE-POINTS ARRAY
  let lifeP = [];

  let scoreColors = ["#03071e", "#370617", "#6a040f", "#9d0208", "#d00000", "#dc2f02", "#e85d04", "#e55934", "#fa7921", "#f48c06", "#faa307", "#ffba08"];
  let colorI = scoreColors.length;
  let valueTest = 1;

  // IMAGES
  const roadImg = new Image();
  roadImg.src = './images/mato.jpg';
  const coin = new Image();
  coin.src = './images/Coin1.png';
  const life = new Image();
  life.src = './images/heart.png';


  //SONGS 
  const mainM = new Audio();
  mainM.src = './audio/mainM.mp3';
  const jump = new Audio();
  jump.src = './audio/jump.wav';
  const scoreUP = new Audio();
  scoreUP.src = './audio/scoreUP.wav';
  const coins = new Audio();
  coins.src = './audio/coins1.wav';
  const lose = new Audio();
  lose.src = './audio/Lost.wav';
 

  const myGameArea = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),

    start: function () {
      resquestId = window.requestAnimationFrame(updateGameArea);
    },

    clear: function () {
      this.context.clearRect(0, 0, 700, 400);
    },

    stop: function () {
      mainM.pause();
      lose.play();
      myGameArea.clear();
      myGameArea.context.beginPath();
      myGameArea.context.textAlign = "center";
      myGameArea.context.font = "100px 'Fredoka One', cursive";
      myGameArea.context.fillStyle = scoreColors[colorI];
      myGameArea.context.fillText("GAME OVER", 350, 200);
      // localStorage.setItem(this.topScore);
      
      myGameArea.context.fillStyle = scoreColors[colorI];
      myGameArea.context.font = "40px 'Fredoka One', cursive";
      myGameArea.context.fillText(`Your Score: ${points}`, 350, 300);

      window.cancelAnimationFrame(requestId);
    },

    score: function () {
      if(points=== 500*valueTest){
        scoreUP.play();
        colorI -= 1;
        valueTest += 1;
        if(colorI<0) colorI = scoreColors.length;
      }

      points =  Math.floor(frames / 3) + extraPoints;
      if(points <=500){
      this.context.beginPath();
      this.context.font = "35px 'Fredoka One', cursive";
      this.context.fillStyle = "#f2e8cf";
      this.context.fillText(`Score: ${points}`, 260, 55);
      } else if (points > 500) {
        this.context.fillStyle = scoreColors[colorI];
        this.context.fillText(`Score: ${points}`, 260, 55);
        this.canvas.style.borderColor =  scoreColors[colorI];
      }
    },

    gravity : function(){
      player.speedY += 1.32; //gravidade
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
    speed: -6,

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
      return this.x + this.width - 40;
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
          if(this.spriteCount < 4){
            this.ctx.drawImage(this.run1, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 8) {
            this.ctx.drawImage(this.run2, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 12){
            this.ctx.drawImage(this.run3, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 16){
            this.ctx.drawImage(this.run4, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 20){
            this.ctx.drawImage(this.run5, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 24){
            this.ctx.drawImage(this.run6, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 28){
            this.ctx.drawImage(this.run7, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else if (this.spriteCount < 32){
            this.ctx.drawImage(this.run8, this.x, this.y, this.width, this.height);
            this.spriteCount += 1;
          } else {
            this.ctx.drawImage(this.run1, this.x, this.y, this.width, this.height);
            this.spriteCount = 0;
          }

      }
      jump(value) {
        if(this.y <= 48) {
          this.speedY += 15; 
        }
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

  class Points extends Objects {
    constructor(width, height, x, y, color, ctx) {
    super(width, height, x, y, color, ctx)
    
    this.min_height = 260;
    this.max_height = 400;
    this.spriteCount = 0;

    this.spriteCount1 = 0;
    this.coin1 = new Image();
    this.coin1.src = './images/Coin1.png';  
    this.coin2 = new Image();
    this.coin2.src = './images/Coin2.png';
    this.coin3 = new Image();
    this.coin3.src = './images/Coin3.png';
    this.coin4 = new Image();
    this.coin4.src = './images/Coin4.png';
    this.coin5 = new Image();
    this.coin5.src = './images/Coin5.png';
    this.coin6 = new Image();
    this.coin6.src = './images/Coin6.png';

    
  }

    draw(){
    if(this.spriteCount < 5){
      this.ctx.drawImage(this.coin1, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 10) {
      this.ctx.drawImage(this.coin2, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 15){
      this.ctx.drawImage(this.coin3, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 20){
      this.ctx.drawImage(this.coin4, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 25){
      this.ctx.drawImage(this.coin5, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 30){
      this.ctx.drawImage(this.coin6, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else {
      this.spriteCount =0;
      this.ctx.drawImage(this.coin1, this.x, this.y, this.width, this.height);
    }
    }
    move(){
      if(this.spriteCount1 < 40){ 
        this.y -= 4;
        this.speedX = -4.;
        this.x += this.speedX;
        this.spriteCount1 += 1;
      } else if(this.spriteCount1 <80){
        this.y += 4;
        this.speedX = -4.5;
        this.x += this.speedX;
        this.spriteCount1 += 1;
      } else {
        this.spriteCount1 = 0;
      }
    }
  }

  class Life extends Objects {
    constructor(width, height, x, y, color, ctx) {
      super(width, height, x, y, color, ctx)

      this.heart = new Image();
      this.heart.src = './images/heart.png'; 
    } 
    draw(){
      this.ctx.drawImage(this.heart, this.x, this.y, this.width, this.height);
    }
  }

  //Create new Player/Rectangle
  const player = new Player(130, 100, 100, 50, 'blue', backgroundImage.ctx);

  //StartGame with 3 lifes
  lifeP.push(new Life (50, 50, 460, 20, 'blue', backgroundImage.ctx));
  lifeP.push(new Life (50, 50, 520, 20, 'blue', backgroundImage.ctx));
  lifeP.push(new Life (50, 50, 580, 20, 'blue', backgroundImage.ctx));
  lifeP.push(new Life (50, 50, 580, 20, 'blue', backgroundImage.ctx));


  document.getElementById('start-button').onclick = () => {
      if(!startG){
        mainM.play();
        startG = true;
        myGameArea.start();
      } else {
        window.location.reload();
      }
  };

  //  MAIN FUNCTION --> UPDATE GAME 
  function updateGameArea() {
    frames += 1;
    myGameArea.clear();
    
    //parallax-bg
    backgroundImage.move();
    backgroundImage.draw();

    //gravity &  obstacles
    myGameArea.gravity();

    player.draw();

    //Create & moving obstacles, lifePoints and coins
    updateObstaclesCoinsLife();

    //Check if player got a coin
    checkPointsUp();

    requestId = requestAnimationFrame(updateGameArea);

    myGameArea.score();
    checkGameOver();  
  }

  // Update/Move obstacles, coins, lifes & difficulty level
  function updateObstaclesCoinsLife(){
    myObstacles.forEach((elem, i)=> {
      elem.x += -5.5;
      elem.move();
      elem.draw();
      if(elem.x < -80){
        myObstacles.splice(i, 1);
      }
    })

    myPoints.forEach((elem, i) => {
      elem.move();
      elem.draw();
      if(myPoints.x < -50){
        myPoints.splice(i, 1);
      }
    })

    lifeP.forEach((elem, i) => {
      elem.draw();
    })

    if(frames <= 1500){
      if (frames % (90) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % 350 ===0){
        myPoints.push(new Points(50, 50, 700, 170, "blue"));
      }

    } else if (frames <= 2500){
        if (frames % (98) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (170) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
        }
        if (frames % 340 ===0){
          myPoints.push(new Points(50, 50, 700, 170, "blue"));
        }
    } else if (frames <= 3500){
        if (frames % (95) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (150) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
        if (frames % 330 ===0){
          myPoints.push(new Points(50, 50, 700, 170, "blue"));
        }

    } else if (frames <= 4500){
        if (frames % (92) === 0) {
          myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
        }
        if (frames % (145) === 0) {
          myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
        }
        if (frames % 330 ===0){
          myPoints.push(new Points(50, 50, 700, 170, "blue"));
        }
    } else if (frames <= 5500){
      if (frames % (88) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (140) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
      if (frames % 340 ===0){
        myPoints.push(new Points(50, 50, 700, 170, "blue"));
      }
    } else if (frames <=6500){
      if (frames % (80) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (135) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
      if (frames % 320 ===0){
        myPoints.push(new Points(50, 50, 700, 170, "blue"));
      }
    } else if (frames <= 7500){
      if (frames % (50) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (120) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
      if (frames % 310 ===0){
        myPoints.push(new Points(50, 50, 700, 170, "blue"));
      }
    } else if (frames > 8500){
      if (frames % (40) === 0) {
        myObstacles.push(new Obstaculo(50, 50, 700, 235, 'blue', backgroundImage.ctx));
      }
      if (frames % (100) === 0) {
        myObstacles.push(new Obstaculo(90, 90, 700, 190, 'blue', backgroundImage.ctx));
      }
      if (frames % 300 ===0){
        myPoints.push(new Points(50, 50, 700, 170, "blue"));
      }
    }
}
  
  //Controll & permission to jump if jumpCount > 0
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


  function checkPointsUp(){
    const pointsUp = myPoints.some(function(points){
      return player.crashWith(points);
    });
    if(pointsUp){
      coins.play();
      myPoints.forEach((element, i) => {
        myPoints.splice(i, 1);
        extraPoints += 10;
        coins.play();
      })
    }
  }

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
    if (crashed) {
      lifePoints -= 1;

      myObstacles.forEach((element, i) => {
        myObstacles.splice(i, 1);
      })

      lifeP.forEach((element,i)=> {
        lifeP.splice(i, 1);
      })
      lose.play();
        if(lifePoints <= 0){
          myGameArea.stop();   
        }
    }
  }
};
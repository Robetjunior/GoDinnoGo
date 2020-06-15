let topScore = [];


window.onload = () => {
 
  let jumpCount = 0;
  let frames = 0;
  let id = null;
  const SPRITE_SZ = 40;

  //CORES DOS OBSTACULOS
  const colors = ['#2ca8c2', '#980000', '#f76d3c', '#f15f74','#5481e6'];
  
  
  //ARRAY DE OBSTACULOS
  const myObstacles = [];


  //CRIACAO CANVAS
  const canvas = document.getElementById('canvas');
  const ctx = this.canvas.getContext('2d');



  // IMAGENS
  const roadImg = new Image();
  roadImg.src = './images/mato.jpg';
  const dinoA = new Image();
  dinoA.scr = './images/DinoSpritesAzul.png'

  


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
      document.getElementById('start-button').style.visibility = "initial";
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
      rec.speedY += 1.26; //gravidade
      rec.x += rec.speedX;
      rec.y += rec.speedY;
      rec.speedX *= 0.9; //atrito
      rec.speedY *= 0.9; //atrito
      
      // se o retangulo estiver caindo no chao
      if (rec.y > 350 - 50 - 32){
        rec.isPlayer = false;
        rec.y = 350 - 50 - 32;
        rec.speedY = 0;
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

  class Objects {
    constructor (width, height, x, y){
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  }

  class Player extends Objects {
    constructor (width, height, x, y, animation) {
      super (width, height, x, y)
      this.animation = animation;
    }
  }

  
  //=== Construcao do Obstaculo ===
  class Obstaculo extends Objects {
    constructor(width, height, color, x, y, isPlayer = false) {
      super(width, height, x, y)
      this.color = color;
      this.speedX = 0;
      this.speedY = 0;
      this.isPlayer = isPlayer;
    }

    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      
    }

    newPos() {
      this.x += this.speedX;
      this.x %= 500;
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

    crashWith(obstacle) {
      return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }
  }

  
  document.getElementById('start-button').onclick = () => {
    document.getElementById('start-button').style.visibility = 'hidden';
      startGame();
    
  };

  
  //Create new Player/Rectangle
  const rec = new Obstaculo(30, 30, 'white', 100, 50);

  //Criando personagem
  // const player = new Player (SPRITE_SZ, SPRITE_SZ, 55, 250, new Animation());

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
    rec.update();
    updateObstacles();
    

    //animation start
    id = requestAnimationFrame(updateGameArea);


    // player drawing
    // rec.animation.change(sprite_sheet.frame_sets[0], 8);
    // rec.animation.update();
    // rec.animation.draw();
    checkGameOver();
    myGameArea.score();
  }

  
  
  //Controle & Permissao para pular apenas se jumpCount for > 0
  document.addEventListener('keydown', (e) => {
    if((jumpCount <= 2 && jumpCount > 0)){
      switch (e.keyCode) {
        case 38: // up arrow
          rec.speedY -= 25;
          jumpCount--;
        break;
     }
    }
  });
  

  function updateObstacles() {
    if(frames <= 5000){
      for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -7;
        checkGameOver();
        myObstacles[i].update();
      }
    } else if(frames > 5000){
      for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -7.2;
        checkGameOver();
        myObstacles[i].update();
      }
    }

    const colorR = Math.floor(Math.random() * colors.length);
    const frameR = Math.floor(Math.random() * 14);
    console.log(frames);


    //Frequencia de Obstaculos
    if(frames < 1500){
      if (frames % (130 - frameR) === 0){
        let x = myGameArea.canvas.width;
        myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
      }

    } else if(frames < 2500) {
        if (frames % (126 - frameR) === 0){
          let x = myGameArea.canvas.width;
          myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
        }  
        // FLY ENEMIES
        if (frames % (198 - frameR) === 0){
          let x = myGameArea.canvas.width;
          myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
        }
        
    } else if(frames <= 4000) {
      if (frames % (120 - frameR) === 0){
        let x = myGameArea.canvas.width;
        myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
      }  
      // FLY ENEMIES
      if (frames % (185 - frameR) === 0){
        let x = myGameArea.canvas.width;
        myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
      }
      
    } else if(frames > 4000) {
      if (frames % (110 - frameR) === 0){
        let x = myGameArea.canvas.width;
        myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
      }  
      if (frames % (180 - frameR) === 0){
        let x = myGameArea.canvas.width;
        myObstacles.push(new Obstaculo(30, 30, colors[colorR], x, 268));
      }
    }
  }


  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return rec.crashWith(obstacle);
    });

    if (crashed) {
      myGameArea.stop();
      cancelAnimationFrame(id);
      window.location.reload();
    
    }
  }


};
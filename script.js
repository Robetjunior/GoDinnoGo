window.onload = () => {
  const myObstacles = [];

  const roadImg = new Image();
  roadImg.src = './images/background.jpg';
 

  const myGameArea = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),

    frames: 0,
    topScore: 0,
    poins: 0,

    start: function () {
      this.interval = requestAnimationFrame(updateGameArea);
    },

    clear: function () {
      this.context.clearRect(0, 0, 600, 400);
    },

    stop: function () {
      cancelAnimationFrame(this.interval);
    },

    score: function () {
      this.points = Math.floor(this.frames / 9);

      if (this.points < this.topScore) {
        this.topScore = this.points;
      }
      
      this.context.beginPath();
      this.context.font = "18px sans-serif";
      this.context.fillStyle = "#000";
      this.context.fillText(`Score: ${this.points}`, 430, 40);
      this.context.fillText(`Top Score: ${this.topScore}`, 430, 60);
    },

    gravity : function(){
      rec.speedY += 1.3; //gravidade
      rec.x += rec.speedX;
      rec.y += rec.speedY;
      rec.speedX *= 0.9; //atrito
      rec.speedY *= 0.9; //atrito
      
      // se o retangulo estiver caindo no chao
      if (rec.y > 350 - 16 - 32){
        rec.isRect = false;
        rec.y = 350 - 16 - 32;
        rec.speedY = 0;
      }
    },
  }


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
      this.ctx.drawImage(this.roadImg, this.x, 0, 600, 400);
      if(this.speed < 0){
        this.ctx.drawImage(this.roadImg, this.x + 600, 0, 600, 400);
      } else{
        this.ctx.drawImage(this.roadImg, this.x - this.roadImg, 0, 600, 400);
      }
    },
  };

  class Component {
    constructor(width, height, color, x, y, isRect = false) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      this.isRect = isRect;
    }

    update() {
      const ctx = myGameArea.context;
      if (this.isRect) {
        const recImg = new Image();
        recImg.src = './images/rectangle.png';
        ctx.drawImage(recImg, this.x, 300, 30, 30);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
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
    startGame();
  };

  //Create new Player/Rectangle
  const rec = new Component(30, 30, 'black', 100, 50, false);

  function startGame() {
    myGameArea.start();
  }

  function updateGameArea() {
    myGameArea.frames += 1;
    myGameArea.clear();

    //parallax bg
    backgroundImage.move();
    backgroundImage.draw();

    //gravity & player drawing & obstacles
    myGameArea.gravity();
    rec.newPos();
    rec.update();
    updateObstacles();
    
    myGameArea.interval = requestAnimationFrame(updateGameArea);

    checkGameOver();
    myGameArea.score();
  }


  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        rec.speedY -= 25;
      break;
    }
  });

  function updateObstacles() {
    for (let i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x += -7;checkGameOver();
      myObstacles[i].update();
    }

    let colors = ['#2ca8c2', '#98cb4a', '#f76d3c', '#f15f74','#5481e6'];
    let colorR = Math.floor(Math.random() * colors.length);

    

    let randomFrame = 200 - (Math.floor(Math.random() * 100) + 25);
    if (myGameArea.frames % randomFrame === 0) {
      let x = myGameArea.canvas.width;
      myObstacles.push(new Component(30, 30, colors[colorR], x, 300));
    }
  }

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return rec.crashWith(obstacle);
    });

    if (crashed) {
      myGameArea.stop();
    }
  }

};
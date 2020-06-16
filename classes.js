class Objects {
    constructor (width, height, x, y,color,ctx){
      this.ctx = ctx
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = color;

      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;

      
      this.speedY = 0;
      this.speedX = 0;

      this.source = './images/teste1.jpg'
    }

    move(){
        this.x += this.speed;
        this.x %= canvas.width;
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
    constructor(width, height, color, x, y) {
      super(width, height, x, y)
    }
    
  }

  export default { Player, Obstaculo }
var ctx, controller, rectangle, loop;

ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 400;
ctx.canvas.width = 700;

rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0

};


controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = (event.type == "keydown") ? true:false;

    switch(event.keyCode) {
      case 37: 
        controller.left = key_state;
      break;
      case 38:
        controller.up = key_state;
      break;
      case 39:
        controller.right = key_state;
      break;


    }
  }
};

loop = function(){

  if(controller.up && rectangle.jumping == false){
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left){
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right){
    rectangle.x_velocity += 0.5;
  }

  rectangle.y_velocity += 1.5; //GRAVIDADE
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; //ATRITO
  rectangle.y_velocity *= 0.9; //ATRITO

  // se o retangulo estiver caindo no chao
  if (rectangle.y > 180 - 16 - 32){
    rectangle.jumping = false;
    rectangle.y = 180 - 16 -32;
    rectangle.y_velocity = 0;
  }

  ctx.fillStyle = "#202020";
  ctx.fillStyle (0, 0, 700, 400);
  ctx.fillStyle = "#f00";
  ctx.beginPatch();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();
  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.lineTo(703, 400);
  ctx.stroke();


  //chama o update quando o browser estiver pronto pra printar dnovo
  window.requestAnimationFrame(loop);
}



document.getElementById('start-button').onclick = () => {
    console.log("ta funfando");
    startGame();
  };

  function startGame() {
    console.log('start yo!');
    myGameArea.start();
  }
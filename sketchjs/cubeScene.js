function CubeScene() {
    var draggedSprite;
    let state = 1;
    let clickCount = 0,crack1Count = 10,crack2Count = 20,crack3Count = 30, crack4Count = 40;
    let transformCount = 50;

    this.setup = function (){
        // add collider to front layer
    // should detect pixel instead
    cubeSprite[0].setDefaultCollider();
    // assign functions responding to mouse events
    // when mouse is clicked, front and back sprite (cubeSprite[0], cubeSprite[2])
    // will stop playing

    cubeSprite[0].onMousePressed = function(){

        if(draggedSprite == null){
          draggedSprite = cubeSprite;
          offsetX = mouseX - draggedSprite[0].position.x;
          offsetY = mouseY - draggedSprite[0].position.y;
        }

        if (state == 1){
          cubeSprite[0].animation.goToFrame(0);
          cubeSprite[2].animation.goToFrame(0);
          isStopping = true;
          state == 2;
        }
    }

    

    a.sprites[0].onMousePressed = function(){

      if(draggedSprite == null){
        draggedSprite = a;
        offsetX = mouseX - draggedSprite.sprites[0].position.x;
        offsetY = mouseY - draggedSprite.sprites[0].position.y;
      }

      if (state == 1){
        a.sprites[0].animation.goToFrame(0);
        a.sprites[2].animation.goToFrame(0);
        isStopping = true;
        state == 2;
      }
  }

    cubeSprite[0].onMouseReleased = function(){

        if(draggedSprite == cubeSprite){
          draggedSprite = null;
        }


        clickCount++;


        switch (clickCount) {
          case crack1Count:
            playCrack1();
            break;
          case crack2Count:
            playCrack2();
            break;
        
          case crack3Count:
            playCrack3();
          break;
      
          case crack4Count:
            playCrack4();
            break;
          case transformCount:
            playTransform();
          default:
            break;
        }
        console.log(clickCount);
    }

    a.sprites[0].onMouseReleased = function(){
      if(draggedSprite == a){
        draggedSprite = null;
      }
    }

  }

    this.draw = function (){
        background(255,255,255); 


        if(draggedSprite == a){
          a.moveTo(mouseX,mouseY,0.3);
          move(canvasWidth/2,canvasHeight/2,0.05)
        } else if( draggedSprite == cubeSprite ) {
          move(mouseX,mouseY,0.3);
          a.moveTo(canvasWidth/2,canvasHeight/2,0.05);
        } else {
          move(canvasWidth/2,canvasHeight/2,0.05)
          a.moveTo(canvasWidth/2,canvasHeight/2,0.05);
        }

        
        drawSprites(cubeSprite);


        // Class Cube test
        
        a.display();
    
    }






    
    // * * * * * * legacy functions

function move(desX,desY,speed) {
    // todo
    cubeSprite.forEach((sprite) => {
      let speedX = (desX - sprite.position.x) * speed;
      let speedY = (desY - sprite.position.y) * speed;
      sprite.position.x += speedX;
      sprite.position.y += speedY;
    });
  }
  
  function playSpin() {
  // * Set cubeSprite to spin
  // * cubeSprite[0] back  => animation "spin"
  // * cubeSprite[1] heart => animation "neutral"
  // * cubeSprite[2] front => animation "spin"
  
  cubeSprite[0].changeAnimation("spin");
  cubeSprite[0].animation.play();
  cubeSprite[1].changeAnimation("neutral");
  cubeSprite[2].changeAnimation ("spin");
  }
  
  
  
  function playCrack1() {
  // * Set cubeSprite to crack
  // * cubeSprite[0] back  => image "cube_back_spin_000001.png"
  // * cubeSprite[1] heart => animation "neutral"
  // * cubeSprite[2] front => animation "crack" frame delay 10
  
  cubeSprite[0].animation.stop();
  cubeSprite[0].animation.changeFrame(0);
  cubeSprite[2].changeAnimation("crack1");
  cubeSprite[2].animation.frameDelay = 10
  }
  
  function playCrack2() {
  
    cubeSprite[2].changeAnimation("crack2");
    cubeSprite[2].animation.frameDelay = 10
    }
  
  function playCrack3() {
    cubeSprite[2].changeAnimation("crack3");
    cubeSprite[2].animation.frameDelay = 10
    }
  
  function playCrack4() {
    cubeSprite[2].changeAnimation("crack4");
    cubeSprite[2].animation.frameDelay = 10
    }
  
  function playTransform() {
  
    // * Set cubeSprite to transform
    // * 
    // * cubeSprite[0] back  => animation "transform" noLoop
    // * cubeSprite[1] heart => animation "transform" noLoop
    // * cubeSprite[2] front => animation "transform" noLoop
    // * 
    cubeSprite.forEach((sprite)=>{
      sprite.changeAnimation("transform");
      sprite.animation.frameDelay = 8;
    });
  }
  
  function playNeutral(){
  
    // * Set cubeSprite to transform
    // * 
    // * cubeSprite[0] back  => animation "neutral" loop
    // * cubeSprite[1] heart => animation "neutral" loop
    // * cubeSprite[2] front => animation "neutral" loop
    // * 
    cubeSprite.forEach((sprite)=>{
      sprite.changeAnimation("neutral");
      sprite.animation.frameDelay = 4;
    });
  }
  
  function playSqueeze(){
    // TODO
  }
  
  
  
  function playExplode(){
    // TODO
  }
  
  
  // * function for test purposes
  function createTestSprite(){
    // img = loadImage("assets/cube_crack_front_00004.png");
    testSprite = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);
    testSprite.addAnimation("crack","assets/cube_back_transform_00001.png","assets/cube_back_transform_00010.png");
    // testSprite.addImage("bruh",img);
    // testSprite.changeImage("bruh");
    testSprite.animation.frameDelay = 10;
    
  
  }
}
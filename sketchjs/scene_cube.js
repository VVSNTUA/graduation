function CubeScene() {


    // take this in a local variable to allow easy access to
    // this instace from within local functions
    const me = this;

    var draggedSprite;
    let state = 1;
    let clickCount = 0,
    crack1Count = 10,
    crack2Count = 20,
    crack3Count = 30, 
    crack4Count = 40;
    let transformCount = 50;

    this.setup = function (){
      

    cubeSprite.sprites[0].onMousePressed = function(){

      if(draggedSprite == null && state != 3){
        draggedSprite = cubeSprite;
        offsetX = mouseX - draggedSprite.sprites[0].position.x;
        offsetY = mouseY - draggedSprite.sprites[0].position.y;
      }

      if (state == 1){
        cubeSprite.playAnimation("stopping");
        // todo
        state = 2;
      }

      if (state == 2) {
        // track count
        clickCount++;

        switch (clickCount) {
          case crack1Count:
            cubeSprite.playAnimation("crack1");
            break;
          case crack2Count:
            cubeSprite.playAnimation("crack2");
            break;
          case crack3Count:
            cubeSprite.playAnimation("crack3");
            break;
          case crack4Count:
            cubeSprite.playAnimation("crack4");
            break;
          case transformCount:
            cubeSprite.playAnimation("transform");
            state = 3;
            break;
                            
          default:
            break;
        }
      }

      if (state == 3) {
        setTimeout(goToDropletScene,3000);
      }
  }
    cubeSprite.sprites[0].onMouseReleased = function(){
      if(draggedSprite == cubeSprite){
        draggedSprite = null;
      }
    }

  }

    this.draw = function (){
        camera.off();     //fix drift
        background(255,255,255); 

   


        if(draggedSprite == cubeSprite){
          cubeSprite.moveTo(mouseX, mouseY, 0.3);
        }  else {
          cubeSprite.moveTo(width/2, height/2, 0.05);
        }
        cubeSprite.display();
    }


    // local functions

    function goToDropletScene(){
      me.sceneManager.showScene( DropletScene ) ;
      console.log(state);
      init();
    }
     function init(){
       state = 1;
       clickCount = 0;
       cubeSprite.setPosition( width/2, 20);
       cubeSprite.sprites.forEach( sprite => sprite.animation.play());
       cubeSprite.playAnimation("spin");
       cubeSprite.sprites[1].changeAnimation("neutral");
     }

}